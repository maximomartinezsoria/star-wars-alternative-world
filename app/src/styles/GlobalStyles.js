import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #121c33;
    --white: #fff;
    --gray: #f5f5f5;
    --dark-gray: rgba(18, 28, 51, 0.05);
    --border-radius: 8px;
  }

  body {
    background-color: var(--gray);
  }

  button {
    padding: 1.2rem 2.4rem;
    background-color: var(--primary);
    color: var(--white);
    font-weight: 600;
    text-transform: uppercase;
    border: 0;
    border-radius: var(--border-radius);

    &.light {
      background-color: var(--dark-gray);
      color: var(--primary);
    }
  }
`

export default GlobalStyles
