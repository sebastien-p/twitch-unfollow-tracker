import styled from 'styled-components/macro';

export const Content = styled.main`
  background: ${({ theme }) => theme.foregroundColor};
  box-shadow: 0 0 5px 0 black;
  flex: 1 1 auto;
  overflow: auto;
  margin: 0 ${({ theme }) => theme.margin * 4}px;
  padding: ${({ theme }) => theme.margin * 2}px;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;
