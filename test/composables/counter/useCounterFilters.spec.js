import { useContext } from '@nuxtjs/composition-api'
import { useCounters } from '@/composables/counter/useCounters'
import { useCounterFilters } from '@/composables/counter/useCounterFilters'
import { SORT_OPTIONS, FILTER_OPTIONS } from '@/store/counter/constants'

jest.mock('@nuxtjs/composition-api', () => ({
  computed: jest.fn((fn) => ({
    value: fn(),
  })),
  useContext: jest.fn(),
}))

jest.mock('@/composables/counter/useCounters')

describe('useCounterFilters', () => {
  let mockTranslate
  let mockUpdateFilters
  let mockUpdateSorting
  let mockClearFilters
  let mockFilters
  let mockSorting

  beforeEach(() => {
    mockTranslate = jest.fn((key) => `translated_${key}`)
    useContext.mockReturnValue({
      app: {
        i18n: {
          t: mockTranslate,
        },
      },
    })

    mockUpdateFilters = jest.fn()
    mockUpdateSorting = jest.fn()
    mockClearFilters = jest.fn()
    mockFilters = {
      filterBy: FILTER_OPTIONS.BY.NONE,
      filterValue: 0,
    }
    mockSorting = {
      sortBy: SORT_OPTIONS.BY.NAME,
      sortOrder: SORT_OPTIONS.ORDER.ASC,
    }

    useCounters.mockReturnValue({
      filters: { value: mockFilters },
      sorting: { value: mockSorting },
      updateFilters: mockUpdateFilters,
      updateSorting: mockUpdateSorting,
      clearFilters: mockClearFilters,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sorting updates', () => {
    it('updates sort by field', () => {
      const { updateSortBy } = useCounterFilters()
      const newSortBy = SORT_OPTIONS.BY.VALUE

      updateSortBy(newSortBy)

      expect(mockUpdateSorting).toHaveBeenCalledWith({
        ...mockSorting,
        sortBy: newSortBy,
      })
    })

    it('updates sort order', () => {
      const { updateSortOrder } = useCounterFilters()
      const newSortOrder = SORT_OPTIONS.ORDER.DESC

      updateSortOrder(newSortOrder)

      expect(mockUpdateSorting).toHaveBeenCalledWith({
        ...mockSorting,
        sortOrder: newSortOrder,
      })
    })
  })

  describe('filter updates', () => {
    it('updates filter by field', () => {
      const { updateFilterBy } = useCounterFilters()
      const newFilterBy = FILTER_OPTIONS.BY.GREATER_THAN

      updateFilterBy(newFilterBy)

      expect(mockUpdateFilters).toHaveBeenCalledWith({
        ...mockFilters,
        filterBy: newFilterBy,
      })
    })

    it('updates filter value with number conversion', () => {
      const { updateFilterValue } = useCounterFilters()

      updateFilterValue('5')
      expect(mockUpdateFilters).toHaveBeenCalledWith({
        ...mockFilters,
        filterValue: 5,
      })

      updateFilterValue('invalid')
      expect(mockUpdateFilters).toHaveBeenCalledWith({
        ...mockFilters,
        filterValue: 0,
      })
    })

    it('clears filters by calling clearFilters from useCounters', () => {
      const { clearFilters } = useCounterFilters()

      clearFilters()

      expect(mockClearFilters).toHaveBeenCalled()
    })
  })

  describe('state access', () => {
    it('exposes current filters and sorting state', () => {
      const { filters, sorting } = useCounterFilters()

      expect(filters.value).toBe(mockFilters)
      expect(sorting.value).toBe(mockSorting)
    })
  })
})
