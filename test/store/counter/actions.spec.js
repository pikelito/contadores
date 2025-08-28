/* eslint-env jest */
import actions from '@/store/counter/actions'
import * as validations from '@/utils/counter/validations'
import { ERROR_CODES, MUTATIONS, SORT_OPTIONS, FILTER_OPTIONS } from '@/store/counter/constants'

jest.mock('@/utils/counter/validations', () => ({
  isCounterNameValid: jest.fn(),
  isWithinCounterLimit: jest.fn(),
  getCounterValueMax: jest.fn((value) => value),
  getCounterValueMin: jest.fn((value) => value),
}))

describe('store/counter/actions', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
    jest.clearAllMocks()
  })

  describe('addCounter', () => {
    it('should return success:true and commit ADD_COUNTER if valid', async () => {
      const state = { counters: [] }
      const counterName = 'New Counter'
      validations.isCounterNameValid.mockReturnValue(true)
      validations.isWithinCounterLimit.mockReturnValue(true)

      const result = await actions.addCounter({ commit, state }, counterName)

      expect(result.success).toBe(true)
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.ADD_COUNTER, expect.any(Object))
      expect(result.data).toHaveProperty('name', counterName)
    })

    it('should return success:false with an error code if name is invalid', async () => {
      const state = { counters: [] }
      validations.isCounterNameValid.mockReturnValue(false)
      validations.isWithinCounterLimit.mockReturnValue(true)

      const result = await actions.addCounter({ commit, state }, 'Invalid Name')

      expect(result.success).toBe(false)
      expect(result.error).toBe(ERROR_CODES.INVALID_NAME)
      expect(commit).not.toHaveBeenCalled()
    })

    it('should return success:false with an error code if limit is reached', async () => {
      const state = { counters: Array(20) }
      validations.isCounterNameValid.mockReturnValue(true)
      validations.isWithinCounterLimit.mockReturnValue(false)

      const result = await actions.addCounter({ commit, state }, 'Valid Name')

      expect(result.success).toBe(false)
      expect(result.error).toBe(ERROR_CODES.LIMIT_REACHED)
      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('removeCounter', () => {
    it('should commit REMOVE_COUNTER with the correct id', () => {
      const counterIdToRemove = 2
      const state = {
        counters: [
          { id: 1, name: 'Counter 1', value: 5 },
          { id: counterIdToRemove, name: 'Counter 2', value: 10 },
          { id: 3, name: 'Counter 3', value: 15 },
        ],
      }

      actions.removeCounter({ commit, state }, counterIdToRemove)

      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.REMOVE_COUNTER, counterIdToRemove)
    })
  })

  describe('incrementCounter', () => {
    it('should commit UPDATE_COUNTER_VALUE if value is not at max', () => {
      const counterId = 1
      const initialValue = 5
      const state = {
        counters: [{ id: counterId, name: 'Counter', value: initialValue }],
      }
      validations.getCounterValueMax.mockReturnValue(initialValue + 1)

      actions.incrementCounter({ commit, state }, counterId)

      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_COUNTER_VALUE, {
        id: counterId,
        newValue: initialValue + 1,
      })
    })

    it('should commit UPDATE_COUNTER_VALUE with the max value if value is already at max', () => {
      const counterId = 1
      const initialValue = 20
      const state = {
        counters: [{ id: counterId, name: 'Counter', value: initialValue }],
      }
      validations.getCounterValueMax.mockReturnValue(validations.MAX_COUNTER_VALUE)

      const result = actions.incrementCounter({ commit, state }, counterId)

      expect(result.success).toBe(true)
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_COUNTER_VALUE, {
        id: counterId,
        newValue: validations.MAX_COUNTER_VALUE,
      })
    })
  })

  describe('decrementCounter', () => {
    it('should commit UPDATE_COUNTER_VALUE if value is not at min', () => {
      const counterId = 1
      const initialValue = 5
      const state = {
        counters: [{ id: counterId, name: 'Counter', value: initialValue }],
      }
      validations.getCounterValueMin.mockReturnValue(initialValue - 1)

      actions.decrementCounter({ commit, state }, counterId)

      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_COUNTER_VALUE, {
        id: counterId,
        newValue: initialValue - 1,
      })
    })

    it('should commit UPDATE_COUNTER_VALUE with the min value if value is already at min', () => {
      const counterId = 1
      const initialValue = 0
      const state = {
        counters: [{ id: counterId, name: 'Counter', value: initialValue }],
      }
      validations.getCounterValueMin.mockReturnValue(validations.MIN_COUNTER_VALUE)

      const result = actions.decrementCounter({ commit, state }, counterId)

      expect(result.success).toBe(true)
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_COUNTER_VALUE, {
        id: counterId,
        newValue: validations.MIN_COUNTER_VALUE,
      })
    })
  })

  describe('updateSorting', () => {
    it('should commit UPDATE_SORTING with the provided sorting configuration', () => {
      const sorting = {
        sortBy: SORT_OPTIONS.BY.VALUE,
        sortOrder: SORT_OPTIONS.ORDER.DESC,
      }

      actions.updateSorting({ commit }, sorting)

      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_SORTING, sorting)
    })
  })

  describe('updateFilters', () => {
    it('should commit UPDATE_FILTERS with adjusted filter value within bounds', () => {
      validations.getCounterValueMin.mockImplementation((value) => (value < 0 ? 0 : value))
      validations.getCounterValueMax.mockImplementation((value) => (value > 20 ? 20 : value))

      const normalFilters = {
        filterBy: FILTER_OPTIONS.BY.GREATER_THAN,
        filterValue: 5,
      }
      actions.updateFilters({ commit }, normalFilters)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_FILTERS, normalFilters)

      const belowMinFilters = {
        filterBy: FILTER_OPTIONS.BY.LESS_THAN,
        filterValue: -5,
      }
      actions.updateFilters({ commit }, belowMinFilters)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_FILTERS, {
        ...belowMinFilters,
        filterValue: 0,
      })

      const aboveMaxFilters = {
        filterBy: FILTER_OPTIONS.BY.GREATER_THAN,
        filterValue: 25,
      }
      actions.updateFilters({ commit }, aboveMaxFilters)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_FILTERS, {
        ...aboveMaxFilters,
        filterValue: 20,
      })

      expect(commit).toHaveBeenCalledTimes(3)
    })
  })

  describe('clearFilters', () => {
    it('should commit UPDATE_FILTERS with default filter values', () => {
      actions.clearFilters({ commit })

      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_FILTERS, {
        filterBy: FILTER_OPTIONS.BY.NONE,
        filterValue: 0,
      })
    })
  })

  describe('updateSearchQuery', () => {
    it('should commit UPDATE_SEARCH_QUERY with the provided query', () => {
      const query = 'search term'
      actions.updateSearchQuery({ commit }, query)

      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(MUTATIONS.UPDATE_SEARCH_QUERY, query)
    })
  })
})
