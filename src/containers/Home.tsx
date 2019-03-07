import React, { FunctionComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { logout } from '../redux/thunks';
import { NavLink } from '../components/NavLink';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Routes } from '../components/Routes';
import { Private } from '../components/Route';
import { Title } from '../components/Title';
import { Nav } from '../components/Nav';
import { Unfollowers } from './Unfollowers';
import { Followers } from './Followers';

type DispatchProps = {
  logout(...args: any[]): void; // FIXME
};

type OwnProps = {
  user: NonNullable<State['user']>;
};

type Props = DispatchProps & OwnProps;

const PureHome: FunctionComponent<Props> = ({ user, logout }) => (
  <Fragment>
    <Header>
      <Title>{user.name}</Title>
      <Nav>
        <NavLink i18n='followers' to='/'/>
        <NavLink i18n='unfollowers' to='/unfollowers'/>
      </Nav>
      <Button i18n='logout' onClick={logout}/>
    </Header>
    <Routes path='/' component={Followers} exact>
      <Private path='/unfollowers' component={Unfollowers}/>
    </Routes>
  </Fragment>
);

export const Home = connect<{}, DispatchProps, OwnProps, State>(
  null,
  { logout }
)(PureHome);
