import React, { FunctionComponent, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components/macro';

type Theme = {
  font: string;
  margin: number;
  twitchColor: string;
  primaryColor: string;
  secondaryColor: string;
  errorColor: string;

  tutuColor: string;
  titiColor: string;
  totoColor: string;
  teteColor: string;
  backgroundColor: string;
  foregroundColor: string;
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
    background: ${({ theme }) => theme.totoColor};
    color: ${({ theme }) => theme.teteColor};
    font-family: ${({ theme }) => theme.font};
    margin: 0;
  }

  #root {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

const theme: Theme = {
  margin: 10,
  errorColor: '#ff0000',
  twitchColor: '#FCFC62',
  primaryColor: '#FEFFEA',
  secondaryColor: '#A3A3A3',
  font: 'Helvetica Neue, Helvetica, Arial, sans- serif',

  tutuColor: '#a3572b',
  titiColor: '#f4a217',
  totoColor: '#cfd0cd',
  teteColor: '#7e8083',
  backgroundColor: '#2f2e35',
  foregroundColor: '#eaebe5'
};

export const Styles: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Global/>
      {children}
    </Fragment>
  </ThemeProvider>
);
