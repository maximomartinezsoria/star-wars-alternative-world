import { useApolloClient } from '@apollo/client'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import GET_ALL_CHARACTERS from '../queries/getAllCharacters'
import GET_ALL_PLANETS from '../queries/getAllPlanets'

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
  const client = useApolloClient()

  return (
    <NavigationStyles>
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            activeClassName="active"
            isActive={(match, location) => {
              return (
                location.pathname === '/' || location.pathname.match('/planets')
              )
            }}
            onMouseOver={() =>
              client.query({
                query: GET_ALL_PLANETS,
                variables: { pageSize: 12 },
              })
            }
          >
            Planets
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/characters"
            activeClassName="active"
            onMouseOver={() =>
              client.query({
                query: GET_ALL_CHARACTERS,
                variables: { pageSize: 12, planet: null },
              })
            }
          >
            Characters
          </NavLink>
        </li>
      </ul>
    </NavigationStyles>
  )
}
