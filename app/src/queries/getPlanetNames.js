import { gql } from '@apollo/client'

const GET_PLANET_NAMES = gql`
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
      }
    }
  }
`

export default GET_PLANET_NAMES
