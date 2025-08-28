<template>
  <header class="app-header">
    <div class="app-header__title">
      <h3>{{ $t('HEADER.TITLE') }}</h3>
    </div>
    <div class="app-header__locale-changer">
      <UiBaseSelect
        id="locale-select"
        :value="currentLocale"
        :options="availableLocales"
        @input="changeLanguage"
      />
    </div>
  </header>
</template>

<script>
  import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'LayoutAppHeader',
    setup() {
      const { app } = useContext()

      const currentLocale = computed(() => app.i18n.locale)
      const availableLocales = computed(() =>
        app.i18n.locales.map((locale) => ({
          value: locale.code,
          text: locale.name,
        }))
      )

      const changeLanguage = (newLocale) => {
        app.i18n.setLocale(newLocale)
      }

      return {
        currentLocale,
        availableLocales,
        changeLanguage,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .app-header {
    @include flex($justify: space-between, $align: center);
    padding: map.get($spacings, 'sm');
    border-bottom: 1px solid map.get($colors, 'border');
    background-color: map.get($colors, 'light');

    &__title {
      margin: 0;
      @include font-size('xl');
    }

    &__locale-changer {
      min-width: 120px;
    }

    @include breakpoint('md') {
      padding: map.get($spacings, 'md');

      &__title {
        @include font-size('2xl');
      }
    }
  }
</style>
