import { ERROR_CODES } from '@/store/counter/constants'

export const MAX_NAME_LENGTH = 20
export const MIN_COUNTER_VALUE = 0
export const MAX_COUNTER_VALUE = 20
export const MAX_COUNTERS_ALLOWED = 20

/**
 * Verify if the counter name is valid
 * @param {string} name - The counter name to validate.
 * @returns {boolean}
 */
export const isCounterNameValid = (name) => {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return false
  }
  if (name.length > MAX_NAME_LENGTH) {
    return false
  }
  return true
}

/**
 * Get the error message for the counter name
 * @param {string} name - The counter name to validate.
 * @returns {string}
 */
export const getCounterNameError = (name) => {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return ERROR_CODES.NAME_INVALID
  }
  if (name.length > MAX_NAME_LENGTH) {
    return ERROR_CODES.NAME_INVALID_LENGTH
  }
}

/**
 * Verify if the total number of counters is within the allowed limit.
 * @param {number} count - The current number of counters.
 * @returns {boolean}
 */
export const isWithinCounterLimit = (count) => {
  return count <= MAX_COUNTERS_ALLOWED
}

/**
 * The counter value must be greater than 0
 * @param {number} value - The current counter value.
 * @returns {boolean}
 */

export const isCounterValueMinValid = (value) => {
  return value >= MIN_COUNTER_VALUE
}

/**
 * The counter value must be less than 20
 * @param {number} value - The current counter value.
 * @returns {boolean}
 */
export const isCounterValueMaxValid = (value) => {
  return value <= MAX_COUNTER_VALUE
}

/**
 * If the counter value is less than the minimum value, return the minimum value
 * @param {number} value - The current counter value.
 * @returns {number}
 */
export const getCounterValueMin = (value) => {
  if (!isCounterValueMinValid(value)) {
    return MIN_COUNTER_VALUE
  }
  return value
}

/**
 * If the counter value is greater than the maximum value, return the maximum value
 * @param {number} value - The current counter value.
 * @returns {number}
 */
export const getCounterValueMax = (value) => {
  if (!isCounterValueMaxValid(value)) {
    return MAX_COUNTER_VALUE
  }
  return value
}
