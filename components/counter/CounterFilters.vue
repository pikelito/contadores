<template>
  <div class="counter-filters">
    <UiBaseGroup :label="$t('COUNTER.SEARCH')">
      <UiBaseInput
        id="search-query"
        :value="searchQuery"
        :placeholder="$t('COUNTER.SEARCH_PLACEHOLDER')"
        @input="updateSearchQuery"
      />
      <UiBaseButton variant="error" @click="updateSearchQuery('')">X</UiBaseButton>
    </UiBaseGroup>
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
        class="counter-filters__filter-value"
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
        searchQuery,
        sortOptions,
        orderOptions,
        filterOptions,
        updateSortBy,
        updateSortOrder,
        updateFilterBy,
        updateFilterValue,
        updateSearchQuery,
        clearFilters,
      } = useCounterFilters()

      return {
        filters,
        sorting,
        searchQuery,
        sortOptions,
        orderOptions,
        filterOptions,
        updateSortBy,
        updateSortOrder,
        updateFilterBy,
        updateFilterValue,
        updateSearchQuery,
        clearFilters,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .counter-filters {
    display: flex;
    flex-direction: column;
    gap: map.get($spacings, 'xs');
    align-items: stretch;
    width: 100%;

    @include breakpoint('lg') {
      flex-direction: row;
      align-items: flex-start;
      gap: map.get($spacings, 'sm');
    }

    &__filter-value {
      width: 80px !important;
    }
  }
</style>
