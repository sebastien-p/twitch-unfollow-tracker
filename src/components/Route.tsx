import React, { FunctionComponent, ComponentType, useCallback } from 'react';
import { RouteProps, Route, Redirect, } from 'react-router';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { Suspense } from './Suspense';

type Props = Pick<RouteProps, 'exact'> & {
  component: ComponentType<any>;
  path: string;
};

type ProtectedStateProps = Pick<State, 'user'>;

type ProtectedOwnProps = Props & {
  authenticated: boolean;
  to: string;
};

type ProtectedProps = ProtectedStateProps & ProtectedOwnProps;

type Render = NonNullable<RouteProps['render']>;

const PureProtected: FunctionComponent<ProtectedProps> = ({
  component: Component,
  authenticated,
  user,
  to,
  children,
  ...props
}) => {
  const move: boolean = !!user === authenticated;

  const render: Render = useCallback<Render>(
    props => move ? <Redirect to={to}/> : (
      <Suspense>
        <Component {...props} user={user}/>
      </Suspense>
    ),
    [Component, user, move, to]
  );

  return (<Route {...props} render={render}/>);
};

const Protected = connect<ProtectedStateProps, {}, ProtectedOwnProps, State>(
  ({ user }) => ({ user })
)(PureProtected);

export const Public: FunctionComponent<Props> = props => (
  <Protected {...props} authenticated={true} to='/'/>
);

export const Private: FunctionComponent<Props> = props => (
  <Protected {...props} authenticated={false} to='/login'/>
);
