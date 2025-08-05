import GlobalStyle from '@/shared/components/GlobalStyle';
import RootLayout from '@/shared/components/layout/RootLayout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { OverlayProvider } from 'overlay-kit';
import 'normalize.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>hyub2</title>
      </Head>
      <GlobalStyle />
      <OverlayProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </OverlayProvider>
    </>
  );
};

export default App;
