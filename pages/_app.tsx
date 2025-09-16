import GlobalStyle from '@/shared/components/GlobalStyle';
import RootLayout from '@/shared/components/layout/RootLayout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { OverlayProvider } from 'overlay-kit';
import RedirectionBoundary from '@/shared/components/ErrorBoundary/RedirectionBoundary';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import { captureException } from '@sentry/nextjs';
import Error from '@/shared/components/Error';
import 'normalize.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>hyub2</title>
      </Head>
      <GlobalStyle />
      <ErrorBoundary
        onError={(e) => {
          captureException(e);
        }}
        fallbackRender={Error}
      >
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
