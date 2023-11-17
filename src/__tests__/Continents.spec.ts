import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { provideApolloClient } from '@vue/apollo-composable'
import { createMockClient } from 'mock-apollo-client'

import ContinentCard from '@/components/Continents/ContinentCard.vue'
import ContinentsGameView from '@/views/ContinentsGameView.vue'
import { CONTINENTS_CODES } from '@/types/Game'
import { MOCK_COUNTRY } from '@/mocks/data'

describe('Continents Components', () => {
  const countryDetail = { code: "AR", emoji: MOCK_COUNTRY.emoji, name: MOCK_COUNTRY.name, continent: { code: CONTINENTS_CODES.SA } }

  beforeEach(() => {
    provideApolloClient(createMockClient())
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

    wrapper.setProps({ showName: true })
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

  it.todo('Continents Game - is rendering the data properly', async () => {
    const wrapper = mount(ContinentsGameView)
    
    expect(wrapper.find('h1').text()).toBe('Continents Game')
    expect(wrapper.find('h3').text()).toBe('Loading...')
    
    await flushPromises()
    
    expect(wrapper.findAllComponents(ContinentCard)).toHaveLength(1)
  })

  it.todo('Continents Game - check button is enabled when all the countries are moved to a continent area', () => {

  })

  it.todo('Continents Game - when I click the check button it shows me the quantity of countries bad positioned', () => {

  })

  it.todo('Continents Game - when I click the check button it shows me the win button message', () => {

  })
})
