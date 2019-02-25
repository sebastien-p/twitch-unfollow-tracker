import React, { FunctionComponent, useCallback } from 'react';
import { FormikConfig, Formik, Form as FormikForm } from 'formik';

import { Button } from './Button';

type Props = Pick<
  FormikConfig<any>,
  'onSubmit' | 'initialValues' | 'validationSchema'
> & {
  button: string;
};

type Render = NonNullable<FormikConfig<any>['render']>;

export const Form: FunctionComponent<Props> = (
  { button, children, ...props }
) => {
  const render: Render = useCallback<Render>(
    ({ isValid }) => (
      <FormikForm>
        {children}
        <Button type='submit' i18n={button} disabled={!isValid}/>
      </FormikForm>
    ),
    [children]
  );

  return (<Formik {...props} render={render}/>);
};
