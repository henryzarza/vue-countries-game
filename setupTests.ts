import { afterAll, afterEach, beforeAll } from 'vitest'

import { server } from './src/mocks/server'

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
  
  server.events.on('request:start', ({ request }) => {
    console.log('😭😭😭 MSW intercepted:', request.method, request.url)
  })
})

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
