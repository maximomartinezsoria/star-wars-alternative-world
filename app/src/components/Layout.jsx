import PropTypes from 'prop-types'
import styled from 'styled-components'
import Navigation from './Navigation'

const LayoutStyles = styled.main`
  max-width: 1120px;
  margin: 3rem auto 6rem auto;
  padding: 0.5rem;
  padding: clamp(0.5rem, 1vw, 2.5rem);

  @media (max-width: 1200px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }

  h1 {
    margin-bottom: 4rem;
  }
`

export default function Layout({ children }) {
  return (
    <LayoutStyles>
      <header>
        <h1>Spacious</h1>
      </header>
      <Navigation />
      {children}
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
