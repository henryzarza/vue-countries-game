import { describe, it, expect, beforeAll, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { provideApolloClient } from '@vue/apollo-composable'
import { createMockClient } from 'mock-apollo-client'

import CountryDetail from '@/components/Home/CountryDetail.vue'
import ListView from '@/components/Home/ListView.vue'
import { MOCK_COUNTRIES } from '@/mocks/data'

describe('Home Components and View', () => {
  const mockObserve = vi.fn()

  beforeEach(() => {
    provideApolloClient(createMockClient())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  beforeAll(() => {
    const IntersectionObserverMock = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: mockObserve,
      takeRecords: vi.fn(),
      unobserve: vi.fn(),
    }))
    
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  })

  it('ListView is rendering the list of countries properly', () => {
    const wrapper = mount(ListView, { props: { countries: MOCK_COUNTRIES } })
    const countriesList = wrapper.findAll('li')

    expect(countriesList).toHaveLength(MOCK_COUNTRIES.length)
    // check country info detail
    expect(countriesList[0].find('span[aria-label$="flag emoji"]').text()).toBe(MOCK_COUNTRIES[0].emoji)
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

  it.todo('CountryDetail is showing the data properly', async () => {
    const wrapper = mount(CountryDetail, { props: { code: "AR" }})
    const modalContainer = wrapper.find('section')
    
    expect(modalContainer.exists()).toBe(true)
    expect(modalContainer.get('h3').text()).toBe('Loading...')

    await flushPromises()

    // await wrapper.vm.$nextTick();
    expect(modalContainer.find('h3').text()).toContain('Test:')
    // expect(modalContainer.get('header > h3').text()).toContain('Argentina')
  })

  it.todo('CountryDetail is showing the empty state', () => {
  })

  it.todo('CountryDetail is showing the error state', () => {
  })
})
