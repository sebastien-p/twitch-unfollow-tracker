import React, { FunctionComponent, Fragment } from 'react';

import { Follower as FollowerModel } from '../services/database';

export type FollowerProps = {
  data: FollowerModel;
};

export const Follower: FunctionComponent<FollowerProps> = (
  { data: { name, date } }
) => (
  <Fragment>
    <a href={`https://twitch.tv/${name}`}>{name}</a>
    <time dateTime={date}>{date}</time>
  </Fragment>
);
