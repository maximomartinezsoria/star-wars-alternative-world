import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavigationStyles = styled.nav`
  margin-bottom: 3rem;

  ul {
    display: flex;
    list-style-type: none;
    padding-left: 0;
    font-weight: 600;

    li {
      margin-right: 1rem;

      a {
        padding: 0.8rem 2.4rem;
        border-radius: var(--border-radius);
        text-transform: uppercase;
        opacity: 0.6;

        &.active {
          background-color: var(--dark-gray);
          opacity: 1;
        }
      }
    }
  }
`

export default function Navigation() {
  return (
    <NavigationStyles>
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            activeClassName="active"
            isActive={(match, location) => {
              console.log(location)
              return (
                location.pathname === '/' || location.pathname.match('/planets')
              )
            }}
          >
            Planets
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/characters" activeClassName="active">
            Characters
          </NavLink>
        </li>
      </ul>
    </NavigationStyles>
  )
}
