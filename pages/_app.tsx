import GlobalStyle from '@/shared/components/GlobalStyle';
import RootLayout from '@/shared/components/layout/RootLayout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { OverlayProvider } from 'overlay-kit';
import { ErrorBoundary } from '@sentry/nextjs';
import 'normalize.css';
import RedirectionBoundary from '@/shared/components/ErrorBoundary/RedirectionBoundary';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>hyub2</title>
      </Head>
      <GlobalStyle />
      <ErrorBoundary>
        <RedirectionBoundary>
          <OverlayProvider>
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          </OverlayProvider>
        </RedirectionBoundary>
      </ErrorBoundary>
    </>
  );
};

export default App;
