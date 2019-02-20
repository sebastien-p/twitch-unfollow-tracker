import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { loadUnfollowers, logout } from '../redux/thunks';
import { State } from '../redux/store';
import { Followers } from './Followers';
import { Button } from './Button';

type StateProps = Pick<State, 'unfollowers'>;

type DispatchProps = {
  loadUnfollowers(...args: any[]): void; // FIXME
  logout(...args: any[]): void; // FIXME
};

type OwnProps = {
  user: NonNullable<State['user']>;
};

type Props = StateProps & DispatchProps & OwnProps;

const PureHome: FunctionComponent<Props> = (
  { user, unfollowers, loadUnfollowers, logout }
) => (
  <div>
    <h1>{user.name}</h1>
    <Button onClick={loadUnfollowers}>Load</Button>
    <Button onClick={logout}>Logout</Button>
    <Followers data={unfollowers} empty='No unfollower'/>
  </div>
);

export const Home = connect<StateProps, DispatchProps, OwnProps, State>(
  ({ unfollowers }) => ({ unfollowers }),
  { loadUnfollowers, logout }
)(PureHome);
