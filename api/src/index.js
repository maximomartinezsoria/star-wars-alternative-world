import resolvers from './resolvers.js'
import startApolloServer from './startApolloServer.js'
import typeDefs from './typeDefs.js'

startApolloServer(typeDefs, resolvers)
