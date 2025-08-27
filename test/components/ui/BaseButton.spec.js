import { shallowMount } from '@vue/test-utils'
import BaseButton from '~/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders a button with slot content', () => {
    const slotContent = 'Click Me'
    const wrapper = shallowMount(BaseButton, {
      slots: {
        default: slotContent,
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.classes()).toContain('base-button--light')
    expect(wrapper.text()).toBe(slotContent)
  })

  it('emits a click event when clicked', async () => {
    const wrapper = shallowMount(BaseButton)
    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  test.each([
    ['primary'],
    ['secondary'],
    ['success'],
    ['error'],
    ['warning'],
    ['info'],
    ['light'],
    ['dark'],
  ])('renders with variant "%s"', (variant) => {
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        variant: variant,
      },
    })

    expect(wrapper.classes()).toContain(`base-button--${variant}`)
  })
})
