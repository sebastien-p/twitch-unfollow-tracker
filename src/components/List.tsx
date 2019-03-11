import React, { FunctionComponent, ReactNode, useCallback } from 'react';
import styled from 'styled-components/macro';

import { ListItem } from './ListItem';
import { Empty } from './Empty';

export type ListProps<T = any> = {
  children(item: T): ReactNode;
  items: T[];
};

type Render<T = any> = (item: T, index: number) => ReactNode;

const PureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const List: FunctionComponent<ListProps> = (
  { items, children }
) => {
  const render: Render = useCallback<Render>(
    (item, index) => <ListItem key={index}>{children(item)}</ListItem>,
    [children]
  );

  return (items.length ? <PureList>{items.map(render)}</PureList> : <Empty/>);
};
