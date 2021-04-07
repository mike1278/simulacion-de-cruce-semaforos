export default {
  head: {
    title: 'Simulador de Colas y Servidores',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: process.env.description },
      // google
      { content: 'https://' + process.env.domain, property: 'og:url' },
      { content: 'website', property: 'og:type' },
      { content: process.env.title, property: 'og:title' },
      { content: process.env.title, property: 'og:site_name' },
      { content: process.env.description, property: 'og:description' },
      {
        content: 'https://' + process.env.domain + '/favicon.ico',
        property: 'og:image',
      },
      { content: process.env.title, property: 'og:image:alt' },
      // twitter
      {
        content: 'https://' + process.env.domain + '',
        property: 'twitter:url',
      },
      { content: '@RedDeVenta', property: 'twitter:creator' },
      { content: 'summary', property: 'twitter:card' },
      { content: process.env.title, property: 'twitter:title' },
      { content: process.env.description, property: 'twitter:description' },
      {
        content: 'https://' + process.env.domain + '/favicon.ico',
        property: 'twitter:image',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: ['@/plugins/global.ts', '@/plugins/toast.ts'],
  components: false,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
  ],
  moment: {
    locales: ['es'],
  },
  tailwindcss: {
    jit: false,
    cssPath: '~/assets/css/index.scss',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  axios: {},
  pwa: {
    manifest: {
      lang: 'es',
    },
  },
  build: {},
}
