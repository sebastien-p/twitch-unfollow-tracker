import React, { FunctionComponent, Fragment } from 'react';

import { Follower as FollowerModel } from '../services/database';

type Props = {
  data: FollowerModel;
};

export const Follower: FunctionComponent<Props> = (
  { data: { name, date } }
) => (
  <Fragment>
    <a href={`https://twitch.tv/${name}`}>{name}</a>
    <time dateTime={date}>{date}</time>
  </Fragment>
);
