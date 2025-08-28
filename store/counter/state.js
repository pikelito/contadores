import { SORT_OPTIONS, FILTER_OPTIONS } from './constants'

/**
 * @typedef {Object} State
 * @property {Array<Object>} counters - List of counters
 * @property {Object} sorting - Sorting configuration
 * @property {string} sorting.sortBy - Field by which to sort (name | value)
 * @property {string} sorting.sortOrder - Sort direction (asc | desc)
 * @property {Object} filters - Filter configuration
 * @property {string|null} filters.filterBy - Type of filter to apply
 * @property {number} filters.filterValue - Value against which to filter
 */

/**
 * Initial state for counter module
 * @returns {State} Initial state object
 */
export default () => ({
  counters: [],
  sorting: {
    sortBy: SORT_OPTIONS.BY.NAME,
    sortOrder: SORT_OPTIONS.ORDER.ASC,
  },
  searchQuery: '',
  filters: {
    filterBy: FILTER_OPTIONS.BY.NONE,
    filterValue: 0,
  },
})
