import { shallowMount } from '@vue/test-utils'
import BaseCard from '~/components/ui/BaseCard.vue'

describe('BaseCard', () => {
  it('renders with default size', () => {
    const wrapper = shallowMount(BaseCard)

    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('card--md')
  })

  it('validates size prop', () => {
    const validator = BaseCard.props.size.validator

    expect(validator('sm')).toBe(true)
    expect(validator('md')).toBe(true)
    expect(validator('lg')).toBe(true)
    expect(validator('xl')).toBe(false)
  })

  it('applies correct size class', () => {
    const sizes = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const wrapper = shallowMount(BaseCard, {
        propsData: { size },
      })
      expect(wrapper.classes()).toContain(`card--${size}`)
    })
  })

  it('always renders main content slot', () => {
    const content = 'Main content'
    const wrapper = shallowMount(BaseCard, {
      slots: {
        default: content,
      },
    })

    const main = wrapper.find('.card-body')
    expect(main.exists()).toBe(true)
    expect(main.text()).toBe(content)
  })

  it('renders header slot when provided', () => {
    const headerContent = 'Header content'
    const wrapper = shallowMount(BaseCard, {
      slots: {
        header: headerContent,
      },
    })

    const header = wrapper.find('.card-header')
    expect(header.exists()).toBe(true)
    expect(header.text()).toBe(headerContent)
  })

  it('does not render header when slot is empty', () => {
    const wrapper = shallowMount(BaseCard)

    const header = wrapper.find('.card-header')
    expect(header.exists()).toBe(false)
  })

  it('renders footer slot when provided', () => {
    const footerContent = 'Footer content'
    const wrapper = shallowMount(BaseCard, {
      slots: {
        footer: footerContent,
      },
    })

    const footer = wrapper.find('.card-footer')
    expect(footer.exists()).toBe(true)
    expect(footer.text()).toBe(footerContent)
  })

  it('does not render footer when slot is empty', () => {
    const wrapper = shallowMount(BaseCard)

    const footer = wrapper.find('.card-footer')
    expect(footer.exists()).toBe(false)
  })

  it('renders all slots together correctly', () => {
    const wrapper = shallowMount(BaseCard, {
      slots: {
        header: 'Header',
        default: 'Content',
        footer: 'Footer',
      },
    })

    expect(wrapper.find('.card-header').exists()).toBe(true)
    expect(wrapper.find('.card-body').exists()).toBe(true)
    expect(wrapper.find('.card-footer').exists()).toBe(true)

    expect(wrapper.find('.card-header').text()).toBe('Header')
    expect(wrapper.find('.card-body').text()).toBe('Content')
    expect(wrapper.find('.card-footer').text()).toBe('Footer')
  })
})
