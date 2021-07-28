import { gql } from '@apollo/client'

const GET_CHARACTERS_BY_PLANET = gql`
  query GetCharactersByPlanet(
    $page: Int
    $pageSize: Int
    $planet: ID
    $birthDate: String
  ) {
    characters(
      page: $page
      pageSize: $pageSize
      planet: $planet
      birthDate: $birthDate
    ) {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
        name
        pictureUrl
        totalFriends
      }
    }
  }
`

export default GET_CHARACTERS_BY_PLANET
