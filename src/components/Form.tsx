import React, { FunctionComponent, useCallback } from 'react';
import { FormikConfig, Formik, Form as FormikForm } from 'formik';
import styled from 'styled-components/macro';

import { Button } from './Button';

const Wrapper = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  font-weight: bold;

  > * + * {
    margin-top: ${({ theme }) => theme.margin * 3}px;
  }
`;

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
      <Wrapper>
        {children}
        <Button type='submit' i18n={button} disabled={!isValid}/>
      </Wrapper>
    ),
    [children]
  );

  return (<Formik {...props} render={render}/>);
};
