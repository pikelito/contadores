<template>
  <div class="base-select-wrapper">
    <label v-if="label" :for="id" class="base-select-wrapper__label">
      {{ label }}
    </label>
    <div class="base-select-wrapper__select-container">
      <select
        :id="id"
        class="base-select-wrapper__select"
        :value="value"
        v-bind="$attrs"
        @change="handleChange"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.text }}
        </option>
      </select>
      <span class="base-select-wrapper__arrow" />
    </div>
    <span v-if="error" class="base-select-wrapper__error">
      {{ error }}
    </span>
  </div>
</template>

<script>
  import { defineComponent, toRefs } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'UiBaseSelect',
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
      options: {
        type: Array,
        required: true,
        validator: (options) => {
          return options.every(
            (option) =>
              typeof option === 'object' && option !== null && 'value' in option && 'text' in option
          )
        },
      },
      error: {
        type: String,
        default: '',
      },
    },
    emits: ['input'],
    setup(props, { emit }) {
      const { id, label, value, options, error } = toRefs(props)

      const handleChange = (event) => {
        emit('input', event.target.value)
      }

      return {
        id,
        label,
        value,
        options,
        error,
        handleChange,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .base-select-wrapper {
    @include flex($direction: column);

    &__label {
      font-size: map.get($font-sizes, 'sm');
      color: map.get($colors, 'dark');
    }

    &__select-container {
      position: relative;
      width: 100%;
    }

    &__select {
      width: 100%;
      padding: map.get($spacings, 'xs') map.get($spacings, 'sm');
      border: 1px solid map.get($colors, 'border');
      border-radius: map.get($border-radius, 'base');
      font-size: map.get($font-sizes, 'base');
      background-color: white;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: map.get($colors, 'primary');
      }
    }

    &__arrow {
      position: absolute;
      top: 50%;
      right: map.get($spacings, 'md');
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid map.get($colors, 'dark');
      pointer-events: none;
    }

    &__error {
      color: map.get($colors, 'error');
      font-size: map.get($font-sizes, 'sm');
    }
  }
</style>
