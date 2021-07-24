import Koa from 'koa'
import * as ApolloServerPkg from 'apollo-server-koa'
import { port } from './config.js'

const { ApolloServer } = ApolloServerPkg

export default async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  await server.start()
  const app = new Koa()
  server.applyMiddleware({ app })
  await new Promise((resolve) => app.listen(port, resolve))
  console.log(`Server listening on port ${port}`)
  return { server, app }
}
