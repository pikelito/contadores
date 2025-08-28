import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CounterAddModal from '~/components/counter/CounterAddModal.vue'
import { useCounterForm } from '@/composables/counter/useCounterForm'

jest.mock('@/composables/counter/useCounterForm')

const UiBaseModalStub = {
  name: 'UiBaseModal',
  template: `
    <div>
      <slot />
      <slot name="footer" />
    </div>
  `,
}

describe('CounterAddModal', () => {
  let mockUseCounterForm
  let wrapper

  const createWrapper = (props = {}) => {
    return shallowMount(CounterAddModal, {
      propsData: {
        value: true,
        ...props,
      },
      stubs: {
        UiBaseModal: UiBaseModalStub,
        UiBaseInput: true,
        UiBaseButton: true,
      },
      mocks: {
        $t: (key) => key,
      },
    })
  }

  beforeEach(() => {
    mockUseCounterForm = {
      name: ref(''),
      error: ref(''),
      isLoading: ref(false),
      reset: jest.fn(),
      submit: jest.fn(),
    }
    useCounterForm.mockReturnValue(mockUseCounterForm)
    wrapper = createWrapper()
  })

  afterEach(() => {
    jest.clearAllMocks()
    wrapper.destroy()
  })

  it('binds name and error to the input component', () => {
    mockUseCounterForm.name.value = 'Test Counter'
    mockUseCounterForm.error.value = 'An error'

    wrapper = createWrapper()
    const input = wrapper.find('uibaseinput-stub')

    expect(input.attributes('value')).toBe('Test Counter')
    expect(input.attributes('error')).toBe('An error')
  })

  it('changes submit button text when loading', async () => {
    mockUseCounterForm.isLoading.value = true
    await wrapper.vm.$nextTick()

    const submitButton = wrapper.findAll('uibasebutton-stub').at(1)
    expect(submitButton.text()).toBe('SAVING')
  })

  it('calls submit but does not close modal on failed form submission', async () => {
    mockUseCounterForm.submit.mockResolvedValue({ success: false })

    await wrapper.find('form').trigger('submit')

    expect(mockUseCounterForm.submit).toHaveBeenCalled()
    expect(wrapper.emitted('input')).toBeFalsy()
  })

  it('emits input(false) when cancel button is clicked', () => {
    const cancelButton = wrapper.findAll('uibasebutton-stub').at(0)
    cancelButton.vm.$emit('click')

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0]).toEqual([false])
  })

  it('calls reset function when modal emits open', () => {
    wrapper.findComponent(UiBaseModalStub).vm.$emit('open')

    expect(mockUseCounterForm.reset).toHaveBeenCalled()
  })
})
