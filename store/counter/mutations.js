import { MUTATIONS } from './constants'

/**
 * Mutations for the counter module
 * @typedef {Object} Mutations
 */
export default {
  /**
   * Add a new counter to the state
   * @param {Object} state - Vuex state
   * @param {Array} state.counters - Array of counters
   * @param {Object} counter - Counter to add
   * @param {number} counter.id - Counter unique identifier
   * @param {string} counter.name - Counter name
   * @param {number} counter.value - Counter value
   */
  [MUTATIONS.ADD_COUNTER](state, counter) {
    state.counters = [...state.counters, counter]
  },

  /**
   * Remove a counter from the state by id
   * @param {Object} state - Vuex state
   * @param {Array} state.counters - Array of counters
   * @param {number} counterId - ID of the counter to remove
   */
  [MUTATIONS.REMOVE_COUNTER](state, counterId) {
    state.counters = state.counters.filter((counter) => counter.id !== counterId)
  },

  /**
   * Update a counter's value
   * @param {Object} state - Vuex state
   * @param {Array} state.counters - Array of counters
   * @param {Object} payload - Update payload
   * @param {number} payload.id - Counter ID to update
   * @param {number} payload.newValue - New counter value
   */
  [MUTATIONS.UPDATE_COUNTER_VALUE](state, { id, newValue }) {
    state.counters = state.counters.map((counter) =>
      counter.id === id ? { ...counter, value: newValue } : counter
    )
  },

  /**
   * Update sorting configuration
   * @param {Object} state - Vuex state
   * @param {Object} sorting - New sorting configuration
   * @param {string} sorting.sortBy - Field to sort by
   * @param {string} sorting.sortOrder - Sort direction
   */
  [MUTATIONS.UPDATE_SORTING](state, sorting) {
    state.sorting = sorting
  },

  /**
   * Update filters configuration
   * @param {Object} state - Vuex state
   * @param {Object} filters - New filters configuration
   * @param {string|null} filters.filterBy - Type of filter
   * @param {number} filters.filterValue - Filter value
   */
  [MUTATIONS.UPDATE_FILTERS](state, filters) {
    state.filters = { ...state.filters, ...filters }
  },

  /**
   * Replaces the entire counters array.
   * @param {Object} state - The current state.
   * @param {Array} counters - The new array of counters.
   */
  [MUTATIONS.REPLACE_COUNTERS](state, counters) {
    state.counters = counters
  },
}
