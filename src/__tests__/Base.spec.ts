import { describe, it, expect, beforeAll, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'

import BaseFooter from '@/components/BaseFooter.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import BaseNavbar from '@/components/BaseNavbar.vue'
import BaseThemeToggle from '@/components/BaseThemeToggle.vue'
import StateUI from '@/components/StateUI.vue'

describe('Base Components', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    });
  })

  it('Footer renders properly', () => {
    const wrapper = mount(BaseFooter)
    
    expect(wrapper.text()).toContain('This is a small project to study and improve my knowlegde in VueJS.')
    expect(wrapper.find('small')).toBeDefined()
  })

  it('Loader renders properly', () => {
    const wrapper = mount(BaseLoader, { props: { message: 'Loading data...' } })
    
    expect(wrapper.find('span[aria-label="Loading indicator"]')).toBeDefined()
    expect(wrapper.find('h3').text()).toBe('Loading data...')
  })

  it('Loader does not show a message when is empty', () => {
    const wrapper = mount(BaseLoader, { props: { message: '' } })
    
    expect(wrapper.find('span[aria-label="Loading indicator"]')).toBeDefined()
    expect(wrapper.find('h3').text()).toBe('')
  })

  it('Navbar renders properly', () => {
    const wrapper = shallowMount(BaseNavbar)
    const links = wrapper.findAll('router-link-stub')
    
    expect(links).toHaveLength(4)
    expect(links[0].attributes('to')).toBe('/')
    expect(links[1].attributes('to')).toBe('/continents-game')
    expect(links[2].attributes('to')).toBe('/flipping-game')
    expect(links[3].attributes('to')).toBe('/about')
    expect(wrapper.find('input[type="checkbox"]')).toBeDefined()
  })

  it('ThemeToggle is updating the app theme', async () => {
    const wrapper = mount(BaseThemeToggle)
    const checkbox = wrapper.find('input[type="checkbox"]')
    const label = wrapper.find('label')
    
    expect(checkbox).toBeDefined()
    expect(label.attributes('aria-label')).toBe('Light theme on')

    await checkbox.setValue('true')

    expect(label.attributes('aria-label')).toBe('Dark theme on')
  })

  it('StateUI loading type renders properly', () => {
    const wrapper = mount(StateUI, { props: { type: 'loading', message: 'Loading...' } })
    
    expect(wrapper.find('span[aria-label="Loading indicator"]')).toBeDefined()
    expect(wrapper.find('h3').text()).toBe('Loading...')
  })

  it('StateUI image type renders properly', () => {
    const wrapper = mount(StateUI, { props: { type: 'image', message: 'There are no data to show' } })
    
    expect(wrapper.find('img').attributes('alt')).toBe('Man with a green t-shirt opening a purple folder')
    expect(wrapper.find('h3').text()).toBe('There are no data to show')
  })
})
