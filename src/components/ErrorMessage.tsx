import React, { FunctionComponent, useCallback } from 'react';

import {
  ErrorMessageProps as FormikErrorMessageProps,
  ErrorMessage as FormikErrorMessage
} from 'formik';

import { Error } from './Error';

export type ErrorMessageProps = Pick<FormikErrorMessageProps, 'name'>;

type Render = NonNullable<FormikErrorMessageProps['render']>;

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = (
  { children, ...props } // FIXME
) => {
  const render: Render = useCallback<Render>(
    error => <Error i18n={error} replace={props}/>,
    [props]
  );

  return (<FormikErrorMessage name={props.name} render={render}/>);
};
