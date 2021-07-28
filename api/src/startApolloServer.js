import Koa from 'koa'
import cors from '@koa/cors'
import { ApolloServer, AuthenticationError } from 'apollo-server-koa'
import { makeExecutableSchema } from 'graphql-tools'
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive'
import { knexConfig, port } from './config.js'
import CharactersService from './services/CharactersService.js'
import PlanetsService from './services/PlanetsService.js'
import UsersService from './services/UsersService.js'
import { verifyJwt } from './util/jwt.js'

export default async function startApolloServer(typeDefs, resolvers) {
  const schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    schemaTransforms: [constraintDirective()],
    resolvers,
  })

  const app = new Koa()
  app.use(cors())

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      charactersService: new CharactersService(knexConfig),
      planetsService: new PlanetsService(knexConfig),
      usersService: new UsersService(knexConfig),
    }),
    context: ({ ctx }) => {
      const header = ctx.request.headers.authorization
      const token = header && header.split(' ')[1]
      if (!token) return { user: null }
      try {
        const user = verifyJwt(token)
        return { user }
      } catch (err) {
        console.log(err)
        throw new AuthenticationError('Invalid token')
      }
    },
  })
  await server.start()
  server.applyMiddleware({ app, cors: false })
  await new Promise((resolve) => app.listen(port, resolve))
  console.log(`Server listening on port ${port}`)
  return { server, app }
}
