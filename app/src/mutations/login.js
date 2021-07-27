import { gql } from '@apollo/client'

const LOGIN = gql`
  mutation login($userInfo: UserCredentials!) {
    login(userInfo: $userInfo)
  }
`

export default LOGIN
