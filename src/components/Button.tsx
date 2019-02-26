import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

type Props = JSX.IntrinsicElements['button'] & {
  i18n?: string;
};

const PureButton: FunctionComponent<Props> = (
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
  background: black;
  border: none;
  border-radius: 5px;
  color: white;
  display: inline-block;
  font: inherit;
  padding: 10px;

  &:disabled {
    opacity: 0.25;
  }

  &:active {
    opacity: 0.75;
  }
`;
