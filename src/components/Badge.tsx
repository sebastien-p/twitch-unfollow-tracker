import styled from 'styled-components/macro';

export const Badge = styled.sup`
  background: ${({ theme }) => theme.accent2};
  border-radius: ${({ theme }) => theme.spacing / 2}px;
  color: ${({ theme }) => theme.secondary1};
  display: inline-block;
  font-size: 0.5em;
  margin: 0 ${({ theme }) => theme.spacing}px;
  padding: ${({ theme }) => `${theme.spacing / 4}px ${theme.spacing}px`};
`;
