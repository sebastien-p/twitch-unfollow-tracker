import styled from 'styled-components/macro';

export const Header = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.primary1};
  display: flex;
  flex: none;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing}px;
  white-space: nowrap;
`;
