<template>
  <div class="base-group-wrapper">
    <label v-if="label" class="base-group-wrapper__label">
      {{ label }}
    </label>
    <div class="base-group-wrapper__content">
      <slot />
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'UiBaseGroup',
    props: {
      label: {
        type: String,
        default: '',
      },
    },
  })
</script>

<style lang="scss" scoped>
  .base-group-wrapper {
    @include flex($direction: column);

    &__label {
      margin-bottom: map.get($spacings, 'xs');
      font-weight: 500;
      font-size: map.get($font-sizes, 'sm');
      color: map.get($colors, 'dark');
    }

    &__content {
      @include flex($align: stretch);
      border: 1px solid map.get($colors, 'border');
      padding: map.get($spacings, 'xs');
      background-color: map.get($colors, 'light');
      border-radius: map.get($border-radius, 'lg');

      &::v-deep {
        > * {
          flex-grow: 1;
        }

        > .base-button {
          flex-grow: 0;
        }
      }
    }
  }
</style>
