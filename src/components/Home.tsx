import React, { FunctionComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { logout } from '../redux/thunks';
import { Unfollowers } from './Unfollowers';
import { Followers } from './Followers';
import { Button } from './Button';
import { Routes } from './Routes';
import { Private } from './Route';

type DispatchProps = {
  logout(...args: any[]): void; // FIXME
};

type OwnProps = {
  user: NonNullable<State['user']>;
};

type Props = DispatchProps & OwnProps;

const PureHome: FunctionComponent<Props> = ({ user, logout }) => (
  <Fragment>
    <header>
      <h1>{user.name}</h1>
      <NavLink to='/'>Followers</NavLink>
      <NavLink to='/unfollowers'>Unfollowers</NavLink>
      <Button onClick={logout}>Logout</Button>
    </header>
    <main>
      <Routes path='/' component={Followers} exact>
        <Private path='/unfollowers' component={Unfollowers}/>
      </Routes>
    </main>
  </Fragment>
);

export const Home = connect<{}, DispatchProps, OwnProps, State>(
  null,
  { logout }
)(PureHome);
