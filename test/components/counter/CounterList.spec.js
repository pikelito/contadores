import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CounterList from '~/components/counter/CounterList.vue'
import { useCounters } from '@/composables/counter/useCounters'

jest.mock('@/composables/counter/useCounters')

describe('CounterList', () => {
  let mockUseCounters

  const createWrapper = () => {
    return shallowMount(CounterList, {
      stubs: {
        UiBaseCard: true,
        UiBaseButton: true,
        TransitionGroup: true,
      },
      mocks: {
        $t: (key) => key,
      },
    })
  }

  beforeEach(() => {
    mockUseCounters = {
      counters: ref([]),
      filteredCounters: ref([]),
      incrementCounter: jest.fn(),
      decrementCounter: jest.fn(),
      removeCounter: jest.fn(),
    }
    useCounters.mockReturnValue(mockUseCounters)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when counters are available', () => {
    const countersData = [
      { id: 1, name: 'Counter A', value: 10 },
      { id: 2, name: 'Counter B', value: 5 },
    ]

    beforeEach(() => {
      mockUseCounters.counters.value = countersData
      mockUseCounters.filteredCounters.value = countersData
    })

    it('renders a list of counters', () => {
      const wrapper = createWrapper()
      const items = wrapper.findAll('uibasecard-stub')
      expect(items.length).toBe(countersData.length)
      expect(wrapper.find('.counter-list__empty-state').exists()).toBe(false)
    })

    it('displays counter name and value', () => {
      const wrapper = createWrapper()
      const firstCounter = wrapper.find('.counter-item-layout')
      expect(firstCounter.find('.counter-item-layout__name').text()).toBe(countersData[0].name)
      expect(firstCounter.find('.counter-item-layout__value').text()).toBe(
        String(countersData[0].value)
      )
    })

    it('calls increment, decrement, and remove functions on button clicks', () => {
      const wrapper = createWrapper()
      const buttons = wrapper.findAll('uibasebutton-stub')

      buttons.at(0).vm.$emit('click')
      expect(mockUseCounters.decrementCounter).toHaveBeenCalledWith(countersData[0].id)

      buttons.at(1).vm.$emit('click')
      expect(mockUseCounters.incrementCounter).toHaveBeenCalledWith(countersData[0].id)

      buttons.at(2).vm.$emit('click')
      expect(mockUseCounters.removeCounter).toHaveBeenCalledWith(countersData[0].id)
    })
  })

  describe('empty states', () => {
    it('shows filtered empty state when there are counters but none match filters', () => {
      mockUseCounters.counters.value = [{ id: 1, name: 'Counter A', value: 10 }]
      mockUseCounters.filteredCounters.value = [] // No filtered results

      const wrapper = createWrapper()
      const emptyState = wrapper.find('.counter-list__empty-state')

      expect(wrapper.find('.counter-list__grid').exists()).toBe(false)
      expect(emptyState.exists()).toBe(true)
      expect(emptyState.text()).toContain('COUNTER.NO_COUNTERS_FILTERED')
      expect(emptyState.find('a').exists()).toBe(false)
    })

    it('shows initial empty state when no counters exist', () => {
      mockUseCounters.counters.value = []
      mockUseCounters.filteredCounters.value = []

      const wrapper = createWrapper()
      const emptyState = wrapper.find('.counter-list__empty-state')

      expect(wrapper.find('.counter-list__grid').exists()).toBe(false)
      expect(emptyState.exists()).toBe(true)
      expect(emptyState.text()).toContain('COUNTER.NO_COUNTERS')
      expect(emptyState.find('a').exists()).toBe(true)
    })

    it('emits "add-counter" event when "add new" link is clicked', () => {
      mockUseCounters.counters.value = []
      mockUseCounters.filteredCounters.value = []

      const wrapper = createWrapper()
      const addLink = wrapper.find('.counter-list__empty-state a')
      addLink.trigger('click')

      expect(wrapper.emitted('add-counter')).toBeTruthy()
      expect(wrapper.emitted('add-counter').length).toBe(1)
    })
  })
})
