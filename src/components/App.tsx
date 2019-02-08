import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import { Login } from './Login';
import { Home } from './Home';

export const App: FunctionComponent = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Home} exact/>
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  </Provider>
);
