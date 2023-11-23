import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { GRAPHQL_ENDPOINT_URL } from './constants'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT_URL,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
