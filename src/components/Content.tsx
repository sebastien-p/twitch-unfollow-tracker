import styled from 'styled-components/macro';

export type ContentProps = {
  flex?: boolean;
};

export const Content = styled.main<ContentProps>`
  background: ${({ theme }) => theme.secondary1};
  box-shadow: ${({ theme: { spacing, primary2 } }) => {
    return `0 ${spacing / 2}px ${spacing * 3}px ${primary2}`;
  }};
  flex: ${({ flex }) => flex ? 1 : 0} 1 auto;
  overflow: auto;
  margin: 0 ${({ theme }) => theme.spacing * 4}px;
  -webkit-overflow-scrolling: touch;
`;
