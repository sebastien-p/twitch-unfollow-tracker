import React, { FunctionComponent, useCallback } from 'react';
import { FormikConfig, Formik, Form as FormikForm } from 'formik';

import { Button } from './Button';

type Props = Pick<
  FormikConfig<any>,
  'onSubmit' | 'initialValues' | 'validationSchema'
>;

type Render = NonNullable<FormikConfig<any>['render']>;

export const Form: FunctionComponent<Props> = ({ children, ...props }) => {
  const render: Render = useCallback<Render>(
    ({ isValid }) => (
      <FormikForm>
        {children}
        <Button type='submit' disabled={!isValid}>OK</Button>
      </FormikForm>
    ),
    [children]
  );

  return (<Formik {...props} render={render}/>);
};
