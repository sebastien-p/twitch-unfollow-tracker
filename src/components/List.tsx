import React, { FunctionComponent, useCallback, ReactNode } from 'react';
import AutoSizer, { AutoSizerProps } from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components/macro';

import { ListItem } from './ListItem';
import { Empty } from './Empty';

export type ListProps<T = any> = {
  children(item: T): ReactNode;
  items: T[];
};

type Render = AutoSizerProps['children'];

const StyledList = styled(FixedSizeList).attrs({
  innerElementType: 'ul'
})`
  ${({ innerElementType }) => innerElementType} {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const List: FunctionComponent<ListProps> = props => {
  const { children, items } = props;

  const render: Render = useCallback<Render>( // FIXME: magic value 77
    ({ height, width }) => (
      <StyledList
        itemCount={items.length}
        itemData={props}
        height={height}
        width={width}
        itemSize={77}>
        {ListItem}
      </StyledList>
    ),
    [children, items]
  );

  return (items.length ? <AutoSizer>{render}</AutoSizer> : <Empty/>);
};
