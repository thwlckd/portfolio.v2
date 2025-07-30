import GlobalStyle from '@/shared/components/GlobalStyle';
import RootLayout from '@/shared/components/layout/RootLayout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'normalize.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>hyub2</title>
      </Head>
      <GlobalStyle />
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
};

export default App;
