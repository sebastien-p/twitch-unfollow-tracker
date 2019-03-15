import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldConfig } from 'formik';

import { ErrorMessage } from './ErrorMessage';
import { Label } from './Label';
import { Input } from './Input';

export type FieldProps = Pick<FieldConfig, 'name'>;

export const Field: FunctionComponent<FieldProps> = ({ name }) => {
  const [t] = useTranslation();

  return (
    <Label>
      {t(name)} ({t(name + 'Help')})
      <Input name={name}/>
      <ErrorMessage name={name}/>
    </Label>
  );
};
