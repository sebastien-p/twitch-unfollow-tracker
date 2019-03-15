import React, { FunctionComponent } from 'react';

import {
  NavLinkProps as RouterNavLinkProps,
  NavLink as RouterNavLink
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

export type NavLinkProps = Pick<
  RouterNavLinkProps,
  'to' | 'activeClassName'
> & {
  i18n: string;
};

const PureNavLink: FunctionComponent<NavLinkProps> = (
  { children, i18n, ...props }
) => {
  const [t] = useTranslation();

  return (<RouterNavLink {...props} exact>{t(i18n)}</RouterNavLink>);
};

export const NavLink = styled(PureNavLink).attrs({
  activeClassName: 'active'
})`
  color: ${({ theme }) => theme.primary2};
  display: inline-block;
  padding: ${({ theme }) => theme.spacing}px;
  text-decoration: none;

  &:hover,
  &.${({ activeClassName }) => activeClassName} {
    color: ${({ theme }) => theme.accent1};
  }
`;
