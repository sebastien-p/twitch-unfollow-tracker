import styled from 'styled-components/macro';

type ContentProps = {
  flex?: boolean;
};

export const Content = styled.main<ContentProps>`
  background: ${({ theme }) => theme.foregroundColor};
  box-shadow: 0 0 5px 0 black;
  flex: ${({ flex }) => flex ? 1 : 0} 1 auto;
  overflow: auto;
  margin: 0 ${({ theme }) => theme.margin * 4}px;
  padding: ${({ theme }) => theme.margin * 2}px;
  -webkit-overflow-scrolling: touch;
`;
