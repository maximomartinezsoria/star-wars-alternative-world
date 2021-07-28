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

  input PlanetInfo {
    name: String! @constraint(minLength: 1, maxLength: 20)
    description: String! @constraint(minLength: 15, maxLength: 300)
    code: String! @constraint(pattern: "^[A-Z]{2}-[A-Z]{3}-[0-9]{2}$")
    pictureUrl: String!
  }

  input CharacterInfo {
    name: String! @constraint(minLength: 1, maxLength: 20)
    description: String! @constraint(minLength: 15, maxLength: 300)
    bornAt: String! @constraint(format: "date")
    pictureUrl: String!
    planet: String!
  }

  input UserCredentials {
    username: String!
    password: String!
  }

  type Query {
    planets(page: Int, pageSize: Int): PlanetsResponse!
    characters(
      page: Int
      pageSize: Int
      planet: ID
      birthDate: String
    ): CharactersResponse!
    character(id: ID!): Character
    planet(id: ID!): Planet
  }

  type Mutation {
    createPlanet(planetInfo: PlanetInfo!): Planet
    createCharacter(characterInfo: CharacterInfo!): Character
    register(userInfo: UserCredentials!): String
    login(userInfo: UserCredentials!): String
  }
`

export default typeDefs
