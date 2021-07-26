import PropTypes from 'prop-types'
import styled from 'styled-components'
import AddIcon from './icons/AddIcon'
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

const ButtonStyles = styled.button`
  position: sticky;
  margin-left: calc(100% - 50px);
  bottom: 5rem;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  text-align: center;

  svg {
    width: 3rem;
    height: 3rem;
    fill: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
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
      <ButtonStyles>
        <AddIcon />
      </ButtonStyles>
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
