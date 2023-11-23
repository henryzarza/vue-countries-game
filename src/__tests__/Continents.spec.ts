import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { provideApolloClient } from '@vue/apollo-composable'
import { createMockClient } from 'mock-apollo-client'

import ContinentCard from '@/components/Continents/ContinentCard.vue'
import ContinentsGameView from '@/views/ContinentsGameView.vue'
import { CONTINENTS_CODES } from '@/types/Game'
import { MOCK_COUNTRY, MOCK_CONTINENTS, MOCK_CONTINENTS_COUNTRIES } from '@/mocks/data'
import { CONTINENT_GAME_DATA_QUERY } from '@/constants/queries'

describe('Continents Components', () => {
  const countryDetail = { code: "AR", emoji: MOCK_COUNTRY.emoji, name: MOCK_COUNTRY.name, continent: { code: CONTINENTS_CODES.SA } }

  beforeEach(() => {
    const mockClient = createMockClient()

    mockClient.setRequestHandler(
      CONTINENT_GAME_DATA_QUERY,
      () => Promise.resolve({ data: { continents: MOCK_CONTINENTS, countries: MOCK_CONTINENTS_COUNTRIES }}))

    provideApolloClient(mockClient)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('ContinentCard - is rendering properly', () => {
    const wrapper = mount(ContinentCard, { props: { data: countryDetail, showName: false, continentCode: "ALL" } })
    const container = wrapper.find('div[aria-label="Drag country item"]')

    expect(container.exists()).toBe(true)
    expect(container.attributes('draggable')).toBe("true")
    // check country detail
    expect(container.find('h6').text()).toBe(countryDetail.emoji)
    expect(container.find('span').exists()).toBe(false)
  })

  it('ContinentCard - is showing the country name properly', async () => {
    const wrapper = mount(ContinentCard, { props: { data: countryDetail, showName: false, continentCode: "ALL" } })
    const container = wrapper.find('div[aria-label="Drag country item"]')

    expect(container.exists()).toBe(true)
    expect(container.find('span').exists()).toBe(false)

    await wrapper.setProps({ showName: true, data: countryDetail, continentCode: "ALL" })
    await wrapper.vm.$nextTick();

    expect(container.find('span').exists()).toBe(true)
    expect(container.find('span').text()).toBe(countryDetail.name)
  })

  it('ContinentCard - is emitting the data when the card is dragged', () => {
    const wrapper = mount(ContinentCard, { props: { data: countryDetail, showName: false, continentCode: "ALL" } })
    const container = wrapper.find('div[aria-label="Drag country item"]')

    expect(container.exists()).toBe(true)
    container.trigger('dragstart')

    expect(wrapper.emitted('startDrag')).toHaveLength(1)
    // @ts-ignore reason: I'm checking on the line above that is defined
    const emittedData = wrapper.emitted('startDrag')[0]
    expect(emittedData[1]).toStrictEqual({ country: countryDetail, continentCode: "ALL" })
  })

  it('Continents Game - is rendering the data properly', async () => {
    const wrapper = mount(ContinentsGameView)
    
    expect(wrapper.find('h1').text()).toBe('Continents Game')
    expect(wrapper.find('h3').text()).toBe('Loading...')
    
    await flushPromises()
    
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)

    expect(wrapper.findAll('h5')).toHaveLength(7)
    expect(wrapper.findAll('h5')[0].text()).toBe('Africa (AF)')
    expect(wrapper.findAll('h5')[3].text()).toBe('Europe (EU)')
    expect(wrapper.findAllComponents(ContinentCard)).toHaveLength(7)
  })
})
