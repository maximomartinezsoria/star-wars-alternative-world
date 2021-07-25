import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #121c33;
    --white: #fff;
    --gray: #f5f5f5;
    --dark-gray: rgba(18, 28, 51, 0.05);
  }

  body {
    background-color: var(--gray);
  }
`

export default GlobalStyles
