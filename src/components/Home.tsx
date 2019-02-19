import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Follower } from '../services/database';
import { User, State } from '../redux/store';
import { loadUnfollowers } from '../redux/thunks';
import { logout } from '../redux/actions';

type Props = {
  user: User;
  unfollowers: Follower[];
  loadUnfollowers(...args: any[]): void;
  logout: typeof logout;
};

const PureHome: FunctionComponent<Props> = ({
  user,
  unfollowers,
  loadUnfollowers,
  logout
}) => {
  return !user ? <Redirect to='/login'/> : (
    <div>
      <h1>{user.name}</h1>
      <button type='button' onClick={loadUnfollowers}>Load</button>
      <button type='button' onClick={logout}>Logout</button>
      {!unfollowers.length ? <p>No unfollower</p> : unfollowers.map(
        ({ name, id }) => (
          <li key={id}>
            <a href={`https://twitch.tv/${name}`}>{name}</a>
          </li>
        )
      )}
    </div>
  );
};

export const Home = connect<
  Pick<Props, 'user' | 'unfollowers'>,
  Pick<Props, 'loadUnfollowers' | 'logout'>,
  {},
  State
>(
  ({ user, unfollowers }) => ({ // DRY
    user,
    unfollowers
  }),
  {
    loadUnfollowers,
    logout
  }
)(PureHome);
