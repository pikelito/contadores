<template>
  <button :class="['base-button', `base-button--${variant}`]" @click="handleClick">
    <slot />
  </button>
</template>

<script>
  import { defineComponent, toRefs } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'UiBaseButton',
    emits: ['click'],
    props: {
      variant: {
        type: String,
        default: 'light',
        validator: (value) =>
          ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark'].includes(
            value
          ),
      },
    },
    setup(props, { emit }) {
      const { variant } = toRefs(props)

      const handleClick = () => {
        emit('click')
      }

      return {
        variant,
        handleClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @use 'sass:color';

  .base-button {
    padding: map.get($spacings, 'xs') map.get($spacings, 'sm');
    border-radius: 4px;
    border: 1px solid map.get($colors, 'border');
    background-color: map.get($colors, 'light');
    cursor: pointer;
    @include font-size('base');
    transition: background-color 0.2s;

    &:hover {
      background-color: color.adjust(map.get($colors, 'light'), $lightness: -10%);
    }

    @each $name, $color in $colors {
      &--#{$name} {
        border-color: $color;
        background-color: $color;
        color: if($name == 'light', map.get($colors, 'dark'), map.get($colors, 'light'));

        &:hover {
          background-color: color.adjust($color, $lightness: -10%);
        }
      }
    }
  }
</style>
