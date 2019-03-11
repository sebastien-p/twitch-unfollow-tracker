import styled from 'styled-components/macro';

import { Header } from './Header';

export const Footer = styled(Header).attrs({ as: 'footer' })`
  margin-top: ${({ theme }) => theme.margin * 4}px;
`;
