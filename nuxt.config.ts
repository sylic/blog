// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-16',
  devtools: { enabled: false },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'LiLiStar',
      meta: [
        { name: 'description', content: 'LiLiStar\'s HomePage' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }
      ]
    }
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
  css: [
    '~/assets/style/theme.css',
    '~/assets/style/global.scss',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
