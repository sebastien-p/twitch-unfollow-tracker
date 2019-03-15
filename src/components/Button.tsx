import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  i18n: string;
  accent?: boolean;
};

const PureButton: FunctionComponent<ButtonProps> = (
  { children, type = 'button', i18n, accent, ...props }
) => {
  const [t] = useTranslation();

  return (<button {...props} type={type}>{t(i18n)}</button>);
};

export const Button = styled(PureButton)`
  background: ${
    ({ accent, theme }) => accent ? theme.accent1 : theme.primary2
  };
  border: 1px solid;
  border-radius: ${({ theme }) => theme.spacing / 2}px;
  color: ${({ theme }) => theme.secondary1};
  cursor: pointer;
  display: inline-block;
  font: inherit;
  padding: ${({ theme }) => `${theme.spacing}px ${theme.spacing * 2}px`};

  &:disabled {
    cursor:not-allowed;
    opacity: 0.5;
  }

  &:active {
    opacity: 0.75;
  }
`;
