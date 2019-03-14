import React, { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { formatDateTime } from '../i18n';

export type DateTimeProps = JSX.IntrinsicElements['time'] & {
  date: string;
};

const PureDateTime: FunctionComponent<DateTimeProps> = (
  { children, date, ...props }
) => {
  const { i18n: { language } } = useTranslation();

  const formatted: string = useMemo(
    () => formatDateTime(language, date),
    [date, language]
  );

  return (<time  {...props} dateTime={date}>{formatted}</time>);
};

export const DateTime = styled(PureDateTime)`
  color: ${({ theme }) => theme.primary2};
  display: block;
`;
