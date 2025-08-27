import { shallowMount } from '@vue/test-utils'
import { useRouter } from '@nuxtjs/composition-api'
import IndexPage from '~/pages/index.vue'
import text from '~/lang/en.js'

jest.mock('@nuxtjs/composition-api', () => ({
  ...jest.requireActual('@nuxtjs/composition-api'),
  useRouter: jest.fn(),
}))

describe('IndexPage', () => {
  let mockRouter
  let wrapper

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
    }
    useRouter.mockReturnValue(mockRouter)

    wrapper = shallowMount(IndexPage, {
      stubs: {
        UiBaseButton: true,
      },
      mocks: {
        $t: (key) => {
          switch (key) {
            case 'HOME.TITLE':
              return text.HOME.TITLE
            case 'HOME.BUTTON':
              return text.HOME.BUTTON
            default:
              return ''
          }
        },
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the home page title correctly', () => {
    const title = wrapper.find('.home-page__title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe(text.HOME.TITLE)
  })

  it('renders a primary button with correct text', () => {
    const button = wrapper.findComponent({ name: 'UiBaseButton' })
    expect(button.exists()).toBe(true)
    expect(button.attributes('variant')).toBe('primary')
    expect(button.text()).toBe(text.HOME.BUTTON)
  })

  it('navigates to counter page when button is clicked', async () => {
    const button = wrapper.findComponent({ name: 'UiBaseButton' })
    await button.vm.$emit('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith('/counter')
  })
})
