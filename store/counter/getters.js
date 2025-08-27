import { SORT_OPTIONS, FILTER_OPTIONS } from './constants'

/**
 * Getters for the counter module
 * @typedef {Object} Getters
 */
export default {
  /**
   * Get filtered counters based on current filter settings
   * @param {Object} state - Vuex state
   * @param {Array} state.counters - Array of counters
   * @param {Object} state.filters - Filter configuration
   * @returns {Array} Filtered array of counters
   */
  filteredCounters: (state) => {
    if (!state.filters.filterBy) return state.counters

    return state.counters.filter((counter) => {
      switch (state.filters.filterBy) {
        case FILTER_OPTIONS.BY.GREATER_THAN:
          return counter.value > state.filters.filterValue
        case FILTER_OPTIONS.BY.LESS_THAN:
          return counter.value < state.filters.filterValue
        default:
          return true
      }
    })
  },

  /**
   * Get sorted counters (after filtering)
   * @param {Object} state - Vuex state
   * @param {Object} state.sorting - Sort configuration
   * @param {Object} getters - Vuex getters
   * @param {Array} getters.filteredCounters - Filtered counters
   * @returns {Array} Sorted array of counters
   */
  sortedCounters: (state, getters) => {
    const counters = [...getters.filteredCounters]

    return counters.sort((a, b) => {
      const modifier = state.sorting.sortOrder === SORT_OPTIONS.ORDER.ASC ? 1 : -1

      if (state.sorting.sortBy === SORT_OPTIONS.BY.NAME) {
        return modifier * a.name.localeCompare(b.name)
      }

      return modifier * (a.value - b.value)
    })
  },

  /**
   * Get total sum of all counter values
   * @param {Object} state - Vuex state
   * @param {Array} state.counters - Array of counters
   * @returns {number} Sum of all counter values
   */
  totalValue: (state) => {
    return state.counters.reduce((sum, counter) => sum + counter.value, 0)
  },
}
