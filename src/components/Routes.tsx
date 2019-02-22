import React, { FunctionComponent, ComponentType } from 'react';
import { RouteProps, Switch, Redirect } from 'react-router';

import { Private } from './Route';

type Props = Pick<RouteProps, 'exact'> & {
  component: ComponentType<any>;
  path: string;
};

export const Routes: FunctionComponent<Props> = ({ children, ...props }) => (
  <Switch>
    {children}
    <Private {...props}/>
    <Redirect to={props.path}/>
  </Switch>
);
