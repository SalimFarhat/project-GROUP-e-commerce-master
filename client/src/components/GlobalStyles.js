import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --font-heading: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --padding-page: 24px;
    --itemBackground : #fafafa;
    --borderColor : #666878;
    --veryLightGreyBorder : #d8d8d8;
    /* --highlight : #E06666; <- replaced by accentColor */
    --mainTextColor: #2B2B2B;
    --subTextColor : #838383;
    /* --mainCATBackground: #E06666; */
    --mainCATBackground: #1b4965;
    --primaryColor: #1b4965;
    --accentColor: #02c39a;
    --errorColor: #d41913;
    --navigationColor: #cae9ff;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

label,
button {
  color: #fff;
  font-family: var(--font-heading);
}
p,
a,
li,
blockquote,
input {
  font-family: var(--font-body);
}

  input {
    font-size: 24px;
    height: 42px;
    border-radius: 4px;
    padding: 0 12px;
  }
`;