import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { loadUnfollowers } from '../redux/thunks';
import { FollowersList } from '../components/FollowersList';

type StateProps = Pick<State, 'unfollowers'>;

type DispatchProps = {
  loadUnfollowers(...args: any[]): void;
};

type Props = StateProps & DispatchProps;

const PureUnfollowers: FunctionComponent<Props> = ( // DRY
  { loadUnfollowers, unfollowers }
) => {
  useEffect(() => { loadUnfollowers(); }, []);

  return (<FollowersList data={unfollowers} i18n='unfollowers'/>);
};

export const Unfollowers = connect<StateProps, DispatchProps, {}, State>(
  ({ unfollowers }) => ({ unfollowers }),
  { loadUnfollowers }
)(PureUnfollowers);
