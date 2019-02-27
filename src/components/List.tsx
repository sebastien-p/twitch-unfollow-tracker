import React, { FunctionComponent, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

const Wrapper = styled.ul`
  list-style: none;
  /* margin: 0; */
  /* padding: 0; */
`;

const Empty = styled.p`
  /* margin: 0; */
  /* padding: 0; */
`;

const Item = styled.li`
  padding: ${({ theme }) => theme.margin};
`;

type Props = {
  items: any[];
  empty: string;
  children(items: any): ReactNode;
};

type Render = (item: any, index: number) => ReactNode;

export const List: FunctionComponent<Props> = ({ items, empty, children }) => {
  const [t] = useTranslation();

  const render: Render = useCallback<Render>(
    (item, index) => <Item key={index}>{children(item)}</Item>,
    [children]
  );

  return (items.length
    ? <Wrapper>{items.map(render)}</Wrapper>
    : <Empty>{t(empty)}</Empty>
  );
};
