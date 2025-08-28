<template>
  <div class="home-page">
    <h4 class="home-page__title">{{ $t('HOME.TITLE') }}</h4>
    <UiBaseButton variant="primary" @click="handleClick">{{ $t('HOME.BUTTON') }}</UiBaseButton>
  </div>
</template>
<script>
  import { defineComponent, useRouter } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'IndexPage',
    setup() {
      const router = useRouter()

      const handleClick = () => {
        router.push('/counter')
      }

      return {
        handleClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .home-page {
    @include flex($direction: column, $justify: center, $align: center);
    height: 100%;
    width: 100%;
    padding: map.get($spacings, 'sm');

    @include breakpoint('md') {
      padding: map.get($spacings, 'lg');
    }

    &__title {
      margin-bottom: map.get($spacings, 'md');
    }
  }
</style>
