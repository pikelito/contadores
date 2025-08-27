import { shallowMount } from '@vue/test-utils'
import BaseInput from '~/components/ui/BaseInput.vue'

describe('BaseInput', () => {
  const defaultProps = {
    id: 'test-input-123',
  }

  it('renders input with required id', () => {
    const wrapper = shallowMount(BaseInput, {
      propsData: defaultProps,
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe(defaultProps.id)
  })

  it('validates id prop length is greater than 4 characters', () => {
    const validator = BaseInput.props.id.validator

    expect(validator('test-123')).toBe(true)
    expect(validator('test')).toBe(false)
  })

  it('renders label when provided and links it to input', () => {
    const label = 'Test Label'
    const wrapper = shallowMount(BaseInput, {
      propsData: {
        ...defaultProps,
        label,
      },
    })

    const labelElement = wrapper.find('label')
    expect(labelElement.exists()).toBe(true)
    expect(labelElement.text()).toBe(label)
    expect(labelElement.attributes('for')).toBe(defaultProps.id)
  })

  it('shows error message when provided', () => {
    const error = 'This field is required'
    const wrapper = shallowMount(BaseInput, {
      propsData: {
        ...defaultProps,
        error,
      },
    })

    const errorElement = wrapper.find('.base-input-wrapper__error')
    expect(errorElement.exists()).toBe(true)
    expect(errorElement.text()).toBe(error)
  })

  it('emits input event with current value', async () => {
    const wrapper = shallowMount(BaseInput, {
      propsData: defaultProps,
    })

    const input = wrapper.find('input')
    const testValue = 'test value'

    await input.setValue(testValue)

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0]).toEqual([testValue])
  })

  it('binds value prop to input value', () => {
    const value = 'initial value'
    const wrapper = shallowMount(BaseInput, {
      propsData: {
        ...defaultProps,
        value,
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe(value)
  })

  it('passes HTML attributes to input element', () => {
    const wrapper = shallowMount(BaseInput, {
      propsData: defaultProps,
      attrs: {
        placeholder: 'Enter text here',
        type: 'email',
        maxlength: '50',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter text here')
    expect(input.attributes('type')).toBe('email')
    expect(input.attributes('maxlength')).toBe('50')
  })
})
