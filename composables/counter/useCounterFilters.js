import { computed, useContext } from '@nuxtjs/composition-api'
import { useCounters } from '@/composables/counter/useCounters'
import { SORT_OPTIONS, FILTER_OPTIONS } from '@/store/counter/constants'

export const useCounterFilters = () => {
  const { app } = useContext()
  const t = (key) => app.i18n.t(key)
  const {
    filters,
    sorting,
    updateFilters,
    updateSorting,
    clearFilters: clearFiltersCounters,
  } = useCounters()

  const sortOptions = computed(() =>
    Object.values(SORT_OPTIONS.BY).map((value) => ({
      value,
      text: t(value),
    }))
  )

  const orderOptions = computed(() =>
    Object.values(SORT_OPTIONS.ORDER).map((value) => ({
      value,
      text: t(value),
    }))
  )

  const filterOptions = computed(() =>
    Object.values(FILTER_OPTIONS.BY).map((value) => ({
      value,
      text: value ? t(value) : t('COUNTER.NONE'),
    }))
  )

  const updateSortBy = (sortBy) => {
    updateSorting({ ...sorting.value, sortBy })
  }

  const updateSortOrder = (sortOrder) => {
    updateSorting({ ...sorting.value, sortOrder })
  }

  const updateFilterBy = (filterBy) => {
    updateFilters({ ...filters.value, filterBy })
  }

  const updateFilterValue = (filterValue) => {
    updateFilters({ ...filters.value, filterValue: Number(filterValue) || 0 })
  }

  const clearFilters = () => {
    clearFiltersCounters()
  }

  return {
    filters,
    sorting,
    sortOptions,
    orderOptions,
    filterOptions,
    updateSortBy,
    updateSortOrder,
    updateFilterBy,
    updateFilterValue,
    clearFilters,
  }
}
