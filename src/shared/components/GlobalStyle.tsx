import { css, Global } from '@emotion/react';

const GlobalStyle = () => {
  return <Global styles={Styles} />;
};

export default GlobalStyle;

const Styles = css`
  @font-face {
    font-family: 'Moneygraphy-Pixel';
    src: url('/fonts/Moneygraphy-Pixel.woff2') format('woff2');
  }

  * {
    font-family: Moneygraphy-Pixel, Arial, Helvetica, sans-serif;
  }
`;
