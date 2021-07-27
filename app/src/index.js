import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { StoreProvider } from './store'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './apolloClient'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
