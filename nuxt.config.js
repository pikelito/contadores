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
  buildModules: ['@nuxtjs/composition-api/module'],

  server: {
    port: 3001,
  },
};
