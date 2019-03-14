import React, { FunctionComponent, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components/macro';

type Theme = {
  font: string;
  spacing: number;
  accent1: string;
  accent2: string;
  primary1: string;
  primary2: string;
  secondary1: string;
  secondary2: string;
};

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}

const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.secondary2};
    color: ${({ theme }) => theme.primary2};
    font-family: ${({ theme }) => theme.font};
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;

const theme: Theme = {
  spacing: 10,
  font: 'Helvetica Neue, Helvetica, Arial, sans- serif',
  accent1: '#f4a217',
  accent2: '#a3572b',
  primary1: '#2f2e35',
  primary2: '#7e8083',
  secondary1: '#eaebe5',
  secondary2: '#cfd0cd'
};

export const Styles: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Global/>
      {children}
    </Fragment>
  </ThemeProvider>
);
