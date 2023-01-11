import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from '@next/font/google';
import styled, { ThemeProvider } from 'styled-components';
import Nav from '../components/Layout/Nav';
import theme from '../utils/theme';
import ErrorBoundary from '../components/Layout/ErrorBoundary';
import AppCtx, { initialAppContext } from '../context/appContext';

const Main = styled.main`
  color: ${(props) => props.theme.dark};
  margin: auto;
  width: 60%;
`;

const robo = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppCtx.Provider value={initialAppContext}>
        <Main className={robo.className}>
          <Nav />
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Main>
      </AppCtx.Provider>
    </ThemeProvider>
  );
}
