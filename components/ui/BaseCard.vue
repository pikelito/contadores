<template>
  <div :class="['card', `card--${size}`]">
    <header v-if="$slots.header" class="card-header">
      <slot name="header" />
    </header>
    <main class="card-body">
      <slot />
    </main>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
  import { defineComponent, toRefs } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'UiBaseCard',
    props: {
      size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value),
      },
    },
    setup(props) {
      const { size } = toRefs(props)

      return {
        size,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .card {
    border-radius: map.get($border-radius, 'lg');
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: white;
    overflow: hidden;
    @include flex(column);
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    &--sm {
      max-width: map.get($breakpoints, 'sm');
    }

    &--md {
      max-width: map.get($breakpoints, 'md');
    }

    &--lg {
      max-width: map.get($breakpoints, 'lg');
    }

    &-header {
      padding: 1rem;
      border-bottom: 1px solid map.get($colors, 'border');
    }

    &-body {
      padding: 1rem;
      flex-grow: 1;
    }

    &-footer {
      padding: 1rem;
      border-top: 1px solid map.get($colors, 'border');
      background-color: map.get($colors, 'light');
    }
  }
</style>
