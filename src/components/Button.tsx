import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

type Props = JSX.IntrinsicElements['button'] & {
  i18n?: string;
};

export const Button: FunctionComponent<Props> = (
  { type = 'button', i18n, children, ...props }
) => {
  const [t] = useTranslation();

  return (
    <button type={type} {...props}>
      {i18n && t(i18n)}
      {children}
    </button>
  );
};
