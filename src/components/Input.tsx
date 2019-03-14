import { ComponentType } from 'react';
import { FieldConfig, Field } from 'formik';
import styled from 'styled-components/macro';

export const Input = styled(Field as ComponentType<FieldConfig>)`
  background: ${({ theme }) => theme.secondary2};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.spacing / 2}px;
  color: ${({ theme }) => theme.primary1};
  font: inherit;
  padding: ${({ theme }) => theme.spacing}px;
`;
