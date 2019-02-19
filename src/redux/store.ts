import { Store, createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { name } from '../../package.json';

import {
  PersistConfig,
  Persistor,
  persistReducer,
  persistStore
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { Follower } from '../services/database';
import * as reducers from './reducers';

export type User = null | {
  clientId: string;
  name: string;
  id: string;
};

export type State = {
  user: User;
  unfollowers: Follower[];
};

const persistConfig: PersistConfig = {
  storage,
  whitelist: ['user'],
  key: `${name}.settings`
};

export const store: Store = createStore(
  persistReducer(persistConfig, combineReducers(reducers)),
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor: Persistor = persistStore(store);
