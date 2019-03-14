import React, { FunctionComponent } from 'react';
import styled from 'styled-components/macro';

import { Header } from './Header';
import { useTranslation } from 'react-i18next';

export type TitleProps = JSX.IntrinsicElements['h1'] & {
  i18n?: string;
};

const PureTitle: FunctionComponent<TitleProps> = (
  { children, i18n, ...props }
) => {
  const [t] = useTranslation();

  return (
    <h1 {...props}>
      {i18n && t(i18n)}
      {children}
    </h1>
  );
}

export const Title = styled(PureTitle)`
  color: ${({ theme }) => theme.primary2};
  font-size: 1.75em;
  font-weight: normal;
  padding: ${({ theme }) => `${theme.spacing * 2}px ${theme.spacing * 4}px`};
  margin: 0;

  ${Header} & {
    color: ${({ theme }) => theme.secondary1};
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
  }
`;
