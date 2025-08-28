import { shallowMount } from '@vue/test-utils'
import AppHeader from '~/components/layout/AppHeader.vue'
import UiBaseSelect from '~/components/ui/BaseSelect.vue'

const mockUseContext = jest.fn()
jest.mock('@nuxtjs/composition-api', () => ({
  ...jest.requireActual('@nuxtjs/composition-api'),
  useContext: () => mockUseContext(),
}))

describe('AppHeader', () => {
  let mockI18n

  const createWrapper = () => {
    return shallowMount(AppHeader, {
      stubs: {
        UiBaseSelect: {
          name: 'UiBaseSelect',
          props: ['value', 'options'],
          template: '<div />',
        },
      },
      mocks: {
        $t: (key) => key,
      },
    })
  }

  beforeEach(() => {
    mockI18n = {
      locale: 'en',
      locales: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
      ],
      setLocale: jest.fn(),
    }

    mockUseContext.mockReturnValue({
      app: {
        i18n: mockI18n,
        $t: (key) => key,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the title', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('h3').exists()).toBe(true)
  })

  it('binds the current locale to the language selector', () => {
    const wrapper = createWrapper()
    const selector = wrapper.findComponent(UiBaseSelect)
    expect(selector.props('value')).toBe('en')
  })

  it('provides the correct options to the language selector', () => {
    const wrapper = createWrapper()
    const selector = wrapper.findComponent(UiBaseSelect)
    const expectedOptions = [
      { value: 'en', text: 'English' },
      { value: 'es', text: 'Español' },
    ]
    expect(selector.props('options')).toEqual(expectedOptions)
  })

  it('calls i18n.setLocale when a new language is selected', async () => {
    const wrapper = createWrapper()
    const selector = wrapper.findComponent(UiBaseSelect)

    selector.vm.$emit('input', 'es')

    expect(mockI18n.setLocale).toHaveBeenCalledTimes(1)
    expect(mockI18n.setLocale).toHaveBeenCalledWith('es')
  })
})
