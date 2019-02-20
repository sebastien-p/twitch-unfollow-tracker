import { ThunkAction } from 'redux-thunk';

import { getUserId, getFollowers, getUnfollowers } from '../services/twitch';
import { database, Follower, UserId } from '../services/database';
import { LoginForm } from '../components/Login';

import {
  Types,
  Action,
  setUser,
  setFollowers,
  setUnfollowers
} from './actions';

import { State } from './store';

type Thunk<
  T extends Action<Types, any>, // TODO
  U = void,
> = (data: U) => ThunkAction<any, State, void, ReturnType<T>>; // FIXME

// export const loadFollowers: Thunk<
//   typeof setFollowers
// > = () => async dispatch => {
//   const followers: Follower[] = await database.getFollowers();
//   dispatch(setFollowers(followers));
//   return followers;
// };

export const loadUnfollowers: Thunk<
  typeof setUnfollowers
> = () => async (dispatch, getState) => { // TODO: call loadFollowers
  const { user } = getState();
  if (!user) { return; }

  const [previous, next] = await Promise.all([
    // dispatch(loadFollowers()),
    database.getFollowers(),
    getFollowers(user.clientId, user.id)
  ]);

  await database.resetFollowers(next);


  dispatch(setFollowers(next) as any); // FIXME

  dispatch(setUnfollowers(getUnfollowers(previous, next)));
};

export const login: Thunk<
  typeof setUser,
  LoginForm
> = ({ clientId, name }) => async dispatch => {
  const id: UserId = await getUserId(clientId, name);
  dispatch(setUser({ clientId, id, name }));
  dispatch(loadUnfollowers());
};

export const logout: Thunk<
  typeof setUser
> = () => async dispatch => {
  await database.delete();
  dispatch(setUser(null));
};
