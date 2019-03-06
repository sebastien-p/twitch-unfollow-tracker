import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

const PureEmpty: FunctionComponent = () => {
  const [t] = useTranslation();

  return (<p>{t('empty')}</p>);
};

export const Empty = styled(PureEmpty)``;
