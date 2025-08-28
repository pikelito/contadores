<template>
  <div class="counter-page">
    <UiBaseCard size="lg">
      <template #header>
        <div class="page-header">
          <CounterFilters class="page-header__filters" />
          <UiBaseButton
            class="page-header__add-button"
            variant="primary"
            @click="isModalOpen = true"
          >
            {{ $t('COUNTER.NEW') }}
          </UiBaseButton>
        </div>
      </template>
      <div class="counter-page__list">
        <CounterList @add-counter="isModalOpen = true" />
      </div>
      <template #footer>
        <CounterSummary />
      </template>
    </UiBaseCard>

    <CounterAddModal v-model="isModalOpen" />
  </div>
</template>

<script>
  import { defineComponent, ref } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'CounterPage',
    setup() {
      const isModalOpen = ref(false)

      return {
        isModalOpen,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .counter-page {
    padding: map.get($spacings, 'md');

    &__list {
      padding: map.get($spacings, 'md');
    }
  }

  .page-header {
    @include flex($direction: column, $align: center);
    gap: map.get($spacings, 'md');

    &__add-button {
      width: 100%;
      order: -1;
    }

    @include breakpoint('md') {
      @include flex($direction: row, $justify: space-between, $align: center);

      &__add-button {
        width: auto;
        order: 0;
      }
    }
  }
</style>
