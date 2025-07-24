import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <title>hyub2</title>
        <meta name="description" content="hyub2 archive" />
        <link rel="icon" href="/svg/hyub.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
