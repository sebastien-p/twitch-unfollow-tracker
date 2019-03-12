import React, { FunctionComponent, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Follower as FollowerModel } from '../services/database';
import { DateTime } from './DateTime';

export type FollowerProps = {
  data: FollowerModel;
};

export const Follower: FunctionComponent<FollowerProps> = (
  { data: { name, date } }
) => {
  const [t] = useTranslation();

  return (
    <Fragment>
      <a href={`https://twitch.tv/${name}`}>{name}</a>
      <p>
        {t('followDate')}
        <DateTime date={date}/>
      </p>
    </Fragment>
  );
};
