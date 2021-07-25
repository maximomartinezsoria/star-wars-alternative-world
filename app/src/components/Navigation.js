import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Space</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
      </ul>
    </nav>
  )
}
