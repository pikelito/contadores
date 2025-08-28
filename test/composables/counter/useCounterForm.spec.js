import { ref, nextTick } from '@nuxtjs/composition-api'
import { useCounterForm } from '~/composables/counter/useCounterForm'
import { useCounters } from '@/composables/counter/useCounters'
import { useContext } from '@nuxtjs/composition-api'
import * as validations from '@/utils/counter/validations'
import { ERROR_CODES } from '@/store/counter/constants'

jest.mock('@/composables/counter/useCounters')
jest.mock('@nuxtjs/composition-api', () => ({
  ...jest.requireActual('@nuxtjs/composition-api'),
  useContext: jest.fn(),
}))
jest.mock('@/utils/counter/validations')

describe('useCounterForm', () => {
  let mockAddCounter
  let mockTranslate

  beforeEach(() => {
    mockTranslate = jest.fn((key) => `translated_${key}`)
    useContext.mockReturnValue({
      app: { i18n: { t: mockTranslate } },
    })

    mockAddCounter = jest.fn()
    useCounters.mockReturnValue({ addCounter: mockAddCounter })

    validations.isCounterNameValid.mockReturnValue(true)
    validations.getCounterNameError.mockReturnValue(ERROR_CODES.INVALID_NAME)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('initializes with default values', () => {
    const { name, error, isLoading } = useCounterForm()
    expect(name.value).toBe('')
    expect(error.value).toBe('')
    expect(isLoading.value).toBe(false)
  })

  describe('reset', () => {
    it('resets all state properties to their initial values', () => {
      const { name, error, isLoading, reset } = useCounterForm()
      name.value = 'Test'
      error.value = 'An error'
      isLoading.value = true

      reset()

      expect(name.value).toBe('')
      expect(error.value).toBe('')
      expect(isLoading.value).toBe(false)
    })
  })

  describe('submit', () => {
    it('sets an error and does not submit if the name is invalid', async () => {
      validations.isCounterNameValid.mockReturnValue(false)
      const { submit, error } = useCounterForm()

      await submit()

      expect(error.value).toBe(`translated_${ERROR_CODES.INVALID_NAME}`)
      expect(mockAddCounter).not.toHaveBeenCalled()
    })

    it('sets loading state and calls addCounter on valid submission', async () => {
      const { name, submit, isLoading, error } = useCounterForm()
      name.value = 'Valid Counter'
      mockAddCounter.mockResolvedValue({ success: true })

      const submitPromise = submit()

      expect(isLoading.value).toBe(true)
      expect(error.value).toBe('')

      await submitPromise

      expect(mockAddCounter).toHaveBeenCalledWith('Valid Counter')
      expect(isLoading.value).toBe(false)
    })

    it('handles successful submission', async () => {
      const { submit } = useCounterForm()
      mockAddCounter.mockResolvedValue({ success: true })

      const result = await submit()

      expect(result).toEqual({ success: true })
    })

    it('handles failed submission and sets error message', async () => {
      const { submit, error } = useCounterForm()
      const failureResponse = { success: false, error: ERROR_CODES.LIMIT_REACHED }
      mockAddCounter.mockResolvedValue(failureResponse)

      const result = await submit()

      expect(result).toEqual(failureResponse)
      expect(error.value).toBe(`translated_${ERROR_CODES.LIMIT_REACHED}`)
    })
  })

  describe('watch on name', () => {
    it('clears the error when the name changes', async () => {
      const { name, error } = useCounterForm()
      error.value = 'Initial Error'

      name.value = 'New Name'
      await nextTick()

      expect(error.value).toBe('')
    })
  })
})
