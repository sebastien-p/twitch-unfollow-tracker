import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { Header } from './Header';

export type CopyrightProps = JSX.IntrinsicElements['p'];

const PureCopyright: FunctionComponent<CopyrightProps> = (
  { children, ...props }
) => {
  const [t] = useTranslation();

  return (<p {...props}>{t('copyright')}</p>)
}

export const Copyright = styled(PureCopyright)`
  margin: 0;
  padding: ${({ theme }) => theme.spacing * 3}px;
  text-align: center;

  ${Header} & {
    color: ${({ theme }) => theme.secondary1};
    padding: 0;
  }
`;
