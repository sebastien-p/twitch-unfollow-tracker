import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

export const Empty: FunctionComponent = () => {
  const [t] = useTranslation();

  return (<p>{t('empty')}</p>);
};
