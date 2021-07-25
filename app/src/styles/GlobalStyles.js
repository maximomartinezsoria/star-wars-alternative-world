import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #121C33;
    --white: #fff;
    --gray: #f5f5f5;
  }

  body {
    background-color: var(--gray);
  }
`

export default GlobalStyles
