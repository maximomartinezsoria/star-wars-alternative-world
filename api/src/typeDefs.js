import * as ApolloServer from 'apollo-server-koa'

const { gql } = ApolloServer

const typeDefs = gql`
  type Planet {
    id: ID!
    name: String!
    description: String!
    code: String!
    pictureUrl: String!
    population: Int!
    characters(limit: Int): [Character]
  }

  type Character {
    id: ID!
    name: String!
    description: String!
    bornAt: String!
    pictureUrl: String!
    planet: Planet!
    friends(limit: Int): [Character]
  }

  type Pagination {
    total: Int!
    page: Int!
    pageSize: Int!
  }

  type PlanetsResponse {
    pagination: Pagination
    nodes: [Planet!]
  }

  type CharactersResponse {
    pagination: Pagination
    nodes: [Character!]
  }

  type Query {
    planets(page: Int, pageSize: Int): PlanetsResponse!
    characters(
      page: Int
      pageSize: Int
      planet: Int
      birthDate: String
    ): CharactersResponse!
    character(id: ID!): Character
  }
`

export default typeDefs
