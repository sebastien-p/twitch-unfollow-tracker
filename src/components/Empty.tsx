import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

type EmptyProps = JSX.IntrinsicElements['p'];

const PureEmpty: FunctionComponent<EmptyProps> = (
  { children, ...props }
) => {
  const [t] = useTranslation();

  return (<p {...props}>{t('empty')}</p>);
};

export const Empty = styled(PureEmpty)``;
