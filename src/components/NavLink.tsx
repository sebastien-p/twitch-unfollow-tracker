import React, { FunctionComponent } from 'react';
import { NavLinkProps, NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = NavLinkProps & {
  i18n?: string;
};

export const NavLink: FunctionComponent<Props> = (
  { i18n, children, ...props }
) => {
  const [t] = useTranslation();

  return (
    <RouterNavLink {...props}>
      {i18n && t(i18n)}
      {children}
    </RouterNavLink>
  );
};
