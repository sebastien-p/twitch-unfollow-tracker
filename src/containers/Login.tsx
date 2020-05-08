import React, { FunctionComponent, Fragment, useCallback } from 'react';

import { getLoginURL } from '../services/twitch';
import { Copyright } from '../components/Copyright';
import { Content } from '../components/Content';
import { Button } from '../components/Button';
import { Title } from '../components/Title';

export const Login: FunctionComponent = () => {
  const login = useCallback(() => {
    window.location.href = getLoginURL();
  }, []);

  return (
    <Fragment>
      <Title i18n='login'/>
      <Content flex>
        <Button className='centered' i18n='twitch' accent onClick={login}/>
      </Content>
      <Copyright/>
    </Fragment>
  );
};
