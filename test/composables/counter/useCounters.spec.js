import { useStore } from '@nuxtjs/composition-api'
import { useCounters } from '~/composables/counter/useCounters'

jest.mock('@nuxtjs/composition-api', () => ({
  computed: jest.fn((fn) => ({
    value: fn(),
  })),
  useStore: jest.fn(),
}))

describe('useCounters', () => {
  let mockStore
  let mockDispatch
  let mockState
  let mockGetters

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockState = {
      counter: {
        filters: { filterBy: null, filterValue: 0 },
        sorting: { sortBy: 'name', sortOrder: 'asc' },
        counters: [
          { id: 1, name: 'Counter 1', value: 5 },
          { id: 2, name: 'Counter 2', value: 10 },
        ],
      },
    }
    mockGetters = {
      'counter/sortedCounters': [
        { id: 1, name: 'Counter 1', value: 5 },
        { id: 2, name: 'Counter 2', value: 10 },
      ],
      'counter/totalValue': 15,
    }

    mockStore = {
      dispatch: mockDispatch,
      state: mockState,
      getters: mockGetters,
    }

    useStore.mockReturnValue(mockStore)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns computed values from store', () => {
    const { counters, filteredCounters, filters, sorting, summary } = useCounters()

    expect(counters.value).toBe(mockState.counter.counters)
    expect(filteredCounters.value).toBe(mockGetters['counter/sortedCounters'])
    expect(filters.value).toBe(mockState.counter.filters)
    expect(sorting.value).toBe(mockState.counter.sorting)
    expect(summary.value).toBe(mockGetters['counter/totalValue'])
  })

  describe('updateFilters', () => {
    it('dispatches updateFilters action with filters', () => {
      const { updateFilters } = useCounters()
      const testFilters = { filterBy: 'test', filterValue: 5 }

      updateFilters(testFilters)

      expect(mockDispatch).toHaveBeenCalledWith('counter/updateFilters', testFilters)
    })
  })

  describe('clearFilters', () => {
    it('dispatches clearFilters action', () => {
      const { clearFilters } = useCounters()

      clearFilters()

      expect(mockDispatch).toHaveBeenCalledWith('counter/clearFilters')
    })
  })

  describe('updateSorting', () => {
    it('dispatches updateSorting action with sorting configuration', () => {
      const { updateSorting } = useCounters()
      const testSorting = { sortBy: 'value', sortOrder: 'desc' }

      updateSorting(testSorting)

      expect(mockDispatch).toHaveBeenCalledWith('counter/updateSorting', testSorting)
    })
  })

  describe('counter operations', () => {
    it('adds a counter', async () => {
      const { addCounter } = useCounters()
      const counterName = 'New Counter'
      mockDispatch.mockResolvedValue({ success: true })

      const result = await addCounter(counterName)

      expect(mockDispatch).toHaveBeenCalledWith('counter/addCounter', counterName)
      expect(result).toEqual({ success: true })
    })

    it('removes a counter', () => {
      const { removeCounter } = useCounters()
      const counterId = 1

      removeCounter(counterId)

      expect(mockDispatch).toHaveBeenCalledWith('counter/removeCounter', counterId)
    })

    it('increments a counter', async () => {
      const { incrementCounter } = useCounters()
      const counterId = 1
      mockDispatch.mockResolvedValue({ success: true })

      const result = await incrementCounter(counterId)

      expect(mockDispatch).toHaveBeenCalledWith('counter/incrementCounter', counterId)
      expect(result).toEqual({ success: true })
    })

    it('decrements a counter', async () => {
      const { decrementCounter } = useCounters()
      const counterId = 1
      mockDispatch.mockResolvedValue({ success: true })

      const result = await decrementCounter(counterId)

      expect(mockDispatch).toHaveBeenCalledWith('counter/decrementCounter', counterId)
      expect(result).toEqual({ success: true })
    })
  })
})
