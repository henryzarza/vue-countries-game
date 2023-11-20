import gql from 'graphql-tag'

export const SA_COUNTRIES_QUERY = gql`
  query AboutSACountries {
    continents(filter: { code: { eq: "SA" } }) {
      countries {
        code
        emoji
        name
      }
    }
  }
`
