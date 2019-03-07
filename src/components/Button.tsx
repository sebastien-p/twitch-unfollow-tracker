import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { Header } from './Header';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  i18n?: string;
};

const PureButton: FunctionComponent<ButtonProps> = (
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

export const Button = styled(PureButton)`
  background: ${({ theme }) => theme.twitchColor};
  border: none;
  border-radius: ${({ theme }) => theme.margin / 2}px;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  font: inherit;
  padding: ${({ theme }) => theme.margin}px;

  &:disabled {
    cursor:not-allowed;
    opacity: 0.25;
  }

  &:active {
    opacity: 0.75;
  }

  ${Header} & {
    background: ${({ theme }) => theme.primaryColor};
  }
`;
