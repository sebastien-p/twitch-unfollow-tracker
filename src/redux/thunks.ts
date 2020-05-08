import { HTTPError } from 'ky/umd';
import { ThunkAction } from 'redux-thunk';
import differenceBy from 'lodash.differenceby';

import { Follower, getFollowers, revokeAccessToken } from '../services/twitch';
import { withToasts } from '../services/toasts';
import { db } from '../services/database';

import {
  Types,
  Action,
  setUser,
  setFollowers,
  setUnfollowers
} from './actions';

import { State } from './store';

type Thunk<T extends Action<Types, any>, V = void, U = void> = (
  data: U
) => ThunkAction<Promise<V>, State, void, ReturnType<T>>;

const syncFollowers: Thunk<typeof setFollowers> = () => async dispatch => {
  dispatch(setFollowers(await db.getSortedValues(db.followers)));
};

const syncUnfollowers: Thunk<typeof setUnfollowers> = () => async dispatch => {
  dispatch(setUnfollowers(await db.getSortedValues(db.unfollowers)));
};

export const loadFollowers: Thunk<typeof setFollowers> = () => async (
  dispatch,
  getState
) => {
  const { followers } = getState();

  if (!followers.length) {
    await dispatch(syncFollowers());
  }
};

export const loadUnfollowers: Thunk<typeof setUnfollowers> = () => async (
  dispatch,
  getState
) => {
  const { unfollowers } = getState();

  if (!unfollowers.length) {
    await dispatch(syncUnfollowers());
  }
};

const fetchFollowers: Thunk<
  typeof setFollowers,
  Follower[] | void
> = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user) {
    return;
  }

  let followers: Follower[];

  try {
    followers = await getFollowers(user.token, user.id);
  } catch (error) {
    if (
      error instanceof HTTPError &&
      /^40[13]$/.test(error.response.status.toString())
    ) {
      dispatch(logout());
    }

    throw error;
  }

  await db.resetTable(db.followers, followers);
  await dispatch(syncFollowers());

  return followers;
};

export const fetchUnfollowers: Thunk<
  typeof setFollowers | typeof setUnfollowers,
  Follower[]
> = () =>
  withToasts<ReturnType<typeof fetchUnfollowers>>(async dispatch => {
    const [previous, next] = await Promise.all([
      db.getSortedValues(db.followers),
      dispatch(fetchFollowers())
    ]);

    const unfollowers: Follower[] = differenceBy(
      previous,
      next as Follower[],
      ({ id }) => id
    );

    await db.resetTable(db.unfollowers, unfollowers);
    await dispatch(syncUnfollowers());

    return unfollowers;
  });

export const logout: Thunk<
  typeof setUser | typeof setFollowers | typeof setUnfollowers
> = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user) {
    return;
  }

  await db.clear();
  dispatch(setUser(null));
  dispatch(setFollowers([]));
  dispatch(setUnfollowers([]));
  revokeAccessToken(user.token);
};
