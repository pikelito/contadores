export default {
  head: {
    title: 'Image Maker Test',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'contadores',
        content: 'Administrar lista de contadores',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  components: true,

  modules: ['@nuxtjs/i18n'],

  buildModules: ['@nuxtjs/composition-api/module'],

  css: ['~/assets/scss/main.scss'],

  build: {
    loaders: {
      scss: {
        additionalData: `
          @use "sass:map";
          @use "~/assets/scss/abstracts/_variables.scss" as *;
          @use "~/assets/scss/abstracts/_mixins.scss" as *;
        `,
      },
    },
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.js',
      },
      {
        code: 'es',
        name: 'Español',
        file: 'es.js',
      },
    ],
    langDir: 'lang/',
    defaultLocale: 'es',
  },

  server: {
    port: 3001,
  },
}
