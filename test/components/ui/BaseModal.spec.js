import { shallowMount } from '@vue/test-utils'
import BaseModal from '~/components/ui/BaseModal.vue'

describe('BaseModal', () => {
  let wrapper

  const createWrapper = (props = {}) => {
    return shallowMount(BaseModal, {
      propsData: {
        value: false,
        title: 'Test Modal',
        ...props,
      },
    })
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
    document.body.style.overflow = ''
  })

  it('does not render when value is false', () => {
    wrapper = createWrapper({ value: false })
    expect(wrapper.find('.base-modal').exists()).toBe(false)
  })

  it('renders when value is true', () => {
    wrapper = createWrapper({ value: true })
    expect(wrapper.find('.base-modal').exists()).toBe(true)
  })

  it('displays the title correctly', () => {
    const title = 'Test Title'
    wrapper = createWrapper({ value: true, title })
    expect(wrapper.find('.base-modal__title').text()).toBe(title)
  })

  it('renders slot content', () => {
    const slotContent = '<div class="test-content">Test Content</div>'
    wrapper = shallowMount(BaseModal, {
      propsData: { value: true },
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.find('.base-modal__body').html()).toContain(slotContent)
  })

  it('renders footer slot when provided', () => {
    const footerContent = '<div class="test-footer">Footer Content</div>'
    wrapper = shallowMount(BaseModal, {
      propsData: { value: true },
      slots: {
        footer: footerContent,
      },
    })
    expect(wrapper.find('.base-modal__footer').exists()).toBe(true)
    expect(wrapper.find('.base-modal__footer').html()).toContain(footerContent)
  })

  it('does not render footer when slot is not provided', () => {
    wrapper = createWrapper({ value: true })
    expect(wrapper.find('.base-modal__footer').exists()).toBe(false)
  })

  it('emits input event when close button is clicked', async () => {
    wrapper = createWrapper({ value: true })
    await wrapper.find('.base-modal__close-btn').trigger('click')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0]).toEqual([false])
  })

  it('emits input event when backdrop is clicked', async () => {
    wrapper = createWrapper({ value: true })
    await wrapper.find('.base-modal-backdrop').trigger('click')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0]).toEqual([false])
  })

  it('emits open event when value changes to true', async () => {
    wrapper = createWrapper({ value: false })
    await wrapper.setProps({ value: true })
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  it('emits close event when value changes to false', async () => {
    wrapper = createWrapper({ value: true })
    await wrapper.setProps({ value: false })
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('sets body overflow to hidden when opened', async () => {
    wrapper = createWrapper({ value: false })
    await wrapper.setProps({ value: true })
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body overflow when closed', async () => {
    wrapper = createWrapper({ value: true })
    await wrapper.setProps({ value: false })
    expect(document.body.style.overflow).toBe('')
  })

  it('closes modal when Escape key is pressed', () => {
    wrapper = createWrapper({ value: true })
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    window.dispatchEvent(event)
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0]).toEqual([false])
  })

  it('does not close modal when other keys are pressed', () => {
    wrapper = createWrapper({ value: true })
    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    window.dispatchEvent(event)
    expect(wrapper.emitted('input')).toBeFalsy()
  })

  it('removes event listener and restores body overflow on unmount', () => {
    wrapper = createWrapper({ value: true })
    wrapper.destroy()
    expect(document.body.style.overflow).toBe('')

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    window.dispatchEvent(event)
    expect(wrapper.emitted('input')).toBeFalsy()
  })
})
