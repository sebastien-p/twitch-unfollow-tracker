import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { loadFollowers } from '../redux/thunks';
import { FollowersList } from './FollowersList';

type StateProps = Pick<State, 'followers'>;

type DispatchProps = {
  loadFollowers(...args: any[]): void; // FIXME
};

type Props = StateProps & DispatchProps;

const PureFollowers: FunctionComponent<Props> = (
  { loadFollowers, followers: data }
) => {
  useEffect(() => { loadFollowers(); }, []);

  return (<FollowersList data={data} title='Followers' empty='No followers'/>);
};

export const Followers = connect<StateProps, DispatchProps, {}, State>(
  ({ followers }) => ({ followers }),
  { loadFollowers }
)(PureFollowers);
