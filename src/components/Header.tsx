import styled from 'styled-components/macro';

export const Header = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.backgroundColor};
  display: flex;
  flex: none;
  justify-content: space-between;
  padding: ${({ theme }) => theme.margin}px;
  width: 100%;
`;
