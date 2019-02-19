import React, { FunctionComponent } from 'react';
import { FormikConfig, Formik, Form as FormikForm } from 'formik';

type Props = FormikConfig<any>;

export const Form: FunctionComponent<Props> = ({ children, ...props }) => (
  <Formik {...props}>
    {({ dirty, isValid }) => (
      <FormikForm>
        {children}
        <button type='submit' disabled={dirty && !isValid}>OK</button>
      </FormikForm>
    )}
  </Formik>
);
