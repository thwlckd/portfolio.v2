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

  @font-face {
    font-family: 'Moneygraphy-Rounded';
    src: url('/fonts/Moneygraphy-Rounded.woff2') format('woff2');
  }

  * {
    font-family: Moneygraphy-Rounded, Moneygraphy-Pixel, Arial, Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
    color: currentColor;
  }

  button {
    border: none;
    padding: 0;
    background: transparent;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;
