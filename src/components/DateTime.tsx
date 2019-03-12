import React, { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDateTime } from '../i18n';

export type DateTimeProps = {
  date: string;
};

export const DateTime: FunctionComponent<DateTimeProps> = ({ date }) => {
  const { i18n: { language } } = useTranslation();

  const formatted: string = useMemo(
    () => formatDateTime(language, date),
    [date, language]
  );

  return (<time dateTime={date}>{formatted}</time>);
};
