import {
  isCounterNameValid,
  MAX_NAME_LENGTH,
  isWithinCounterLimit,
  MAX_COUNTERS_ALLOWED,
  isCounterValueMinValid,
  isCounterValueMaxValid,
  getCounterValueMin,
  getCounterValueMax,
  MIN_COUNTER_VALUE,
  MAX_COUNTER_VALUE,
  getCounterNameError,
} from '@/utils/counter/validations'
import { ERROR_CODES } from '@/store/counter/constants'

describe('utils/counter/validations', () => {
  describe('isCounterNameValid', () => {
    it('should return true for a valid name', () => {
      expect(isCounterNameValid('My Counter')).toBe(true)
    })

    it('should return true for a name with the maximum allowed length', () => {
      const longName = 'a'.repeat(MAX_NAME_LENGTH)
      expect(isCounterNameValid(longName)).toBe(true)
    })

    it('should return false for a name longer than the maximum allowed length', () => {
      const longName = 'a'.repeat(MAX_NAME_LENGTH + 1)
      expect(isCounterNameValid(longName)).toBe(false)
    })

    it('should return false for an empty string', () => {
      expect(isCounterNameValid('')).toBe(false)
    })

    it('should return false for a string with only whitespace', () => {
      expect(isCounterNameValid('   ')).toBe(false)
    })

    it('should return false for null', () => {
      expect(isCounterNameValid(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isCounterNameValid(undefined)).toBe(false)
    })

    it('should return false for a non-string type', () => {
      expect(isCounterNameValid(123)).toBe(false)
    })
  })

  describe('getCounterNameError', () => {
    it('should return NAME_INVALID for empty or invalid names', () => {
      expect(getCounterNameError('')).toBe(ERROR_CODES.NAME_INVALID)
      expect(getCounterNameError('   ')).toBe(ERROR_CODES.NAME_INVALID)
      expect(getCounterNameError(null)).toBe(ERROR_CODES.NAME_INVALID)
      expect(getCounterNameError(undefined)).toBe(ERROR_CODES.NAME_INVALID)
    })

    it('should return NAME_INVALID_LENGTH for names that are too long', () => {
      const longName = 'a'.repeat(MAX_NAME_LENGTH + 1)
      expect(getCounterNameError(longName)).toBe(ERROR_CODES.NAME_INVALID_LENGTH)
    })

    it('should return undefined for a valid name', () => {
      expect(getCounterNameError('Valid Name')).toBeUndefined()
    })
  })

  describe('isWithinCounterLimit', () => {
    it('should return true if the count is below the maximum allowed', () => {
      expect(isWithinCounterLimit(MAX_COUNTERS_ALLOWED - 1)).toBe(true)
    })

    it('should return false if the count is above the maximum allowed', () => {
      expect(isWithinCounterLimit(MAX_COUNTERS_ALLOWED + 1)).toBe(false)
    })

    it('should return true for a count of 0', () => {
      expect(isWithinCounterLimit(0)).toBe(true)
    })
  })

  describe('isCounterValueMinValid', () => {
    it('should return true if value is equal or greater than min value', () => {
      expect(isCounterValueMinValid(MIN_COUNTER_VALUE)).toBe(true)
      expect(isCounterValueMinValid(MIN_COUNTER_VALUE + 1)).toBe(true)
    })

    it('should return false if value is less than min value', () => {
      expect(isCounterValueMinValid(MIN_COUNTER_VALUE - 1)).toBe(false)
    })
  })

  describe('isCounterValueMaxValid', () => {
    it('should return true if value is equal or less than max value', () => {
      expect(isCounterValueMaxValid(MAX_COUNTER_VALUE)).toBe(true)
      expect(isCounterValueMaxValid(MAX_COUNTER_VALUE - 1)).toBe(true)
    })

    it('should return false if value is greater than max value', () => {
      expect(isCounterValueMaxValid(MAX_COUNTER_VALUE + 1)).toBe(false)
    })
  })

  describe('getCounterValueMin', () => {
    it('should return the min value if input is less than min value', () => {
      expect(getCounterValueMin(MIN_COUNTER_VALUE - 10)).toBe(MIN_COUNTER_VALUE)
    })

    it('should return the input value if it is equal to or greater than the min value', () => {
      expect(getCounterValueMin(MIN_COUNTER_VALUE)).toBe(MIN_COUNTER_VALUE)
      expect(getCounterValueMin(MIN_COUNTER_VALUE + 10)).toBe(MIN_COUNTER_VALUE + 10)
    })
  })

  describe('getCounterValueMax', () => {
    it('should return the max value if input is greater than max value', () => {
      expect(getCounterValueMax(MAX_COUNTER_VALUE + 10)).toBe(MAX_COUNTER_VALUE)
    })

    it('should return the input value if it is equal to or less than the max value', () => {
      expect(getCounterValueMax(MAX_COUNTER_VALUE)).toBe(MAX_COUNTER_VALUE)
      expect(getCounterValueMax(MAX_COUNTER_VALUE - 10)).toBe(MAX_COUNTER_VALUE - 10)
    })
  })
})
