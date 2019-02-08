import { Action as ReduxAction } from 'redux';

import { User } from './store';

export type Action<
  Type,
  Payload extends {} = {}
> = ReduxAction<Type> & Payload;

export type ActionCreator<
  Type extends Types,
  Param extends {} = {},
  Payload extends Param = Param
> = (param: Param) => Action<Type, Payload>;

export type Return<Type extends ActionCreator<any, any>> = ReturnType<Type>;

export enum Types {
  Login = '[user] login',
  Logout = '[user] logout'
}

export const login: ActionCreator<Types.Login, NonNullable<User>> = user => ({
  type: Types.Login,
  ...user
});

export const logout: ActionCreator<Types.Logout> = () => ({
  type: Types.Logout
});

export type UserActions = Return<typeof login> | Return<typeof logout>;
