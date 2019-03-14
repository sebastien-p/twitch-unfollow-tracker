import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

export type EmptyProps = JSX.IntrinsicElements['p'];

const PureEmpty: FunctionComponent<EmptyProps> = (
  { children, ...props }
) => {
  const [t] = useTranslation();

  return (<p {...props}>{t('empty')}</p>);
};

export const Empty = styled(PureEmpty)`
  left: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;
