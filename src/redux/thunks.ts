import { ThunkAction } from 'redux-thunk';

import { getUserId, getFollowers, getUnfollowers } from '../services/twitch';
import { database, Follower } from '../services/database';
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

const fetchFollowers: Thunk<
  typeof setFollowers,
  Follower[] | void
> = () => async (dispatch, getState) => {
  const { user } = getState();
  if (!user) { return; }

  const followers: Follower[] = await getFollowers(user.clientId, user.id);
  await database.resetFollowers(followers);
  dispatch(setFollowers(followers));
  return followers;
};

export const fetchUnfollowers: Thunk<
  typeof setUnfollowers,
  Follower[]
> = () => async dispatch => {
  const [previous, next] = await Promise.all([
    database.getFollowers(),
    dispatch(fetchFollowers())
  ]);

  const unfollowers: Follower[] = getUnfollowers(previous, next as Follower[]);
  await database.resetUnfollowers(unfollowers);
  dispatch(setUnfollowers(unfollowers));
  return unfollowers;
};

export const loadFollowers: Thunk<
  typeof setFollowers
> = () => async (dispatch, getState) => {
  const { followers } = getState();
  if (followers.length) { return; }
  dispatch(setFollowers(await database.getFollowers()));
};

export const loadUnfollowers: Thunk<
  typeof setUnfollowers
> = () => async (dispatch, getState) => {
  const { unfollowers } = getState();
  if (unfollowers.length) { return; }
  dispatch(setUnfollowers(await database.getUnfollowers()));
};

export const login: Thunk<
  typeof setUser,
  void,
  Values
> = ({ clientId, name }) => async dispatch => {
  dispatch(setUser({ clientId, name, id: await getUserId(clientId, name) }));
  dispatch(fetchFollowers());
};

export const logout: Thunk<
  typeof setUser | typeof setFollowers | typeof setUnfollowers
> = () => async dispatch => {
  await database.clear();
  dispatch(setUser(null));
  dispatch(setFollowers([]));
  dispatch(setUnfollowers([]));
};
