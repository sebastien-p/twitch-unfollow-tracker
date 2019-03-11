import { Field } from 'formik';
import styled from 'styled-components/macro';

export const Input = styled(Field)`
  border: 1px solid ${({ theme }) => theme.teteColor};
  border-radius: ${({ theme }) => theme.margin / 2}px;
  color: ${({ theme }) => theme.backgroundColor};
  font: inherit;
  padding: ${({ theme }) => theme.margin}px;
`;
