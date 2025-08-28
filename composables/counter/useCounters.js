import { computed, useStore } from '@nuxtjs/composition-api'

export const useCounters = () => {
  const store = useStore()

  const counters = computed(() => store.state.counter.counters)
  const filteredCounters = computed(() => store.getters['counter/sortedCounters'])
  const filters = computed(() => store.state.counter.filters)
  const sorting = computed(() => store.state.counter.sorting)
  const summary = computed(() => store.getters['counter/totalValue'])

  const updateFilters = (filters) => {
    store.dispatch('counter/updateFilters', filters)
  }

  const clearFilters = () => {
    store.dispatch('counter/clearFilters')
  }

  const updateSorting = (sorting) => {
    store.dispatch('counter/updateSorting', sorting)
  }

  const addCounter = async (counterName) => {
    return await store.dispatch('counter/addCounter', counterName)
  }

  const removeCounter = (id) => {
    store.dispatch('counter/removeCounter', id)
  }

  const incrementCounter = async (id) => {
    return await store.dispatch('counter/incrementCounter', id)
  }

  const decrementCounter = async (id) => {
    return await store.dispatch('counter/decrementCounter', id)
  }

  return {
    counters,
    filteredCounters,
    filters,
    sorting,
    summary,
    updateFilters,
    clearFilters,
    updateSorting,
    addCounter,
    removeCounter,
    incrementCounter,
    decrementCounter,
  }
}
