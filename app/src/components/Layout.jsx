import PropTypes from 'prop-types'
import Navigation from './Navigation'

export default function Layout({ title, children }) {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <Navigation />
      {children}
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}
