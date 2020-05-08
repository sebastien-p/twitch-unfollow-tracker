import { Store, createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  PersistConfig,
  Persistor,
  persistReducer,
  persistStore,

} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { name } from '../../package.json';
import { User, Follower, getLoggedInUser } from '../services/twitch';
import * as reducers from './reducers';

export interface State {
  user: User | null;
  followers: Follower[];
  unfollowers: Follower[];
}

const persistConfig: PersistConfig<State> = {
  storage,
  whitelist: ['user'],
  key: `${name}.settings`,
  stateReconciler: autoMergeLevel2
};

export const store: Store<State> = createStore(
  persistReducer(persistConfig, combineReducers(reducers)),
  { user: getLoggedInUser() },
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor: Persistor = persistStore(store);
