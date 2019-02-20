import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from '../redux/store';
import { Private, Public } from './Route';
import { Login } from './Login';
import { Home } from './Home';

export const App: FunctionComponent = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Private path='/' component={Home} exact/>
          <Public path='/login' component={Login}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
