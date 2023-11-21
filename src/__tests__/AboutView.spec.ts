import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMockClient } from 'mock-apollo-client'
import { provideApolloClient } from '@vue/apollo-composable'

import AboutView from '@/views/AboutView.vue'
import { SA_COUNTRIES_QUERY } from '@/constants/queries'
import { MOCK_COUNTRIES } from '@/mocks/data'

describe('About View', () => {
  beforeEach(() => {
    const mockClient = createMockClient()

    mockClient.setRequestHandler(
      SA_COUNTRIES_QUERY,
      () => Promise.resolve({ data: { continents: [{ countries: MOCK_COUNTRIES }] }}))

    provideApolloClient(mockClient)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('request is being made and the selects are hidden', async () => {
    const wrapper = mount(AboutView)
    const submitButton = wrapper.find('button[type="submit"]')
    
    expect(wrapper.get('h1').text()).toBe('About')
    expect(submitButton.exists()).toBe(true)
    expect(wrapper.findAll('select')).toHaveLength(0)
    
    await flushPromises()
    
    expect(wrapper.findAll('select')).toHaveLength(2)
  })

  it('errors messages are show when the user type', async () => {
    const wrapper = mount(AboutView)
    const inputs = wrapper.findAll('input')
    const textarea = wrapper.find('textarea')
    
    expect(wrapper.get('h1').text()).toBe('About')
    expect(inputs).toHaveLength(9)
    
    await inputs[0].setValue('Te')
    await inputs[1].setValue('example')
    await textarea.setValue('T')

    const errors = wrapper.findAll('span[aria-role="alert"]')

    expect(errors).toHaveLength(3)
    expect(errors[0].text()).toBe('Full Name must be at least 3 characters')
    expect(errors[1].text()).toBe('Email format is invalid')
    expect(errors[2].text()).toBe('This field must be at least 3 characters')
  })
})
