import React, { FunctionComponent } from 'react';
import { ListChildComponentProps } from 'react-window';
import styled from 'styled-components/macro';

import { ListProps } from './List';

export type ListItemProps<T = any> = JSX.IntrinsicElements['li'] & Pick<
  ListChildComponentProps,
  'index' | 'isScrolling' | 'style'
> & {
  data: ListProps<T>;
};

const PureListItem: FunctionComponent<ListItemProps> = (
  { children, data: { children: render, items }, index, isScrolling, ...props }
) => (
  <li {...props}>{render(items[index])}</li>
);

export const ListItem = styled(PureListItem)`
  & + & {
    border-top: 1px solid ${({ theme }) => theme.secondary2};
  }
`;
