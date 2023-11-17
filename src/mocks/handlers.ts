import { graphql, HttpResponse } from 'msw'

import { MOCK_COUNTRIES, MOCK_COUNTRY } from './data'

const mockContinents = [
  { code: 'SA', name: 'South America' },
  { code: 'EU', name: 'Europe' },
  { code: 'AS', name: 'Asia' }
];

export const handlers = [
  /* graphql.query('continentsGameData', ({ query }) => {
    console.log('Intercepted a "continentsGameData" GraphQL query:', query)

    return HttpResponse.json({
      data: {
        // Convert all posts to an array
        // and return as the "posts" root-level property.
        countries: Array.from(mockCountries.values()),
        continents: mockContinents
      },
    })
  }), */
  graphql.query('continentsGameData', ({ query }) => {
    console.log('Intercepted a "continentsGameData" GraphQL query:', query)
    // Provide a mocked response
    return HttpResponse.json({
      data: {
        countries: MOCK_COUNTRIES,
        continents: mockContinents
      }
    })
  }),
  /* graphql.query('continentsGameData', (req, res, ctx) => {
    console.log('Intercepted a "continentsGameData" GraphQL query:', req)
    // Provide a mocked response
    return res(
      ctx.json({
        data: {
          countries: Array.from(mockCountries.values()),
          continents: mockContinents
        }
      })
    )
  }), */
  graphql.query('countryDetail', ({ variables }) => {
    const { code } = variables
    
    if (code === 'CO') {
      return HttpResponse.json({
        errors: [
          {
            message: `Cannot find post with ID "${code}"`,
          },
        ],
      })
    }
    
    return HttpResponse.json({
      data: {
        country: MOCK_COUNTRY,
      }
    })
  }),
  /* graphql.mutation('DeletePost', ({ variables }) => {
    const { postId } = variables
    const deletedPost = allPosts.get(postId)
 
    // Respond with a GraphQL error when trying
    // to delete a post that doesn't exist.
    if (!deletedPost) {
      return HttpResponse.json({
        errors: [
          {
            message: `Cannot find post with ID "${postId}"`,
          },
        ],
      })
    }
 
    allPosts.delete(postId)
 
    return HttpResponse.json({
      deletePost: deletedPost,
    })
  }), */
]
