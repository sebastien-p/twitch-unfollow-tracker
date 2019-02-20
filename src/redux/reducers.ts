import { Reducer as ReduxReducer } from 'redux';

import {
  Types,
  Action,
  UserActions,
  FollowersActions,
  UnfollowersActions
} from './actions';

import { State } from './store';

type Reducer<
  T extends keyof State,
  U extends Action<Types, T>
> = ReduxReducer<State[T], ReturnType<U>>;

export const user: Reducer<'user', UserActions> = (
  state = null,
  action
) => {
  switch (action.type) {
    case Types.SetUser: return action.user;
    default: return state;
  }
}

export const followers: Reducer<'followers', FollowersActions> = (
  state = [],
  action
) => {
  switch (action.type) {
    case Types.SetFollowers: return action.followers;
    default: return state;
  }
}

export const unfollowers: Reducer<'unfollowers', UnfollowersActions> = (
  state = [],
  action
) => {
  switch (action.type) {
    case Types.SetUnfollowers: return action.unfollowers;
    default: return state;
  }
}
