import GlobalStyle from '@/shared/components/GlobalStyle';
import RootLayout from '@/shared/components/layout/RootLayout';
import type { AppProps } from 'next/app';
import 'normalize.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
};

export default App;
