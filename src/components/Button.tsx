import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  i18n?: string;
  primary?: boolean;
};

const PureButton: FunctionComponent<ButtonProps> = (
  { type = 'button', i18n, primary, children, ...props }
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
  background: ${
    ({ primary, theme }) => primary ? theme.titiColor : theme.teteColor
  };
  border: 1px solid;
  border-radius: ${({ theme }) => theme.margin / 2}px;
  color: ${({ theme }) => theme.foregroundColor};
  cursor: pointer;
  display: inline-block;
  font: inherit;
  padding: ${({ theme }) => `${theme.margin}px ${theme.margin * 2}px`};

  &:disabled {
    cursor:not-allowed;
    opacity: 0.25;
  }

  &:active {
    opacity: 0.75;
  }
`;
