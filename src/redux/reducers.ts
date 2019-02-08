import { Reducer } from 'redux';

import { Types, UserActions } from './actions';
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
