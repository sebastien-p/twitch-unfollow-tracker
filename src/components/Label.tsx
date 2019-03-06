import styled from 'styled-components/macro';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;

  > * {
    margin-top: ${({ theme }) => theme.margin}px;
  }
`;
