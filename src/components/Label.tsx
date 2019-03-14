import styled from 'styled-components/macro';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;

  > * {
    margin-top: ${({ theme }) => theme.spacing}px;
  }
`;
