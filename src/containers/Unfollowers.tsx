import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { loadUnfollowers, fetchUnfollowers } from '../redux/thunks';
import { FollowersList } from '../components/FollowersList';
import { Button } from '../components/Button';

type StateProps = Pick<State, 'unfollowers'>;

type DispatchProps = {
  loadUnfollowers(...args: any[]): void;
  fetchUnfollowers(...args: any[]): void;
};

type Props = StateProps & DispatchProps;

const PureUnfollowers: FunctionComponent<Props> = (
  { loadUnfollowers, fetchUnfollowers, unfollowers: data }
) => {
  useEffect(() => { loadUnfollowers(); }, []);

  return (
    <FollowersList data={data} i18n='unfollowers'>
      <Button onClick={fetchUnfollowers} i18n='load' primary/>
    </FollowersList>
  );
};

export const Unfollowers = connect<StateProps, DispatchProps, {}, State>(
  ({ unfollowers }) => ({ unfollowers }),
  { loadUnfollowers, fetchUnfollowers }
)(PureUnfollowers);
