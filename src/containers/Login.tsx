import React, { FunctionComponent, Fragment } from 'react';

import { getLoginURL } from '../services/twitch';
import { Copyright } from '../components/Copyright';
import { Content } from '../components/Content';
import { Title } from '../components/Title';

const loginURL: string = getLoginURL();

// FIXME: i18n
export const Login: FunctionComponent = () => (
  <Fragment>
    <Title i18n="login"/>
    <Content>
      <a href={loginURL}>Auth</a>
    </Content>
    <Copyright/>
  </Fragment>
);
