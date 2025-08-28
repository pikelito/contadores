import { mount } from '@vue/test-utils'
import DefaultLayout from '~/layouts/default.vue'

describe('DefaultLayout', () => {
  it('renders the header, footer, and main content area', () => {
    const wrapper = mount(DefaultLayout, {
      stubs: {
        LayoutAppHeader: { template: '<div class="stub-header"></div>' },
        LayoutAppFooter: { template: '<div class="stub-footer"></div>' },
        Nuxt: { template: '<div class="stub-nuxt"></div>' },
      },
    })

    expect(wrapper.find('.stub-header').exists()).toBe(true)
    expect(wrapper.find('.stub-footer').exists()).toBe(true)
    expect(wrapper.find('.default-layout__main').exists()).toBe(true)
    expect(wrapper.find('.stub-nuxt').exists()).toBe(true)
  })
})
