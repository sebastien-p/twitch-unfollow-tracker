import { ThunkAction } from 'redux-thunk';

import { getUserId, getFollowers, getUnfollowers } from '../services/twitch';
import { Follower, database as db } from '../services/database';
import { Values } from '../components/Login';

import {
  Types,
  Action,
  setUser,
  setFollowers,
  setUnfollowers
} from './actions';

import { State } from './store';

type Thunk<
  T extends Action<Types, any>,
  V = void,
  U = void
> = (data: U) => ThunkAction<Promise<V>, State, void, ReturnType<T>>;

const syncFollowers: Thunk<
  typeof setFollowers
> = () => async dispatch => {
  dispatch(setFollowers(await db.getSortedValues(db.followers)));
}

const syncUnfollowers: Thunk<
  typeof setUnfollowers
> = () => async dispatch => {
  dispatch(setUnfollowers(await db.getSortedValues(db.unfollowers)));
}

export const loadFollowers: Thunk<
  typeof setFollowers
> = () => async (dispatch, getState) => {
  const { followers } = getState();
  if (!followers.length) { await dispatch(syncFollowers()); }
};

export const loadUnfollowers: Thunk<
  typeof setUnfollowers
> = () => async (dispatch, getState) => {
  const { unfollowers } = getState();
  if (!unfollowers.length) { await dispatch(syncUnfollowers()); }
};

const fetchFollowers: Thunk<
  typeof setFollowers,
  Follower[] | void
> = () => async (dispatch, getState) => {
  const { user } = getState();
  if (!user) { return; }

  const followers: Follower[] = await getFollowers(user.clientId, user.id);
  await db.resetTable(db.followers, followers);
  await dispatch(syncFollowers());
  return followers;
};

export const fetchUnfollowers: Thunk<
  typeof setFollowers | typeof setUnfollowers,
  Follower[]
> = () => async dispatch => {
  const [previous, next] = await Promise.all([
    db.getSortedValues(db.followers),
    dispatch(fetchFollowers())
  ]);

  const unfollowers: Follower[] = getUnfollowers(previous, next as Follower[]);
  await db.resetTable(db.unfollowers, unfollowers);
  await dispatch(syncUnfollowers());
  return unfollowers;
};

export const login: Thunk<
  typeof setUser | typeof setFollowers,
  Follower[] | void,
  Values
> = ({ clientId, name }) => async dispatch => {
  dispatch(setUser({ clientId, name, id: await getUserId(clientId, name) }));
  await dispatch(fetchFollowers());
};

export const logout: Thunk<
  typeof setUser | typeof setFollowers | typeof setUnfollowers
> = () => async dispatch => {
  await db.clear();
  dispatch(setUser(null));
  dispatch(setFollowers([]));
  dispatch(setUnfollowers([]));
};
