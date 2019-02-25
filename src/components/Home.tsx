import React, { FunctionComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { logout } from '../redux/thunks';
import { Unfollowers } from './Unfollowers';
import { Followers } from './Followers';
import { NavLink } from './NavLink';
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
      <NavLink i18n='followers.title' to='/'/>
      <NavLink i18n='unfollowers.title' to='/unfollowers'/>
      <Button i18n='logout' onClick={logout}/>
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
