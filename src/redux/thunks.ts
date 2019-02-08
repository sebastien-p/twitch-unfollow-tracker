import { ThunkAction } from 'redux-thunk';

import { FormValues } from '../components/Login';
import { Action, Return, login as loginAction } from './actions';
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
> = formValues => async dispatch => dispatch(loginAction({
  id: await Promise.resolve('FAKE_ID'),
  ...formValues
}));
