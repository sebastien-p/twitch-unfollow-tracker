import styled from 'styled-components/macro';

export const ListItem = styled.li`
  & + & {
    border-top: 1px solid ${({ theme }) => theme.secondary2};
  }
`;
