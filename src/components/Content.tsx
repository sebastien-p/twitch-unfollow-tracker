import styled from 'styled-components/macro';

type ContentProps = {
  flex?: boolean;
};

export const Content = styled.main<ContentProps>`
  background: ${({ theme }) => theme.foregroundColor};
  box-shadow: ${({ theme: { margin, teteColor } }) => {
    return `0 ${margin / 2}px ${margin * 3}px ${teteColor}`
  }};
  flex: ${({ flex }) => flex ? 1 : 0} 1 auto;
  overflow: auto;
  margin: 0 ${({ theme }) => theme.margin * 4}px;
  padding: ${({ theme }) => theme.margin * 2}px;
  -webkit-overflow-scrolling: touch;
`;
