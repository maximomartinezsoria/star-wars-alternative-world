import { gql } from '@apollo/client'

const GET_CHARACTER_DETAIL = gql`
  query getCharacterDetail($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      description
      planet {
        id
        name
      }
      friends {
        id
        name
        description
        pictureUrl
      }
    }
  }
`

export default GET_CHARACTER_DETAIL
