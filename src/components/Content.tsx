import styled from 'styled-components/macro';

export const Content = styled.main`
  flex: 1 1 auto;
  overflow: auto;
  padding: ${({ theme }) => theme.margin}px;
  -webkit-overflow-scrolling: touch;
`;
