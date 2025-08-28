<template>
  <div class="counter-summary">
    <div class="summary-content">
      <span class="summary-content__label"
        >{{ $t('COUNTER.TOTAL_COUNTERS') }}: {{ counters.length }}</span
      >
      <span class="summary-content__value">{{ $t('COUNTER.TOTAL_SUM') }}: {{ summary }}</span>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@nuxtjs/composition-api'
  import { useCounters } from '@/composables/counter/useCounters'

  export default defineComponent({
    name: 'CounterSummary',
    setup() {
      const { counters, summary } = useCounters()

      return {
        counters,
        summary,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .counter-summary {
    width: 100%;
    margin-top: map.get($spacings, 'xs');
  }

  .summary-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: map.get($font-sizes, 'lg');
    font-weight: 500;

    &__value {
      color: map.get($colors, 'primary');
      font-size: map.get($font-sizes, 'md');
    }
  }
</style>
