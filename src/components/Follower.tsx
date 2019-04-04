import React, { FunctionComponent } from 'react';
import styled from 'styled-components/macro';

import { Follower as FollowerModel } from '../services/database';
import { DateTime } from './DateTime';

export type FollowerProps = JSX.IntrinsicElements['a'] & {
  data: FollowerModel;
};

const PureFollower: FunctionComponent<FollowerProps> = (
  { children, href, data: { name, date }, ...props }
) => (
  <a {...props} href={`https://twitch.tv/${name}`} target="_blank">
    {name}
    <DateTime date={date}/>
  </a>
);

export const Follower = styled(PureFollower)`
  color: ${({ theme }) => theme.primary1};
  display: block;
  padding: ${({ theme }) => theme.spacing * 2}px;
  padding-right: ${({ theme }) => theme.spacing * 4}px;
  position: relative;
  text-decoration: none;

  &::after {
    content: '〉';
    font-weight: bold;
    position: absolute;
    right: ${({ theme }) => theme.spacing}px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
