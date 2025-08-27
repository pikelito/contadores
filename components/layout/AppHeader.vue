<template>
  <header class="app-header">
    <div class="app-header__title">
      <h3>{{ $t('HEADER.TITLE') }}</h3>
    </div>
  </header>
</template>

<script>
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'LayoutAppHeader',
  })
</script>

<style lang="scss" scoped>
  .app-header {
    padding: map.get($spacings, 'sm');
    border-bottom: 1px solid map.get($colors, 'border');
    background-color: map.get($colors, 'light');

    &__title {
      margin: 0;
      @include font-size('xl');
    }

    @include breakpoint('md') {
      padding: map.get($spacings, 'md');

      &__title {
        @include font-size('2xl');
      }
    }
  }
</style>
