<template>
  <div class="counter-filters">
    <UiBaseGroup :label="$t('COUNTER.SORT_BY')">
      <UiBaseSelect
        id="sort-by"
        :value="sorting.sortBy"
        :options="sortOptions"
        @input="updateSortBy"
      />
      <UiBaseSelect
        id="sort-order"
        :value="sorting.sortOrder"
        :options="orderOptions"
        @input="updateSortOrder"
      />
    </UiBaseGroup>
    <UiBaseGroup :label="$t('COUNTER.FILTER_BY')">
      <UiBaseSelect
        id="filter-by"
        :value="filters.filterBy"
        :options="filterOptions"
        @input="updateFilterBy"
      />
      <UiBaseInput
        v-show="filters.filterBy"
        id="filter-value"
        type="number"
        :value="filters.filterValue"
        placeholder="0"
        @input="updateFilterValue"
      />
      <UiBaseButton variant="error" @click="clearFilters">X</UiBaseButton>
    </UiBaseGroup>
  </div>
</template>

<script>
  import { defineComponent } from '@nuxtjs/composition-api'
  import { useCounterFilters } from '@/composables/counter/useCounterFilters'

  export default defineComponent({
    name: 'CounterFilters',
    setup() {
      const {
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
      } = useCounterFilters()

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
    },
  })
</script>

<style lang="scss" scoped>
  .counter-filters {
    display: flex;
    flex-direction: column;
    gap: map.get($spacings, 'md');
    align-items: stretch;
    width: 100%;

    @include breakpoint('md') {
      flex-direction: row;
      align-items: flex-start;
      gap: map.get($spacings, 'lg');
    }
  }
</style>
