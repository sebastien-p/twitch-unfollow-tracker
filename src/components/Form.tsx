import React, { FunctionComponent } from 'react';
import { FormikConfig, Formik, Form as FormikForm } from 'formik';

type Props = FormikConfig<any>;

export const Form: FunctionComponent<Props> = ({ children, ...props }) => (
  <Formik {...props}>
    {({ isValid }) => (
      <FormikForm>
        {children}
        <button type='submit' disabled={!isValid}>OK</button>
      </FormikForm>
    )}
  </Formik>
);
