import { gql } from '@apollo/client'

const CREATE_PLANET = gql`
  mutation createPlanet($planetInfo: PlanetInfo) {
    createPlanet(planetInfo: $planetInfo) {
      id
    }
  }
`

export default CREATE_PLANET
