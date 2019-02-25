import React, { FunctionComponent, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  items: any[];
  empty: string;
  children(items: any): ReactNode;
};

type Render = (item: any, index: number) => ReactNode;

export const List: FunctionComponent<Props> = ({ items, empty, children }) => {
  const [t] = useTranslation();

  const render: Render = useCallback<Render>(
    (item, index) => <li key={index}>{children(item)}</li>,
    [children]
  );

  return (items.length ? <ul>{items.map(render)}</ul> : <p>{t(empty)}</p>);
};
