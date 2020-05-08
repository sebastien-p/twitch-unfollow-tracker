import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

export type EmptyProps = JSX.IntrinsicElements['p'];

export const Empty: FunctionComponent<EmptyProps> = (
  { children, ...props }
) => {
  const [t] = useTranslation();

  return (<p className='centered' {...props}>{t('empty')}</p>);
};
