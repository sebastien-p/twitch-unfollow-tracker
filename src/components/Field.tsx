import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldConfig } from 'formik';

import { Label } from './Label';
import { Input } from './Input';
import { ErrorMessage } from './ErrorMessage';

export type FieldProps = Pick<FieldConfig, 'name'> & {
  i18n?: string;
};

export const Field: FunctionComponent<FieldProps> = (
  { name, i18n, children }
) => {
  const [t] = useTranslation();

  return (
    <Label>
      {i18n && t(i18n)}
      {children}
      <Input name={name}/>
      <ErrorMessage name={name}/>
    </Label>
  );
};
