import React, { FunctionComponent } from 'react';
import { Switch, Redirect } from 'react-router';

import { RouteProps, Private } from './Route';

export type RoutesProps<T = any> = RouteProps<T>;

export const Routes: FunctionComponent<RoutesProps> = (
  { children, ...props }
) => (
  <Switch>
    {children}
    <Private {...props}/>
    <Redirect to={props.path}/>
  </Switch>
);
