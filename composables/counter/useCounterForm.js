import { ref, computed, useContext, watch } from '@nuxtjs/composition-api'
import { useCounters } from '@/composables/counter/useCounters'
import { isCounterNameValid, getCounterNameError } from '@/utils/counter/validations'

export const useCounterForm = () => {
  const { app } = useContext()
  const t = (key) => app.i18n.t(key)
  const { addCounter } = useCounters()
  const name = ref('')
  const error = ref('')
  const isLoading = ref(false)

  const isNameInvalid = computed(() => !isCounterNameValid(name.value))

  const reset = () => {
    name.value = ''
    error.value = ''
    isLoading.value = false
  }

  const submit = async () => {
    if (isNameInvalid.value) {
      error.value = t(getCounterNameError(name.value))
      return
    }

    isLoading.value = true
    error.value = ''

    const result = await addCounter(name.value)

    isLoading.value = false

    if (!result.success) {
      error.value = t(result.error)
    }

    return result
  }

  watch(name, (_newName) => {
    error.value = ''
  })

  return {
    name,
    error,
    isLoading,
    isNameInvalid,
    reset,
    submit,
  }
}
