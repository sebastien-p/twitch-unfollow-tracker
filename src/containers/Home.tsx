import React, { FunctionComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';

import { State } from '../redux/store';
import { logout } from '../redux/thunks';
import { NavLink } from '../components/NavLink';
import { Button } from '../components/Button';
import { Routes } from '../components/Routes';
import { Private } from '../components/Route';
import { Unfollowers } from './Unfollowers';
import { Followers } from './Followers';

const Header = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.twitchColor};
  display: flex;
  justify-content: space-between;
`;

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
      <h1>{user.name}</h1>
      <nav>
        <NavLink i18n='followers.title' to='/'/>
        <NavLink i18n='unfollowers.title' to='/unfollowers'/>
      </nav>
      <Button i18n='logout' onClick={logout}/>
    </Header>
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
