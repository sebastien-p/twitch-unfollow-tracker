import React, { FunctionComponent } from 'react';
import { NavLinkProps, NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

type Props = NavLinkProps & {
  i18n?: string;
};

const PureNavLink: FunctionComponent<Props> = (
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

export const NavLink = styled(PureNavLink).attrs({
  activeClassName: 'active',
  exact: true
})`
  color: inherit;
  display: inline-block;
  padding: 10px;
  text-decoration: none;

  &:hover,
  &.${({ activeClassName }) => activeClassName} {
    color: red;
  }
`;
