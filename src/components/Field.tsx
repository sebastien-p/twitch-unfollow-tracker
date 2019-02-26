import React, { FunctionComponent, ReactNode, useCallback } from 'react';
import { FieldConfig, Field as FormikField, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;

  > * {
    margin-top: 10px;
  }
`;

const Input = styled(FormikField)`
  border: 1px solid;
  border-radius: 5px;
  font: inherit;
  padding: 10px;
`;

const Error = styled.span`
  color: red;
  font-weight: normal;
`;

type Props = FieldConfig & {
  i18n?: string;
};

type Render = (error: string) => ReactNode;

export const Field: FunctionComponent<Props> = (
  { i18n, children, ...props }
) => {
  const [t] = useTranslation();

  const render: Render = useCallback(
    error => <Error>{t(error, { i18n })}</Error>,
    [i18n, t]
  );

  return (
    <Wrapper>
      {i18n && t(i18n)}
      {children}
      <Input {...props}/>
      <ErrorMessage name={props.name} render={render}/>
    </Wrapper>
  );
};
