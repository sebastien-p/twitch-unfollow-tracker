import { Action as ReduxAction } from 'redux';

import { State } from './store';

export enum Types {
  SetUser = '[user] set',
  SetFollowers = '[followers] set',
  SetUnfollowers = '[unfollowers] set'
}

export type Action<
  T extends Types,
  U extends keyof State
> = (data: State[U]) => ReduxAction<T> & Pick<State, U>;

export const setUser: Action<
  Types.SetUser,
  'user'
> = user => ({ type: Types.SetUser, user });

export type UserActions = typeof setUser;

export const setFollowers: Action<
  Types.SetFollowers,
  'followers'
> = followers => ({ type: Types.SetFollowers, followers });

export type FollowersActions = typeof setFollowers;

export const setUnfollowers: Action<
  Types.SetUnfollowers,
  'unfollowers'
> = unfollowers => ({ type: Types.SetUnfollowers, unfollowers });

export type UnfollowersActions = typeof setUnfollowers;
