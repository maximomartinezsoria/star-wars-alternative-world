import { gql } from '@apollo/client'

const GET_PLANET_DETAIL = gql`
  query getPlanetDetail($planetId: ID!) {
    planet(id: $planetId) {
      id
      name
      description
      population
      characters {
        id
        name
        pictureUrl
        friends {
          id
        }
      }
    }
  }
`

export default GET_PLANET_DETAIL
