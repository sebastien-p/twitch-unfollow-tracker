import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { Redirect } from 'react-router-dom';

type Props = {
  isLoggedIn: boolean;
};

const PureHome: FunctionComponent<Props> = ({ isLoggedIn }) => {
  return !isLoggedIn ? <Redirect to='/login'/> : (
    <div>home</div>
  );
};

export const Home = connect<
  Pick<Props, 'isLoggedIn'>,
  null,
  {},
  State
>(
  ({ user }) => ({ isLoggedIn: !!user }) // DRY
)(PureHome);
