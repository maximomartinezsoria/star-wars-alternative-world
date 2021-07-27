import { gql } from '@apollo/client'

const CREATE_CHARACTER = gql`
  mutation createCharacter($characterInfo: CharacterInfo) {
    createCharacter(characterInfo: $characterInfo) {
      id
    }
  }
`

export default CREATE_CHARACTER
