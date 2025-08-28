/* eslint-env jest */
import mutations from '@/store/counter/mutations'
import { MUTATIONS, SORT_OPTIONS, FILTER_OPTIONS } from '@/store/counter/constants'

describe('store/counter/mutations', () => {
  describe(MUTATIONS.ADD_COUNTER, () => {
    it('should add counter to state', () => {
      const state = { counters: [] }
      const counter = { id: 1, name: 'Test Counter', value: 0 }

      mutations[MUTATIONS.ADD_COUNTER](state, counter)

      expect(state.counters).toHaveLength(1)
      expect(state.counters[0]).toEqual(counter)
    })
  })

  describe(MUTATIONS.REMOVE_COUNTER, () => {
    it('should remove counter from state', () => {
      const counterToRemove = { id: 2, name: 'Counter 2', value: 10 }
      const state = {
        counters: [
          { id: 1, name: 'Counter 1', value: 5 },
          counterToRemove,
          { id: 3, name: 'Counter 3', value: 15 },
        ],
      }

      mutations[MUTATIONS.REMOVE_COUNTER](state, counterToRemove.id)

      expect(state.counters).toHaveLength(2)
      expect(state.counters).not.toContainEqual(counterToRemove)
    })
  })

  describe(MUTATIONS.UPDATE_COUNTER_VALUE, () => {
    it('should update counter value', () => {
      const counterId = 2
      const newValue = 15
      const state = {
        counters: [
          { id: 1, name: 'Counter 1', value: 5 },
          { id: counterId, name: 'Counter 2', value: 10 },
          { id: 3, name: 'Counter 3', value: 20 },
        ],
      }

      mutations[MUTATIONS.UPDATE_COUNTER_VALUE](state, { id: counterId, newValue })

      const updatedCounter = state.counters.find((c) => c.id === counterId)
      expect(updatedCounter.value).toBe(newValue)
    })

    it('should not modify other counters', () => {
      const counterId = 2
      const newValue = 15
      const state = {
        counters: [
          { id: 1, name: 'Counter 1', value: 5 },
          { id: counterId, name: 'Counter 2', value: 10 },
          { id: 3, name: 'Counter 3', value: 20 },
        ],
      }
      const otherCounters = state.counters.filter((c) => c.id !== counterId)

      mutations[MUTATIONS.UPDATE_COUNTER_VALUE](state, { id: counterId, newValue })

      const unchangedCounters = state.counters.filter((c) => c.id !== counterId)
      expect(unchangedCounters).toEqual(otherCounters)
    })
  })

  describe(MUTATIONS.UPDATE_SORTING, () => {
    it('should update sorting configuration', () => {
      const state = {
        sorting: {
          sortBy: SORT_OPTIONS.BY.NAME,
          sortOrder: SORT_OPTIONS.ORDER.ASC,
        },
      }
      const newSorting = {
        sortBy: SORT_OPTIONS.BY.VALUE,
        sortOrder: SORT_OPTIONS.ORDER.DESC,
      }

      mutations[MUTATIONS.UPDATE_SORTING](state, newSorting)

      expect(state.sorting).toEqual(newSorting)
    })
  })

  describe(MUTATIONS.UPDATE_FILTERS, () => {
    it('should update filters configuration', () => {
      const state = {
        filters: {
          filterBy: FILTER_OPTIONS.BY.NONE,
          filterValue: 0,
        },
      }
      const newFilters = {
        filterBy: FILTER_OPTIONS.BY.GREATER_THAN,
        filterValue: 5,
      }

      mutations[MUTATIONS.UPDATE_FILTERS](state, newFilters)

      expect(state.filters).toEqual(newFilters)
    })
  })

  describe(MUTATIONS.REPLACE_COUNTERS, () => {
    it('should replace the entire counters array with the new one', () => {
      const state = {
        counters: [
          { id: 1, name: 'Old Counter 1', value: 10 },
          { id: 2, name: 'Old Counter 2', value: 20 },
        ],
      }
      const newCounters = [
        { id: 3, name: 'New Counter 1', value: 5 },
        { id: 4, name: 'New Counter 2', value: 15 },
      ]

      mutations[MUTATIONS.REPLACE_COUNTERS](state, newCounters)

      expect(state.counters).toEqual(newCounters)
      expect(state.counters).toHaveLength(2)
      expect(state.counters[0].name).not.toContain('Old')
    })

    it('should be able to handle an empty array', () => {
      const state = {
        counters: [{ id: 1, name: 'Old Counter 1', value: 10 }],
      }
      const newCounters = []

      mutations[MUTATIONS.REPLACE_COUNTERS](state, newCounters)

      expect(state.counters).toEqual([])
      expect(state.counters).toHaveLength(0)
    })
  })

  describe(MUTATIONS.UPDATE_SEARCH_QUERY, () => {
    it('should update the searchQuery in the state', () => {
      const state = { searchQuery: '' }
      const newQuery = 'test query'

      mutations[MUTATIONS.UPDATE_SEARCH_QUERY](state, newQuery)

      expect(state.searchQuery).toBe(newQuery)
    })
  })
})
