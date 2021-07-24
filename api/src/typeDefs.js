import * as ApolloServer from 'apollo-server-koa'

const { gql } = ApolloServer

const typeDefs = gql`
  type Query {
    hello: String
  }
`

export default typeDefs
