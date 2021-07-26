import PropTypes from 'prop-types'
import styled from 'styled-components'
import AddIcon from './icons/AddIcon'
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
  }

  h1 {
    margin-bottom: 4rem;
  }
`

const ButtonStyles = styled.button`
  position: fixed;
  right: 0;
  bottom: 10rem;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  text-align: center;

  svg {
    width: 3rem;
    height: 3rem;
    fill: var(--white);
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
  }
`

export default function Layout({ children }) {
  return (
    <LayoutStyles>
      <div>
        <header>
          <h1>Spacious</h1>
        </header>
        <Navigation />
        {children}
        <ButtonStyles>
          <AddIcon />
        </ButtonStyles>
      </div>
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
