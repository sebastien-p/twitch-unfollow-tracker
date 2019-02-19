import { Reducer } from 'redux';

import { Follower } from '../services/database';
import { Types, UserActions, UnfollowersActions } from './actions';
import { User } from './store';

export const user: Reducer<User, UserActions> = (state = null, action) => {
  switch (action.type) {
    case Types.Login: {
      const { type, ...user } = action;
      return user;
    }
    case Types.Logout: return null;
    default: return state;
  }
}

export const unfollowers: Reducer<Follower[], UnfollowersActions> = (
  state = [],
  action
) => {
  switch (action.type) {
    case Types.LoadUnfollowers: return action.unfollowers;
    default: return state;
  }
}
