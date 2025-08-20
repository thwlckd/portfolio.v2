import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <meta name="description" content="hyub2 archive" />
        <link rel="icon" href="/svg/hyub.svg" />
        <meta property="og:title" content="hyub2" />
        <meta property="og:site_name" content="hyub2" />
        <meta property="og:description" content="hyub2 archive" />
        <meta property="og:url" content="https://hyub.xyz" />
        <meta property="og:image" content="/images/og.webp" />

        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VBCXVMB45G" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VBCXVMB45G');
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
