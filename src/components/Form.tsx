import React, { FunctionComponent, useCallback } from 'react';
import { FormikConfig, Formik, Form as FormikForm } from 'formik';
import styled from 'styled-components/macro';

import { Button } from './Button';

export type FormProps<T = any> = Pick<
  FormikConfig<T>,
  'onSubmit' | 'initialValues' | 'validationSchema'
> & {
  button: string;
};

type Render<T = any> = NonNullable<FormikConfig<T>['render']>;

const PureForm = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  font-weight: bold;

  > * + * {
    margin-top: ${({ theme }) => theme.margin * 3}px;
  }
`;

export const Form: FunctionComponent<FormProps> = (
  { button, children, ...props }
) => {
  const render: Render = useCallback<Render>(
    ({ isValid }) => (
      <PureForm>
        {children}
        <Button type='submit' i18n={button} disabled={!isValid}/>
      </PureForm>
    ),
    [children]
  );

  return (<Formik {...props} render={render}/>);
};
