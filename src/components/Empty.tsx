import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

type EmptyProps = JSX.IntrinsicElements['p'];

export const Empty: FunctionComponent<EmptyProps> = (
  { children, ...props }
) => {
  const [t] = useTranslation();

  return (<p {...props}>{t('empty')}</p>);
};
