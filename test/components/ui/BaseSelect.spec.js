import { shallowMount } from '@vue/test-utils'
import BaseSelect from '~/components/ui/BaseSelect.vue'

describe('BaseSelect', () => {
  const defaultProps = {
    id: 'test-select-123',
    options: [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2' },
      { value: '3', text: 'Option 3' },
    ],
  }

  it('renders select with required id', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: defaultProps,
    })

    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
    expect(select.attributes('id')).toBe(defaultProps.id)
  })

  it('validates id prop length is greater than 4 characters', () => {
    const validator = BaseSelect.props.id.validator

    expect(validator('test-123')).toBe(true)
    expect(validator('test')).toBe(false)
  })

  it('renders label when provided and links it to select', () => {
    const label = 'Test Label'
    const wrapper = shallowMount(BaseSelect, {
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

  it('renders all options correctly', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: defaultProps,
    })

    const options = wrapper.findAll('option')
    expect(options).toHaveLength(defaultProps.options.length)

    options.wrappers.forEach((option, index) => {
      expect(option.attributes('value')).toBe(defaultProps.options[index].value)
      expect(option.text()).toBe(defaultProps.options[index].text)
    })
  })

  it('validates options prop structure', () => {
    const validator = BaseSelect.props.options.validator

    expect(
      validator([
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
      ])
    ).toBe(true)

    expect(validator([{ value: '1' }, { text: 'Option 2' }, null, 'invalid'])).toBe(false)
  })

  it('renders disabled options correctly', () => {
    const optionsWithDisabled = [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2', disabled: true },
      { value: '3', text: 'Option 3' },
    ]

    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        ...defaultProps,
        options: optionsWithDisabled,
      },
    })

    const options = wrapper.findAll('option')
    expect(options.at(1).attributes('disabled')).toBe('disabled')
    expect(options.at(0).attributes('disabled')).toBeUndefined()
    expect(options.at(2).attributes('disabled')).toBeUndefined()
  })

  it('shows error message when provided', () => {
    const error = 'This field is required'
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        ...defaultProps,
        error,
      },
    })

    const errorElement = wrapper.find('.base-select-wrapper__error')
    expect(errorElement.exists()).toBe(true)
    expect(errorElement.text()).toBe(error)
  })

  it('emits input event when value changes', async () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: defaultProps,
    })

    const select = wrapper.find('select')
    await select.setValue('2')

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0]).toEqual(['2'])
  })

  it('binds value prop to select value', () => {
    const value = '2'
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        ...defaultProps,
        value,
      },
    })

    const select = wrapper.find('select')
    expect(select.element.value).toBe(value)
  })

  it('passes HTML attributes to select element', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: defaultProps,
      attrs: {
        name: 'test-select',
        required: true,
      },
    })

    const select = wrapper.find('select')
    expect(select.attributes('name')).toBe('test-select')
    expect(select.attributes('required')).toBe('required')
  })
})
