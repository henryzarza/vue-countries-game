import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMockClient } from 'mock-apollo-client'
import { provideApolloClient } from '@vue/apollo-composable'

import GameResult from '@/components/Flipping/GameResult.vue'
import FlippingGameView from '@/views/FlippingGameView.vue'
import FlipCard from '@/components/Flipping/FlipCard.vue'
import IconIdea from '@/components/Flipping/IconIdea.vue'
import { GAME_COUNTRIES_QUERY } from '@/constants/queries'
import { MAX_MOVEMENTS } from '@/constants'
import { MOCK_GAME_COUNTRIES } from '@/mocks/data'

describe('Flipping Components', () => {
  describe('FlipCard', () => {
    const MOCK_COUNTRY = { code: 'AR', emoji: '🇦🇷', name: 'Argentina' }

    it('when the card is picked the data is being shown properly', () => {
      const wrapper = mount(FlipCard, { props: { data: MOCK_COUNTRY, index: 0, isPicked: true } })

      expect(wrapper.attributes('class')).toContain('picked pointer-events-none')
      expect(wrapper.get('h6').text()).toBe(MOCK_COUNTRY.emoji)
      expect(wrapper.find('span').text()).toBe(MOCK_COUNTRY.name)
      expect(wrapper.findComponent(IconIdea).exists()).toBe(true)
    })

    it('is emitting the correct info when the card is clicked', async () => {
      const wrapper = mount(FlipCard, { props: { data: MOCK_COUNTRY, index: 3 } })

      await wrapper.trigger('click')

      const emitted = wrapper.emitted('selectCountry')
      expect(emitted).toHaveLength(1)
      // @ts-ignore reason: I'm checking on the line above that is defined
      expect(emitted[0]).toStrictEqual([3])
    })

    it('when the card is not picked or guessed the data is being hidden', () => {
      const wrapper = mount(FlipCard, { props: { data: MOCK_COUNTRY, index: 0 } })

      expect(wrapper.attributes('class')).not.toContain('picked pointer-events-none')
      expect(wrapper.attributes('class')).not.toContain('guessed pointer-events-none')
    })
  })

  describe('GameResult', () => {
    it.each([
      [true, 'You win'],
      [false, 'You lost']
    ])('when hasWon prop is %s - it shows %s message', (hasWon, expectedResult) => {
      const wrapper = mount(GameResult, { props: { isVisible: true, hasWon } })

      expect(wrapper.get('section').attributes('class')).toContain('translate-y-0')
      expect(wrapper.get('h6').text()).toBe(expectedResult)
    })

    it('when the resetGame button is clicked the game should restart', async () => {
      const wrapper = mount(GameResult, { props: { isVisible: true, hasWon: false } })

      const button = wrapper.get('button')
      expect(button.text()).toBe('Reset Game')

      await button.trigger('click')
      expect(wrapper.emitted('resetGame')).toHaveLength(1)
    })

    it('when isVisible prop is false the component should be hidden', () => {
      const wrapper = mount(GameResult, { props: { isVisible: false, hasWon: false } })

      expect(wrapper.get('section').attributes('class')).toContain('translate-y-full')
    })
  })
})

describe('Flipping View', () => {
  beforeEach(() => {
    const mockClient = createMockClient()

    mockClient.setRequestHandler(GAME_COUNTRIES_QUERY, () =>
      Promise.resolve({ data: { countries: MOCK_GAME_COUNTRIES } })
    )

    provideApolloClient(mockClient)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('data is being shown properly', async () => {
    const wrapper = mount(FlippingGameView)

    expect(wrapper.get('h1').text()).toBe('Flipping Game')
    expect(wrapper.get('p').text()).toContain('The idea of this memory game is:')
    expect(wrapper.get('h3').text()).toBe('Loading...')

    await flushPromises()

    expect(wrapper.find('h6').text()).toBe(`Movements: ${MAX_MOVEMENTS}`)
    expect(wrapper.findAllComponents(FlipCard)).toHaveLength(MOCK_GAME_COUNTRIES.length * 2)
    expect(wrapper.findComponent(GameResult).exists()).toBe(true)
  })

  it('when 2 cards are selected the movements quantity is decreasing', async () => {
    const wrapper = mount(FlippingGameView)
    await flushPromises()

    expect(wrapper.find('h6').text()).toBe(`Movements: ${MAX_MOVEMENTS}`)
    const cards = wrapper.findAllComponents(FlipCard)

    await cards[0].trigger('click')
    await cards[3].trigger('click')

    expect(wrapper.find('h6').text()).toBe(`Movements: ${MAX_MOVEMENTS - 1}`)
  })

  it('when a card is selected that card should not be possible to reselect', async () => {
    const wrapper = mount(FlippingGameView)
    await flushPromises()

    expect(wrapper.find('h6').text()).toBe(`Movements: ${MAX_MOVEMENTS}`)
    const cards = wrapper.findAllComponents(FlipCard)

    await cards[0].trigger('click')
    expect(cards[0].emitted('selectCountry')).toHaveLength(1)
    expect(cards[0].attributes('class')).toContain('picked pointer-events-none')

    await cards[0].trigger('click')
    expect(cards[0].emitted('selectCountry')).toHaveLength(1)
    expect(wrapper.find('h6').text()).toBe(`Movements: ${MAX_MOVEMENTS}`)
  })

  it('when 2 cards are selected and they are from the same country, both cards should always be shown', async () => {
    const wrapper = mount(FlippingGameView)
    await flushPromises()

    expect(wrapper.find('h6').text()).toBe(`Movements: ${MAX_MOVEMENTS}`)
    const sameCards = wrapper
      .findAllComponents(FlipCard)
      .filter((el) => el.get('h6').text() === '🇦🇷')

    expect(sameCards).toHaveLength(2)

    await sameCards[0].trigger('click')
    await sameCards[1].trigger('click')

    expect(sameCards[0].attributes('class')).toContain('guessed pointer-events-none')
    expect(sameCards[1].attributes('class')).toContain('guessed pointer-events-none')
    expect(wrapper.find('h6').text()).toBe(`Movements: ${MAX_MOVEMENTS - 1}`)
  })
})
