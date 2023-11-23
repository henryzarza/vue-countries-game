import { describe, it, expect, beforeAll, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { provideApolloClient } from '@vue/apollo-composable'
import { createMockClient } from 'mock-apollo-client'

import CountryDetail from '@/components/Home/CountryDetail.vue'
import ListView from '@/components/Home/ListView.vue'
import { COUNTRIES_QUERY, COUNTRY_DETAIL_QUERY } from '@/constants/queries'
import { MOCK_COUNTRIES, MOCK_COUNTRY } from '@/mocks/data'

describe('Home Components and View', () => {
  const mockObserve = vi.fn()

  beforeEach(() => {
    const mockClient = createMockClient()

    mockClient.setRequestHandler(COUNTRIES_QUERY, () =>
      Promise.resolve({ data: { countries: MOCK_COUNTRIES } })
    )

    mockClient.setRequestHandler(COUNTRY_DETAIL_QUERY, ({ code }) => {
      if (code === 'EMPTY') return Promise.resolve({ data: { country: null } })
      else if (code === 'ERROR') return Promise.reject(new Error('GraphQL Network Error'))

      return Promise.resolve({ data: { country: MOCK_COUNTRY } })
    })

    provideApolloClient(mockClient)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  beforeAll(() => {
    const IntersectionObserverMock = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: mockObserve,
      takeRecords: vi.fn(),
      unobserve: vi.fn()
    }))

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  })

  it('ListView is rendering the list of countries properly', () => {
    const wrapper = mount(ListView, { props: { countries: MOCK_COUNTRIES } })
    const countriesList = wrapper.findAll('li')

    expect(countriesList).toHaveLength(MOCK_COUNTRIES.length)
    // check country info detail
    expect(countriesList[0].find('span[aria-label$="flag emoji"]').text()).toBe(
      MOCK_COUNTRIES[0].emoji
    )
    expect(countriesList[0].find('h5').text()).toBe(MOCK_COUNTRIES[0].name)
    expect(countriesList[0].find('p').text()).toBe(`Capital: ${MOCK_COUNTRIES[0].capital}`)
    expect(countriesList[0].find('h6').text()).toBe(`Code ${MOCK_COUNTRIES[0].code}`)

    // check IntersectionObserver
    expect(mockObserve).toBeCalled()
  })

  it('When the user selects a country the code is being sent properly', () => {
    const wrapper = mount(ListView, { props: { countries: MOCK_COUNTRIES } })
    const firstCountry = wrapper.find('li:first-of-type')

    expect(firstCountry).toBeDefined()
    // trigger click
    firstCountry.trigger('click')

    const selectCountryEvent = wrapper.emitted('selectCountry')

    expect(selectCountryEvent).toHaveLength(1)
    // @ts-ignore reason: I'm checking on the line above that is defined
    expect(selectCountryEvent[0]).toStrictEqual([MOCK_COUNTRIES[0].code])
  })

  it('CountryDetail is showing the data properly', async () => {
    const wrapper = mount(CountryDetail, { props: { code: 'AR' } })
    const modalContainer = wrapper.find('section[aria-label="Country detail"]')

    expect(modalContainer.exists()).toBe(true)
    expect(modalContainer.get('h3').text()).toBe('Loading...')

    await flushPromises()

    expect(modalContainer.find('h3').text()).toContain('Argentina')
    expect(modalContainer.findAll('h6')).toHaveLength(3)
    expect(modalContainer.findAll('h6')[0].text()).toBe('Capital: Buenos Aires')
    expect(modalContainer.find('span[data-testid="country-currencies"]').text()).toBe('ARS')
    expect(modalContainer.find('span[data-testid="country-indicator"]').text()).toBe('+54')
    expect(modalContainer.find('span[data-testid="country-continent"]').text()).toBe(
      'South America'
    )
    expect(modalContainer.findAll('span[data-testid="country-languages"]')).toHaveLength(2)
    expect(modalContainer.find('span[data-testid="country-aws"]').text()).toBe('sa-east-1')
    expect(modalContainer.findAll('ul[aria-label="States list"] > li')).toHaveLength(24)
  })

  it('CountryDetail is showing the empty state', async () => {
    const wrapper = mount(CountryDetail, { props: { code: 'EMPTY' } })
    const modalContainer = wrapper.find('section[aria-label="Country detail"]')

    expect(modalContainer.exists()).toBe(true)
    expect(modalContainer.get('h3').text()).toBe('Loading...')

    await flushPromises()

    expect(modalContainer.find('h3').text()).toBe('There are no data to show 😭')
  })

  it('CountryDetail is showing the error state', async () => {
    const wrapper = mount(CountryDetail, { props: { code: 'ERROR' } })
    const modalContainer = wrapper.find('section[aria-label="Country detail"]')

    expect(modalContainer.exists()).toBe(true)
    expect(modalContainer.get('h3').text()).toBe('Loading...')

    await flushPromises()

    expect(modalContainer.find('h3').text()).toBe('GraphQL Network Error')
  })
})
