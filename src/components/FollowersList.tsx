import React, {
  FunctionComponent,
  ReactNode,
  Fragment,
  useCallback
} from 'react';

import { useTranslation } from 'react-i18next';

import { Follower as FollowerModel } from '../services/database';
import { Follower } from './Follower';
import { List } from './List';

type Props = {
  data: FollowerModel[];
  i18n: string;
};

type Render = (item: FollowerModel) => ReactNode;

export const FollowersList: FunctionComponent<Props> = (
  { data, i18n, children }
) => {
  const [t] = useTranslation();

  const render: Render = useCallback<Render>(
    item => <Follower data={item}/>,
    []
  );

  return (
    <Fragment>
      <h2>{t(`${i18n}.title`)} ({data.length})</h2>
      {children}
      <List items={data} empty={`${i18n}.empty`}>{render}</List>
    </Fragment>
  );
};
