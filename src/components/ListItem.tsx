import styled from 'styled-components/macro';

export const ListItem = styled.li`
  padding: ${({ theme }) => theme.spacing}px;

  & + & {
    border-top: 1px solid;
  }
`;
