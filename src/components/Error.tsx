import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import i18next from 'i18next'

export type ErrorProps = Pick<i18next.TOptions, 'replace'> & {
  i18n: string;
};

const PureError: FunctionComponent<ErrorProps> = (
  { replace, i18n }
) => {
  const [t] = useTranslation();

  return (<span>{t(i18n, { replace })}</span>);
};

export const Error = styled(PureError)`
  color: red;
  font-weight: normal;
`;
