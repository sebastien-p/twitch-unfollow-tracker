import React, { FunctionComponent, useCallback } from 'react';

import {
  ErrorMessageProps as FormikErrorMessageProps,
  ErrorMessage as FormikErrorMessage
} from 'formik';

import { Error } from './Error';

export type ErrorMessageProps = Pick<FormikErrorMessageProps, 'name'>;

type Render = NonNullable<FormikErrorMessageProps['render']>;

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = (
  { name }
) => {
  const render: Render = useCallback<Render>(
    error => <Error i18n={error} replace={name}/>,
    [name]
  );

  return (<FormikErrorMessage name={name} render={render}/>);
};
