import React, { FunctionComponent, Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Follower as FollowerModel } from '../services/database';
import { ListProps, List } from './List';
import { Follower } from './Follower';
import { Content } from './Content';
import { Title } from './Title';
import { Badge } from './Badge';

export type FollowersListProps = {
  data: FollowerModel[];
  i18n: string;
};

type Render = ListProps<FollowerModel>['children'];

export const FollowersList: FunctionComponent<FollowersListProps> = (
  { data, i18n }
) => {
  const [t] = useTranslation();

  const render: Render = useCallback<Render>(
    item => <Follower data={item}/>,
    []
  );

  return (
    <Fragment>
      <Title>
        {t(i18n)}
        <Badge>{data.length}</Badge>
      </Title>
      <Content flex>
        <List items={data}>{render}</List>
      </Content>
    </Fragment>
  );
};
