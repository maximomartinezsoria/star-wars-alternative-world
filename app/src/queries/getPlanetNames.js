import { gql } from '@apollo/client'

const GET_PLANET_NAMES = gql`
  query planets($page: Int, $pageSize: Int, $planetName: String) {
    planets(page: $page, pageSize: $pageSize, planetName: $planetName) {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
        name
        code
      }
    }
  }
`

export default GET_PLANET_NAMES
