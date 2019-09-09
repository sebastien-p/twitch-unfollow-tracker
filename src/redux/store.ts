import { Store, createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  PersistConfig,
  Persistor,
  persistReducer,
  persistStore
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { name } from '../../package.json';
import { Follower } from '../services/database';
import * as reducers from './reducers';

type User = {
  clientId: string;
  name: string;
  id: string;
};

export type State = {
  user: User | null;
  followers: Follower[];
  unfollowers: Follower[];
};

const persistConfig: PersistConfig<State> = {
  storage,
  whitelist: ['user'],
  key: `${name}.settings`
};

export const store: Store<State> = createStore(
  persistReducer(persistConfig, combineReducers(reducers)),
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor: Persistor = persistStore(store);
