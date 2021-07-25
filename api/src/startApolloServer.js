import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { makeExecutableSchema } from 'graphql-tools'
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive'
import { knexConfig, port } from './config.js'
import CharactersService from './services/CharactersService.js'
import PlanetsService from './services/PlanetsService.js'

export default async function startApolloServer(typeDefs, resolvers) {
  const schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    schemaTransforms: [constraintDirective()],
    resolvers,
  })
  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      charactersService: new CharactersService(knexConfig),
      planetsService: new PlanetsService(knexConfig),
    }),
  })
  await server.start()
  const app = new Koa()
  server.applyMiddleware({ app })
  await new Promise((resolve) => app.listen(port, resolve))
  console.log(`Server listening on port ${port}`)
  return { server, app }
}
