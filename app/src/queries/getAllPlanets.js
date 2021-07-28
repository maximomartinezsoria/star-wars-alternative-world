import { gql } from '@apollo/client'

const GET_ALL_PLANETS = gql`
  query getAllPlanets($page: Int, $pageSize: Int) {
    planets(page: $page, pageSize: $pageSize) {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
        name
        pictureUrl
        population
      }
    }
  }
`

export default GET_ALL_PLANETS
