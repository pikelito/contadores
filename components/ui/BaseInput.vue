<template>
  <div class="base-input-wrapper">
    <label v-if="label" :for="id" class="base-input-wrapper__label">
      {{ label }}
    </label>
    <input
      :id="id"
      class="base-input-wrapper__input"
      :value="value"
      v-bind="$attrs"
      @input="handleInput"
    />
    <span v-if="error" class="base-input-wrapper__error">
      {{ error }}
    </span>
  </div>
</template>

<script>
  import { defineComponent, toRefs } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'UiBaseInput',
    inheritAttrs: false,
    props: {
      id: {
        type: String,
        required: true,
        validator: (value) => value.length > 4,
      },
      label: {
        type: String,
        default: '',
      },
      value: {
        type: [String, Number],
        default: '',
      },
      error: {
        type: String,
        default: '',
      },
    },
    emits: ['input'],
    setup(props, { emit }) {
      const { id, label, value, error } = toRefs(props)

      const handleInput = (event) => {
        const eventValue = event.target.value
        emit('input', eventValue)
      }

      return {
        id,
        label,
        value,
        error,
        handleInput,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .base-input-wrapper {
    @include flex($direction: column);

    &__label {
      font-size: map.get($font-sizes, 'sm');
      color: map.get($colors, 'dark');
    }

    &__input {
      width: 100%;
      padding: map.get($spacings, 'xs') map.get($spacings, 'sm');
      border: 1px solid map.get($colors, 'border');
      border-radius: map.get($border-radius, 'base');
      font-size: map.get($font-sizes, 'base');
      transition: border-color 0.2s ease-in-out;

      &:focus {
        outline: none;
        border-color: map.get($colors, 'primary');
      }
    }

    &__error {
      color: map.get($colors, 'error');
      font-size: map.get($font-sizes, 'sm');
    }
  }
</style>
