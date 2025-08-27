import { shallowMount } from '@vue/test-utils'
import AppHeader from '~/components/layout/AppHeader.vue'
import text from '~/lang/en.js'

describe('AppHeader', () => {
  it('renders the title from i18n', () => {
    const titleKey = 'HEADER.TITLE'
    const translatedTitle = text.HEADER.TITLE

    const wrapper = shallowMount(AppHeader, {
      mocks: {
        $t: (key) => (key === titleKey ? translatedTitle : ''),
      },
    })

    const titleElement = wrapper.find('h3')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toBe(translatedTitle)
  })
})
