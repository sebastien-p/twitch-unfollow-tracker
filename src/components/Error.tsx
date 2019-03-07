import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import i18next from 'i18next'

export type ErrorProps = JSX.IntrinsicElements['span'] & Pick<
  i18next.TOptions,
  'replace'
> & {
  i18n: string;
};

const PureError: FunctionComponent<ErrorProps> = (
  { children, replace, i18n, ...props }
) => {
  const [t] = useTranslation();

  return (<span {...props}>{t(i18n, { replace })}</span>);
};

export const Error = styled(PureError)`
  color: ${({ theme }) => theme.errorColor};
  font-weight: normal;
`;
