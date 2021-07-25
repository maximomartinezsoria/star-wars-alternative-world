import PropTypes from 'prop-types'
import Navigation from './Navigation'

export default function Layout({ title, children }) {
  return (
    <main>
      <header>
        <h1>{title}</h1>
      </header>
      <Navigation />
      {children}
    </main>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}
