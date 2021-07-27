import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getCookie, removeCookie } from './helpers'

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message.match(/Invalid token/)) removeCookie('token')
      window.href = '/'
    })
})

const httpLink = createHttpLink({
  uri: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = getCookie('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
})

export default client