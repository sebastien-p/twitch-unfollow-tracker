import React, { FunctionComponent } from 'react';
import { FieldConfig, Field as FormikField, ErrorMessage } from 'formik';

type Props = FieldConfig;

export const Field: FunctionComponent<Props> = ({ children, ...props }) => (
  <label>
    {children}
    <FormikField {...props}/>
    <ErrorMessage name={props.name}/>
  </label>
);
