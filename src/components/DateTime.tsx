import React, { FunctionComponent } from 'react';
import styled from 'styled-components/macro';

import { useDateLocalization } from '../i18n';

export type DateTimeProps = JSX.IntrinsicElements['time'] & {
  date: string;
};

const PureDateTime: FunctionComponent<DateTimeProps> = (
  { children, date, ...props }
) => {
  const localized: string = useDateLocalization(date);

  return (<time  {...props} dateTime={date}>{localized}</time>);
};

export const DateTime = styled(PureDateTime)`
  color: ${({ theme }) => theme.primary2};
  display: block;
`;
