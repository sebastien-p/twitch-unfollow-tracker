import React, { FunctionComponent, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components/macro';

type Theme = {
  font: string;
  margin: number;
  twitchColor: string;
  primaryColor: string;
  secondaryColor: string;
  errorColor: string;
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
    background: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.secondaryColor};
    font-family: ${({ theme }) => theme.font};
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;

const theme: Theme = {
  margin: 10,
  errorColor: '#ff0000',
  twitchColor: '#4b367c',
  primaryColor: '#0f0e11',
  secondaryColor: '#dad8de',
  font: 'Helvetica Neue, Helvetica, Arial, sans- serif'
};

export const Styles: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Global/>
      {children}
      {/* <footer>Theme picker</footer> TODO */}
    </Fragment>
  </ThemeProvider>
);
