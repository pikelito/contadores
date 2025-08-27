<template>
  <div class="default-layout">
    <LayoutAppHeader />
    <main class="default-layout__main">
      <transition name="page" mode="out-in">
        <Nuxt />
      </transition>
    </main>
    <LayoutAppFooter />
  </div>
</template>

<script>
  export default {
    name: 'DefaultLayout',
  }
</script>

<style lang="scss" scoped>
  .default-layout {
    @include flex($direction: column);
    height: 100vh;

    &__main {
      flex-grow: 1;
      overflow-y: auto;
      padding: map.get($spacings, 'sm');

      @include breakpoint('md') {
        padding: map.get($spacings, 'lg');
      }
    }
  }
</style>
