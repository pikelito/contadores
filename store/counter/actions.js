import { MUTATIONS, ERROR_CODES, FILTER_OPTIONS } from './constants'
import {
  isCounterNameValid,
  isWithinCounterLimit,
  getCounterValueMax,
  getCounterValueMin,
} from '@/utils/counter/validations'

/**
 * @typedef {Object} ActionContext
 * @property {Function} commit - Vuex commit function
 * @property {Object} state - Current state
 */

/**
 * @typedef {Object} ActionResponse
 * @property {boolean} success - Whether the action was successful
 * @property {string} [error] - Error code if success is false
 * @property {Object} [data] - Response data if success is true
 */

/**
 * Actions for the counter module
 * @typedef {Object} Actions
 */
export default {
  /**
   * Add a new counter
   * @param {ActionContext} context - Vuex action context
   * @param {string} counterName - Name for the new counter
   * @returns {Promise<ActionResponse>} Result of the action
   */
  async addCounter({ commit, state }, counterName) {
    if (!isWithinCounterLimit(state.counters.length)) {
      return { success: false, error: ERROR_CODES.LIMIT_REACHED }
    }

    if (!isCounterNameValid(counterName)) {
      return { success: false, error: ERROR_CODES.INVALID_NAME }
    }

    const newCounter = {
      id: Date.now() + Math.random(),
      name: counterName.trim(),
      value: 0,
    }
    commit(MUTATIONS.ADD_COUNTER, newCounter)
    return { success: true, data: newCounter }
  },

  /**
   * Remove a counter by ID
   * @param {ActionContext} context - Vuex action context
   * @param {number} counterId - ID of the counter to remove
   */
  removeCounter({ commit }, counterId) {
    commit(MUTATIONS.REMOVE_COUNTER, counterId)
  },

  /**
   * Increment a counter's value
   * @param {ActionContext} context - Vuex action context
   * @param {number} counterId - ID of the counter to increment
   * @returns {ActionResponse} Result of the action
   */
  incrementCounter({ commit, state }, counterId) {
    const counter = state.counters.find((c) => c.id === counterId)
    if (!counter) {
      return { success: false, error: ERROR_CODES.NOT_FOUND }
    }

    const newValue = getCounterValueMax(counter.value + 1)
    commit(MUTATIONS.UPDATE_COUNTER_VALUE, { id: counterId, newValue })
    return { success: true }
  },

  /**
   * Decrement a counter's value
   * @param {ActionContext} context - Vuex action context
   * @param {number} counterId - ID of the counter to decrement
   * @returns {ActionResponse} Result of the action
   */
  decrementCounter({ commit, state }, counterId) {
    const counter = state.counters.find((c) => c.id === counterId)
    if (!counter) {
      return { success: false, error: ERROR_CODES.NOT_FOUND }
    }

    const newValue = getCounterValueMin(counter.value - 1)
    commit(MUTATIONS.UPDATE_COUNTER_VALUE, { id: counterId, newValue })
    return { success: true }
  },

  /**
   * Update sorting configuration
   * @param {ActionContext} context - Vuex action context
   * @param {Object} sorting - New sorting configuration
   * @param {string} sorting.sortBy - Field to sort by (name | value)
   * @param {string} sorting.sortOrder - Sort direction (asc | desc)
   */
  updateSorting({ commit }, sorting) {
    commit(MUTATIONS.UPDATE_SORTING, sorting)
  },

  /**
   * Update filters configuration
   * @param {ActionContext} context - Vuex action context
   * @param {Object} filters - New filters configuration
   * @param {string|null} filters.filterBy - Type of filter (greater_than | less_than | null)
   * @param {number} filters.filterValue - Value to filter by
   */
  updateFilters({ commit }, filters) {
    commit(MUTATIONS.UPDATE_FILTERS, filters)
  },

  /**
   * Clear all filters
   * @param {ActionContext} context - Vuex action context
   */
  clearFilters({ commit }) {
    commit(MUTATIONS.UPDATE_FILTERS, {
      filterBy: FILTER_OPTIONS.BY.NONE,
      filterValue: 0,
    })
  },
}
