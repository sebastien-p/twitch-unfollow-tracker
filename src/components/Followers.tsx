import React, { FunctionComponent, ReactNode, useCallback } from 'react';

import { Follower as FollowerModel } from '../services/database';
import { Follower } from './Follower';
import { List } from './List';

type Props = {
  data: FollowerModel[];
  empty: string;
};

type Render = (item: FollowerModel) => ReactNode;

export const Followers: FunctionComponent<Props> = ({ data, empty }) => {
  const render: Render = useCallback<Render>(
    item => <Follower data={item}/>,
    []
  );

  return (<List items={data} empty={empty}>{render}</List>);
};
