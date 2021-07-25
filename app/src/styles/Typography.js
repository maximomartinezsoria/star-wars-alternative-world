import { createGlobalStyle } from 'styled-components'

import fontRegular from '../assets/fonts/Poppins.ttf'
import fontSemiBold from '../assets/fonts/PoppinsSemiBold.ttf'
import fontBold from '../assets/fonts/PoppinsBold.ttf'
import fontBlack from '../assets/fonts/PoppinsBlack.ttf'

const Typography = createGlobalStyle`
  @font-face {
    font-family: Poppins;
    src: url(${fontRegular});
    font-weight: 400;
  }

  @font-face {
    font-family: Poppins;
    src: url(${fontSemiBold});
    font-weight: 600;
  }

  @font-face {
    font-family: Poppins;
    src: url(${fontBold});
    font-weight: 800;
  }

  @font-face {
    font-family: Poppins;
    src: url(${fontBlack});
    font-weight: 900;
  }

  html {
    font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--primary);
		font-size: 10px;
  }

  body {
    font-size: 1.6rem;
  }

  p, li {
    letter-spacing: 0.5px;
  }

  h1 {
    font-weight: 900;
    font-size: 4.8rem;
  }

  h2 {
    font-weight: 800;
    font-size: 3.2rem;
  }

  h3 {
    font-weight: 600;
  }

  h1, h2, h3 {
    margin: 0;
  }
`

export default Typography
