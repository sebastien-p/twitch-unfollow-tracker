import React, { FunctionComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { logout } from '../redux/thunks';
import { NavLink } from '../components/NavLink';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Routes } from '../components/Routes';
import { Private } from '../components/Route';
import { Title } from '../components/Title';
import { Nav } from '../components/Nav';
import { Unfollowers } from './Unfollowers';
import { Followers } from './Followers';

type DispatchProps = {
  logout(...args: any[]): void;
};

type OwnProps = {
  user: NonNullable<State['user']>;
};

type Props = DispatchProps & OwnProps;

const PureHome: FunctionComponent<Props> = ({ user, logout }) => (
  <Fragment>
    <Header>
      <Title>{user.name}</Title>
      <Button i18n='logout' onClick={logout}/>
    </Header>
    <Routes path='/' component={Unfollowers} exact>
      <Private path='/followers' component={Followers}/>
    </Routes>
    <Footer>
      <Nav>
        <NavLink i18n='unfollowers' to='/'/>
        <NavLink i18n='followers' to='/followers'/>
      </Nav>
    </Footer>
  </Fragment>
);

export const Home = connect<{}, DispatchProps, OwnProps, State>(
  null,
  { logout }
)(PureHome);
