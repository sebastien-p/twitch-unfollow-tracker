import { Field } from 'formik';
import styled from 'styled-components/macro';

export const Input = styled(Field)`
  border: 1px solid;
  border-radius: ${({ theme }) => theme.margin / 2}px;
  font: inherit;
  padding: ${({ theme }) => theme.margin}px;
`;
