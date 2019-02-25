import React, { FunctionComponent, useCallback } from 'react';
import { FieldConfig, Field as FormikField, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

type Props = FieldConfig & {
  i18n?: string;
};

type Render = (error: string) => string;

export const Field: FunctionComponent<Props> = (
  { i18n, children, ...props }
) => {
  const [t] = useTranslation();

  const render: Render = useCallback(
    error => t(error, { i18n }),
    [i18n, t]
  );

  return (
    <label>
      {i18n && t(i18n)}
      {children}
      <FormikField {...props}/>
      <ErrorMessage name={props.name} render={render}/>
    </label>
  );
};
