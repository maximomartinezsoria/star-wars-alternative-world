import { gql } from '@apollo/client'

const GET_CHARACTERS = gql`
  query Query($page: Int, $pageSize: Int, $planet: Int, $birthDate: String) {
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
        description
        bornAt
        pictureUrl
        planet {
          name
        }
      }
    }
  }
`

export default GET_CHARACTERS
