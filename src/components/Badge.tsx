import styled from 'styled-components/macro';

export const Badge = styled.sup`
  background: ${({ theme }) => theme.tutuColor};
  border-radius: ${({ theme }) => theme.margin / 2}px;
  color: ${({ theme }) => theme.foregroundColor};
  display: inline-block;
  font-size: 0.5em;
  margin: 0 ${({ theme }) => theme.margin}px;
  padding: ${({ theme }) => `${theme.margin / 4}px ${theme.margin}px`};
`;
