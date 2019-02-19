import { ThunkAction } from 'redux-thunk';
import differenceBy from 'lodash.differenceby';

import { getUserId, getFollowers } from '../services/twitch';
import { Follower, database } from '../services/database';
import { FormValues } from '../components/Login';

import {
  Action,
  Return,
  login as loginAction,
  loadUnfollowers as loadUnfollowersAction
} from './actions';

import { State } from './store';

export type Thunk<
  Actions extends Action<any>
> = ThunkAction<void, State, void, Actions>;

export type ThunkCreator<
  Param extends {},
  Actions extends Action<any>
> = (param: Param) => Thunk<Actions>;

export const login: ThunkCreator<
  FormValues,
  Return<typeof loginAction>
> = ({ clientId, name }) => async dispatch => dispatch(loginAction({
  id: await getUserId(clientId, name),
  clientId,
  name
}));

export const loadUnfollowers: ThunkCreator<
  any,
  Return<typeof loadUnfollowersAction>
> = () => async (dispatch, getState) => {
  const { user } = getState();
  if (!user) { return; }

  const [previous, next] = await Promise.all([
    database.table('followers').toArray(), // FIXME
    getFollowers(user.clientId, user.id)
  ]);

  await database.reset(database.table('followers'), next); // FIXME

  dispatch(loadUnfollowersAction({
    unfollowers: differenceBy(previous, next, ({ id }) => id)
  }));
};
