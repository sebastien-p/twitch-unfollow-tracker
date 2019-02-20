import React, { FunctionComponent } from 'react';

type Props = JSX.IntrinsicElements['button'];

export const Button: FunctionComponent<Props> = (
  { children, type = 'button', ...props }
) => (
  <button type={type} {...props}>{children}</button>
);
