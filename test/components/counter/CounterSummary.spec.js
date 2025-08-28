import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CounterSummary from '~/components/counter/CounterSummary.vue'
import { useCounters } from '@/composables/counter/useCounters'

jest.mock('@/composables/counter/useCounters')

describe('CounterSummary', () => {
  let mockUseCounters

  const createWrapper = () => {
    return shallowMount(CounterSummary, {
      mocks: {
        $t: (key) => key,
      },
    })
  }

  beforeEach(() => {
    mockUseCounters = {
      counters: ref([]),
      summary: ref(0),
    }
    useCounters.mockReturnValue(mockUseCounters)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays correct summary when there are no counters', () => {
    const wrapper = createWrapper()
    const label = wrapper.find('.summary-content__label')
    const value = wrapper.find('.summary-content__value')

    expect(label.text()).toBe('COUNTER.TOTAL_COUNTERS: 0')
    expect(value.text()).toBe('COUNTER.TOTAL_SUM: 0')
  })

  it('displays correct summary when there are counters', () => {
    mockUseCounters.counters.value = [
      { id: 1, name: 'Counter A', value: 10 },
      { id: 2, name: 'Counter B', value: 5 },
    ]
    mockUseCounters.summary.value = 15

    const wrapper = createWrapper()
    const label = wrapper.find('.summary-content__label')
    const value = wrapper.find('.summary-content__value')

    expect(label.text()).toBe('COUNTER.TOTAL_COUNTERS: 2')
    expect(value.text()).toBe('COUNTER.TOTAL_SUM: 15')
  })
})
