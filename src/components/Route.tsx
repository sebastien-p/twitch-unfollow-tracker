import React, {
  FunctionComponent,
  ComponentType,
  Suspense,
  useCallback
} from 'react';

import { RouteProps as RouterRouteProps, Route, Redirect } from 'react-router';

import { connect } from 'react-redux';

import { State } from '../redux/store';

export type RouteProps<T = any> = Pick<RouterRouteProps, 'exact'> & {
  component: ComponentType<T>;
  path: string;
};

type ProtectedStateProps = Pick<State, 'user'>;

type ProtectedOwnProps = RouteProps & {
  authenticated: boolean;
  to: RouteProps['path'];
};

type ProtectedProps = ProtectedStateProps & ProtectedOwnProps;

type Render = NonNullable<RouterRouteProps['render']>;

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
      <Suspense fallback={null}>
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

export const Public: FunctionComponent<RouteProps> = props => (
  <Protected {...props} authenticated={true} to='/'/>
);

export const Private: FunctionComponent<RouteProps> = props => (
  <Protected {...props} authenticated={false} to='/login'/>
);
