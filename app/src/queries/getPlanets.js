import { gql } from '@apollo/client'

const GET_PLANETS = gql`
  query planets($page: Int, $pageSize: Int) {
    planets(page: $page, pageSize: $pageSize) {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
        name
        description
        code
        pictureUrl
        population
        characters {
          id
          name
          pictureUrl
        }
      }
    }
  }
`

export default GET_PLANETS
