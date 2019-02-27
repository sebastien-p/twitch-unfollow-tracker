import React, { FunctionComponent, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components/macro';

type Theme = {
  margin: number;
  twitchColor: string;
  primaryColor: string;
  secondaryColor: string;
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
  body {
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.secondaryColor};
    display: flex;
    flex-direction: column;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 0;
  }
`;

const theme: Theme = {
  margin: 10,
  twitchColor: '#4b367c',
  primaryColor: '#0f0e11',
  secondaryColor: '#dad8de'
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
