import styled from 'styled-components/macro';

export const Header = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.twitchColor};
  display: flex;
  flex: none;
  justify-content: space-between;
`;
