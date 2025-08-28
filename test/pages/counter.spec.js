import { shallowMount } from '@vue/test-utils'
import CounterPage from '~/pages/counter.vue'

const UiBaseCardStub = {
  name: 'UiBaseCard',
  template: `
    <div>
      <header><slot name="header" /></header>
      <main><slot /></main>
      <footer><slot name="footer" /></footer>
    </div>
  `,
}

describe('CounterPage', () => {
  const createWrapper = () => {
    return shallowMount(CounterPage, {
      stubs: {
        UiBaseCard: UiBaseCardStub,
        CounterFilters: true,
        CounterList: true,
        CounterSummary: true,
        CounterAddModal: true,
        UiBaseButton: true,
      },
      mocks: {
        $t: (key) => key,
      },
    })
  }

  it('renders all main components', () => {
    const wrapper = createWrapper()
    expect(wrapper.findComponent(UiBaseCardStub).exists()).toBe(true)
    expect(wrapper.find('counterfilters-stub').exists()).toBe(true)
    expect(wrapper.find('uibasebutton-stub').exists()).toBe(true)
    expect(wrapper.find('counterlist-stub').exists()).toBe(true)
    expect(wrapper.find('countersummary-stub').exists()).toBe(true)
    expect(wrapper.find('counteraddmodal-stub').exists()).toBe(true)
  })

  it('initializes with the modal closed', () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.isModalOpen).toBe(false)
  })

  it('opens the modal when the "New" button is clicked', async () => {
    const wrapper = createWrapper()
    const addButton = wrapper.find('.page-header__add-button')

    addButton.vm.$emit('click')

    expect(wrapper.vm.isModalOpen).toBe(true)
  })

  it('opens the modal when CounterList emits "add-counter"', async () => {
    const wrapper = createWrapper()
    const counterList = wrapper.find('counterlist-stub')

    counterList.vm.$emit('add-counter')

    expect(wrapper.vm.isModalOpen).toBe(true)
  })

  it('closes the modal when CounterAddModal v-model is updated', async () => {
    const wrapper = createWrapper()

    wrapper.vm.isModalOpen = true
    await wrapper.vm.$nextTick()

    const modal = wrapper.find('counteraddmodal-stub')
    modal.vm.$emit('input', false)

    expect(wrapper.vm.isModalOpen).toBe(false)
  })
})
