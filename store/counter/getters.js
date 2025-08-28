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
    const { filterBy, filterValue } = state.filters
    const query = state.searchQuery.trim().toLowerCase()
    let counters = state.counters

    if (query) {
      counters = counters.filter((counter) => counter.name.toLowerCase().includes(query))
    }

    if (!filterBy) return counters

    return counters.filter((counter) => {
      switch (filterBy) {
        case FILTER_OPTIONS.BY.GREATER_THAN:
          return counter.value > filterValue
        case FILTER_OPTIONS.BY.LESS_THAN:
          return counter.value < filterValue
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
