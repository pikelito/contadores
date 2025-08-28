<template>
  <div class="counter-list">
    <transition-group
      v-if="filteredCounters.length > 0"
      tag="div"
      name="list-fall"
      class="counter-list__grid"
    >
      <UiBaseCard v-for="counter in filteredCounters" :key="counter.id" class="counter-list__item">
        <div class="counter-item-layout">
          <div class="counter-item-layout__name">
            {{ counter.name }}
          </div>
          <div class="counter-item-layout__controls">
            <UiBaseButton size="sm" variant="warning" @click="decrementCounter(counter.id)">
              -
            </UiBaseButton>
            <span class="counter-item-layout__value">{{ counter.value }}</span>
            <UiBaseButton size="sm" variant="success" @click="incrementCounter(counter.id)">
              +
            </UiBaseButton>
          </div>
          <div class="counter-item-layout__actions">
            <UiBaseButton size="sm" variant="error" @click="removeCounter(counter.id)">
              <span class="material-icons">delete</span>
            </UiBaseButton>
          </div>
        </div>
      </UiBaseCard>
    </transition-group>
    <div v-else class="counter-list__empty-state">
      <p v-if="!counters.length">
        {{ $t('COUNTER.NO_COUNTERS') }}
        <a href="#" @click="handleAddCounter">{{ $t('COUNTER.ADD_NEW_COUNTER') }}</a>
      </p>
      <p v-else>
        {{ $t('COUNTER.NO_COUNTERS_FILTERED') }}
      </p>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@nuxtjs/composition-api'
  import { useCounters } from '@/composables/counter/useCounters'

  export default defineComponent({
    name: 'CounterList',
    emits: ['add-counter'],
    setup(_props, { emit }) {
      const { counters, filteredCounters, incrementCounter, decrementCounter, removeCounter } =
        useCounters()

      const handleAddCounter = () => {
        emit('add-counter')
      }

      return {
        counters,
        filteredCounters,
        incrementCounter,
        decrementCounter,
        removeCounter,
        handleAddCounter,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .counter-list {
    width: 100%;

    &__grid {
      display: grid;
      gap: map.get($spacings, 'md');
    }

    &__empty-state {
      text-align: center;
      padding: map.get($spacings, 'xl');
      color: map.get($colors, 'secondary');
    }
  }

  .counter-item-layout {
    display: grid;
    gap: map.get($spacings, 'sm') map.get($spacings, 'md');
    align-items: center;
    width: 100%;

    grid-template-areas:
      'name controls'
      'actions controls';
    grid-template-columns: 1fr auto;

    &__name {
      grid-area: name;
      font-weight: 500;
    }

    &__controls {
      grid-area: controls;
      display: flex;
      align-items: center;
      gap: map.get($spacings, 'sm');
      justify-content: flex-end;
    }

    &__value {
      font-weight: 500;
      min-width: 2ch;
      text-align: center;
    }

    &__actions {
      grid-area: actions;
    }

    @include breakpoint('md') {
      grid-template-areas: 'name controls actions';
      grid-template-columns: 1fr auto auto;

      &__actions {
        justify-self: end;
      }
    }
  }
</style>
