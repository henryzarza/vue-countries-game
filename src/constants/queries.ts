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

export const COUNTRIES_QUERY = gql`
  query countries {
    countries {
      code
      emoji
      name
      capital
    }
  }
`

export const COUNTRY_DETAIL_QUERY = gql`
  query countryDetail($code: ID!) {
    country(code: $code) {
      emoji
      name
      capital
      awsRegion
      currencies
      phone
      states {
        code
        name
      }
      continent {
        name
      }
      languages {
        code
        name
        native
      }
    }
  }
`
