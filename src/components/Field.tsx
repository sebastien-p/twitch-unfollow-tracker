import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldConfig } from 'formik';

import { Label } from './Label';
import { Input } from './Input';
import { ErrorMessage } from './ErrorMessage';

export type FieldProps = Pick<FieldConfig, 'name'>;

export const Field: FunctionComponent<FieldProps> = (
  { children, name }
) => {
  const [t] = useTranslation();

  return (
    <Label>
      {t(name)}
      {children}
      <Input name={name}/>
      <ErrorMessage name={name}/>
    </Label>
  );
};
