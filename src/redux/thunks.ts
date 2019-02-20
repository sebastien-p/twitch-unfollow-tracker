import { ThunkAction } from 'redux-thunk';
import differenceBy from 'lodash.differenceby';

import { getUserId, getFollowers } from '../services/twitch';
import { database } from '../services/database';
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
> = (data: U) => ThunkAction<void, State, void, ReturnType<T>>;

export const login: Thunk<
  typeof setUser,
  LoginForm
> = ({ clientId, name }) => async dispatch => { // TODO: call loadUnFollowers
  dispatch(setUser({
    id: await getUserId(clientId, name),
    clientId,
    name
  }));
};

export const logout: Thunk<
  typeof setUser
> = () => async dispatch => {
  await database.table('followers').clear(); // FIXME
  dispatch(setUser(null));
};

export const loadFollowers: Thunk<
  typeof setFollowers
> = () => async dispatch => dispatch(setFollowers(
  await database.table('followers').toArray() // FIXME
));

export const loadUnfollowers: Thunk<
  typeof setUnfollowers
> = () => async (dispatch, getState) => { // TODO: call loadFollowers
  const { user } = getState();
  if (!user) { return; }

  const [previous, next] = await Promise.all([
    database.table('followers').toArray(), // FIXME
    getFollowers(user.clientId, user.id)
  ]);

  await database.reset(database.table('followers'), next); // FIXME

  dispatch(setUnfollowers(differenceBy(previous, next, ({ id }) => id)));
};
