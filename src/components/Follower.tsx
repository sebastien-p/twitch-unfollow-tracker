import React, { FunctionComponent, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Follower as FollowerModel } from '../services/database';

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
        <time dateTime={date}>{date}</time>
      </p>
    </Fragment>
  );
};
