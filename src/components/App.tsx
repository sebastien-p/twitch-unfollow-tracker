import React, { FunctionComponent } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store, persistor } from '../redux/store';
import { Routes } from './Routes';
import { Public } from './Route';
import { Login } from './Login';
import { Home } from './Home';

export const App: FunctionComponent = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Routes path='/' component={Home}>
          <Public path='/login' component={Login}/>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
