<template>
  <footer class="app-footer">
    <p>{{ $t('FOOTER.TITLE') }}</p>
  </footer>
</template>

<script>
  export default {
    name: 'LayoutAppFooter',
  }
</script>

<style lang="scss" scoped>
  .app-footer {
    padding: map.get($spacings, 'xs');
    text-align: center;
    border-top: 1px solid map.get($colors, 'border');
    background-color: map.get($colors, 'light');
    color: map.get($colors, 'secondary');
    @include font-size('sm');

    @include breakpoint('md') {
      padding: map.get($spacings, 'sm');
      @include font-size('base');
    }
  }
</style>
