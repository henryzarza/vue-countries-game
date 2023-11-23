import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import FormError from '@/components/Forms/FormError.vue'
import FormInput from '@/components/Forms/FormInput.vue'
import FormRadioCheckbox from '@/components/Forms/FormRadioCheckbox.vue'
import FormSelect from '@/components/Forms/FormSelect.vue'
import FormTextarea from '@/components/Forms/FormTextarea.vue'

describe('Form Controls', () => {
  it('FormError - is showing the errors properly', () => {
    const wrapper = mount(FormError, {
      props: {
        errors: [
          {
            $propertyPath: 'email',
            $property: 'email',
            $validator: 'email',
            $uid: 'email-email',
            $message: 'Email format is invalid',
            $params: { type: 'email' },
            $response: false,
            $pending: false
          },
          {
            $propertyPath: 'email',
            $property: 'email',
            $validator: 'minLength',
            $uid: 'email-minLength',
            $message: 'Email must be at least 6 characters',
            $params: { min: 6, type: 'minLength' },
            $response: false,
            $pending: false
          }
        ]
      }
    })
    const errorsList = wrapper.findAll('span')

    expect(errorsList).toHaveLength(2)
    expect(errorsList[0].text()).toBe('Email format is invalid')
    expect(errorsList[1].text()).toBe('Email must be at least 6 characters')
  })

  it.each([
    ['FormInput', 'input', FormInput],
    ['FormTextarea', 'textarea', FormTextarea]
  ])('%s - is being rendered properly', (_, element, Component) => {
    const wrapper = mount(Component, {
      props: {
        nameId: 'test',
        label: 'Test',
        placeholder: 'Placeholder...',
        modelValue: ''
      }
    })
    const input = wrapper.find(element)

    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Placeholder...')
    expect(wrapper.find('label').text()).toBe('Test')
  })

  it.each([
    ['FormInput', 'input', FormInput],
    ['FormTextarea', 'textarea', FormTextarea]
  ])(
    '%s - label is showing * and has the error class when the field is required',
    (_, element, Component) => {
      const wrapper = mount(Component, {
        props: {
          nameId: 'test',
          label: 'Test',
          isRequired: true,
          hasError: true,
          modelValue: ''
        }
      })
      const input = wrapper.find(element)

      expect(input.exists()).toBe(true)
      expect(input.classes('shake')).toBe(true)
      expect(wrapper.find('label').text()).toBe('Test *')
    }
  )

  it.each([
    ['FormInput', 'input', FormInput],
    ['FormTextarea', 'textarea', FormTextarea]
  ])('%s - is emitting the right value', async (_, element, Component) => {
    const wrapper = mount(Component, {
      props: { nameId: 'test', label: 'Test', modelValue: '' }
    })
    const input = wrapper.find(element)

    expect(input.exists()).toBe(true)
    await input.setValue('Testing')
    // @ts-ignore reason: the purpose of this test is checking is defined
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('Testing')
  })

  it.each([
    ['Radio', 'radio'],
    ['Checkbox', 'checkbox']
  ])('FormRadioCheckbox - when is a %s input render properly', (_, type) => {
    const wrapper = mount(FormRadioCheckbox, {
      props: {
        nameId: 'test',
        label: 'Options',
        type: type as 'radio' | 'checkbox',
        options: [
          { id: '1', name: 'Option 1' },
          { id: '2', name: 'Option 2' }
        ],
        isRequired: true
      }
    })
    const input = wrapper.findAll('input[name="test"]')

    expect(input).toHaveLength(2)
    expect(input[0].attributes('type')).toBe(type)
    expect(wrapper.find('label[for="test-1"]').text()).toBe('Option 1')
    expect(wrapper.find('span').text()).toBe('Options *')
  })

  it('FormSelect - is being rendered properly', () => {
    const wrapper = mount(FormSelect, {
      props: {
        nameId: 'test',
        label: 'Select',
        placeholder: 'Choice',
        options: [
          { id: '1', name: 'Option 1' },
          { id: '2', name: 'Option 2' }
        ],
        isRequired: true,
        modelValue: ''
      }
    })
    const select = wrapper.find('select')

    expect(select.exists()).toBe(true)
    expect(select.attributes('name')).toBe('test')
    expect(select.findAll('option')).toHaveLength(3)
    expect(wrapper.find('label').text()).toBe('Select *')
  })

  it('FormSelect - is emitting the right value', async () => {
    const wrapper = mount(FormSelect, {
      props: {
        nameId: 'test',
        label: 'Select',
        placeholder: 'Choice',
        options: [
          { id: '1', name: 'Option 1' },
          { id: '2', name: 'Option 2' }
        ],
        isRequired: true,
        modelValue: ''
      }
    })
    const select = wrapper.find('select')

    expect(select.exists()).toBe(true)
    await select.setValue('2')
    // @ts-ignore reason: the purpose of this test is checking is defined
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('2')
  })
})
