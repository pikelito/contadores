/* eslint-env jest */
import getters from '@/store/counter/getters'
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/store/counter/constants'

describe('store/counter/getters', () => {
  describe('filteredCounters', () => {
    const counters = [
      { id: 1, name: 'Apple Counter', value: 5 },
      { id: 2, name: 'Banana Counter', value: 10 },
      { id: 3, name: 'Apple Banana', value: 15 },
    ]
    const baseState = {
      counters,
      filters: { filterBy: FILTER_OPTIONS.BY.NONE, filterValue: 0 },
      searchQuery: '',
    }

    it('should return all counters when no filter or search is applied', () => {
      const result = getters.filteredCounters(baseState)
      expect(result).toEqual(counters)
    })

    it('should filter by search query', () => {
      const state = { ...baseState, searchQuery: 'apple' }
      const result = getters.filteredCounters(state)
      expect(result).toEqual([counters[0], counters[2]])
    })

    it('should filter counters greater than value', () => {
      const state = {
        ...baseState,
        filters: {
          filterBy: FILTER_OPTIONS.BY.GREATER_THAN,
          filterValue: 7,
        },
      }
      const result = getters.filteredCounters(state)
      expect(result).toEqual([counters[1], counters[2]])
    })

    it('should filter counters less than value', () => {
      const state = {
        ...baseState,
        filters: {
          filterBy: FILTER_OPTIONS.BY.LESS_THAN,
          filterValue: 12,
        },
      }
      const result = getters.filteredCounters(state)
      expect(result).toEqual([counters[0], counters[1]])
    })

    it('should combine search query and value filters', () => {
      const state = {
        ...baseState,
        searchQuery: 'banana',
        filters: {
          filterBy: FILTER_OPTIONS.BY.GREATER_THAN,
          filterValue: 12,
        },
      }
      const result = getters.filteredCounters(state)
      expect(result).toEqual([counters[2]])
    })

    it('should return an empty array if no counters match filters', () => {
      const state = {
        ...baseState,
        searchQuery: 'cherry',
      }
      const result = getters.filteredCounters(state)
      expect(result).toEqual([])
    })
  })

  describe('sortedCounters', () => {
    const mockGetters = {
      filteredCounters: [
        { id: 1, name: 'Counter B', value: 5 },
        { id: 2, name: 'Counter A', value: 10 },
        { id: 3, name: 'Counter C', value: 15 },
      ],
    }

    it('should sort counters by name ascending', () => {
      const state = {
        sorting: {
          sortBy: SORT_OPTIONS.BY.NAME,
          sortOrder: SORT_OPTIONS.ORDER.ASC,
        },
      }

      const result = getters.sortedCounters(state, mockGetters)

      expect(result).toEqual([
        { id: 2, name: 'Counter A', value: 10 },
        { id: 1, name: 'Counter B', value: 5 },
        { id: 3, name: 'Counter C', value: 15 },
      ])
    })

    it('should sort counters by name descending', () => {
      const state = {
        sorting: {
          sortBy: SORT_OPTIONS.BY.NAME,
          sortOrder: SORT_OPTIONS.ORDER.DESC,
        },
      }

      const result = getters.sortedCounters(state, mockGetters)

      expect(result).toEqual([
        { id: 3, name: 'Counter C', value: 15 },
        { id: 1, name: 'Counter B', value: 5 },
        { id: 2, name: 'Counter A', value: 10 },
      ])
    })

    it('should sort counters by value ascending', () => {
      const state = {
        sorting: {
          sortBy: SORT_OPTIONS.BY.VALUE,
          sortOrder: SORT_OPTIONS.ORDER.ASC,
        },
      }

      const result = getters.sortedCounters(state, mockGetters)

      expect(result).toEqual([
        { id: 1, name: 'Counter B', value: 5 },
        { id: 2, name: 'Counter A', value: 10 },
        { id: 3, name: 'Counter C', value: 15 },
      ])
    })

    it('should sort counters by value descending', () => {
      const state = {
        sorting: {
          sortBy: SORT_OPTIONS.BY.VALUE,
          sortOrder: SORT_OPTIONS.ORDER.DESC,
        },
      }

      const result = getters.sortedCounters(state, mockGetters)

      expect(result).toEqual([
        { id: 3, name: 'Counter C', value: 15 },
        { id: 2, name: 'Counter A', value: 10 },
        { id: 1, name: 'Counter B', value: 5 },
      ])
    })
  })

  describe('totalValue', () => {
    it('should return sum of all counter values', () => {
      const state = {
        counters: [
          { id: 1, name: 'Counter 1', value: 5 },
          { id: 2, name: 'Counter 2', value: 10 },
          { id: 3, name: 'Counter 3', value: 15 },
        ],
      }

      const result = getters.totalValue(state)

      expect(result).toBe(30)
    })

    it('should return 0 when no counters exist', () => {
      const state = {
        counters: [],
      }

      const result = getters.totalValue(state)

      expect(result).toBe(0)
    })
  })
})
