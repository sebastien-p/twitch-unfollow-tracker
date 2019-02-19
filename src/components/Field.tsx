import React, { FunctionComponent, Fragment } from 'react';
import { FieldConfig, Field as FormikField, ErrorMessage } from 'formik';

type Props = FieldConfig;

export const Field: FunctionComponent<Props> = ({ children, ...props }) => (
  <Fragment>
    <label>
      {children}
      <FormikField {...props}/>
    </label>
    <ErrorMessage name={props.name}/>
  </Fragment>
);
