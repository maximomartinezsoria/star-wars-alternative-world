import Koa from 'koa'
import * as ApolloServerPkg from 'apollo-server-koa'
import { knexConfig, port } from './config.js'
import CharactersService from './services/CharactersService.js'
import PlanetsService from './services/PlanetsService.js'

const { ApolloServer } = ApolloServerPkg

export default async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      charactersService: new CharactersService(knexConfig),
      planetsService: new PlanetsService(knexConfig),
    }),
    introspection: true,
  })
  await server.start()
  const app = new Koa()
  server.applyMiddleware({ app })
  await new Promise((resolve) => app.listen(port, resolve))
  console.log(`Server listening on port ${port}`)
  return { server, app }
}
