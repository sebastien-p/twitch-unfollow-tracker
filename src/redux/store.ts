import { Store, createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

export type User = null | {
  clientId: string;
  name: string;
  id: string;
};

export type State = {
  user: User;
};

export const store: Store = createStore(
  combineReducers(reducers),
  composeWithDevTools(applyMiddleware(thunk))
);
