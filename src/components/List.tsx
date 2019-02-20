import React, { FunctionComponent, ReactNode, useCallback } from 'react';

type Props = {
  items: any[];
  empty: string;
  children(items: any): ReactNode;
};

type Render = (item: any, index: number) => ReactNode;

export const List: FunctionComponent<Props> = ({ children, items, empty }) => {
  const render: Render = useCallback<Render>(
    (item, index) => <li key={index}>{children(item)}</li>,
    [children]
  );

  return (items.length ? <ol>{items.map(render)}</ol> : <p>{empty}</p>);
};
