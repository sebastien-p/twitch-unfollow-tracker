import React, {
  FunctionComponent,
  ReactNode,
  Fragment,
  useCallback
} from 'react';

import { Follower as FollowerModel } from '../services/database';
import { Follower } from './Follower';
import { List } from './List';

type Props = {
  data: FollowerModel[];
  title: string;
  empty: string;
};

type Render = (item: FollowerModel) => ReactNode;

export const FollowersList: FunctionComponent<Props> = (
  { children, data, title, empty }
) => {
  const render: Render = useCallback<Render>(
    item => <Follower data={item}/>,
    []
  );

  return (
    <Fragment>
      <h2>{title} ({data.length})</h2>
      {children}
      <List items={data} empty={empty}>{render}</List>
    </Fragment>
  );
};
