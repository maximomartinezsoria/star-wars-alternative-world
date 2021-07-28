import { gql } from '@apollo/client'

const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters(
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
      }
    }
  }
`

export default GET_ALL_CHARACTERS
