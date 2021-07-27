import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from './IconButton'
import Navigation from './Navigation'

const LayoutStyles = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem;
  padding: clamp(2rem, 10vw, 5rem) clamp(2rem, 1vw, 2.5rem);

  @media (max-width: 1200px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }

  & > div {
    min-height: 100vh;
    transform: translateZ(0);

    & > button {
      position: fixed;
      right: 0;
      bottom: 10rem;
    }
  }

  h1 {
    margin-bottom: 4rem;
  }
`

export default function Layout({ children, onPlusButtonClick = null }) {
  return (
    <LayoutStyles>
      <div>
        <header>
          <h1>Spacious</h1>
        </header>
        <Navigation />
        {children}
        {onPlusButtonClick && (
          <IconButton
            icon="add"
            theme="dark"
            shape="rounded"
            onClick={onPlusButtonClick}
          />
        )}
      </div>
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  onPlusButtonClick: PropTypes.func,
}
