import { shallowMount } from '@vue/test-utils'
import AppFooter from '~/components/layout/AppFooter.vue'
import text from '~/lang/en.js'

describe('AppFooter', () => {
  it('renders the title from i18n', () => {
    const titleKey = 'FOOTER.TITLE'
    const translatedTitle = text.FOOTER.TITLE

    const wrapper = shallowMount(AppFooter, {
      mocks: {
        $t: (key) => (key === titleKey ? translatedTitle : ''),
      },
    })

    const paragraphElement = wrapper.find('p')
    expect(paragraphElement.exists()).toBe(true)
    expect(paragraphElement.text()).toBe(translatedTitle)
  })
})
