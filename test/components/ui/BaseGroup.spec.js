import { shallowMount } from '@vue/test-utils'
import BaseGroup from '~/components/ui/BaseGroup.vue'

describe('BaseGroup', () => {
  it('renders without label by default', () => {
    const wrapper = shallowMount(BaseGroup)

    expect(wrapper.find('.base-group-wrapper__label').exists()).toBe(false)

    expect(wrapper.find('.base-group-wrapper__content').exists()).toBe(true)
  })

  it('renders with label when provided', () => {
    const testLabel = 'Test Label'
    const wrapper = shallowMount(BaseGroup, {
      propsData: {
        label: testLabel,
      },
    })

    const labelElement = wrapper.find('.base-group-wrapper__label')
    expect(labelElement.exists()).toBe(true)
    expect(labelElement.text()).toBe(testLabel)
  })

  it('renders slot content correctly', () => {
    const slotContent = '<div class="test-content">Test Content</div>'
    const wrapper = shallowMount(BaseGroup, {
      slots: {
        default: slotContent,
      },
    })

    const contentWrapper = wrapper.find('.base-group-wrapper__content')
    expect(contentWrapper.exists()).toBe(true)
    expect(contentWrapper.html()).toContain(slotContent)
  })

  it('validates label prop type', () => {
    const validator = BaseGroup.props.label.type
    expect(validator).toBe(String)
  })
})
