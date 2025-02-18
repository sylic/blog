// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-16',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxtjs/color-mode', '@nuxt/content'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'LiLiStar',
      meta: [
        { name: 'description', content: 'LiLiStar\'s HomePage' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
      ]
    }
  },
  // colorMode: {
  //   hid: 'nuxt-color-mode-script',
  //   globalName: '__NUXT_COLOR_MODE__',
  //   componentName: 'ColorScheme',
  //   classPrefix: '',
  //   classSuffix: '-mode',
  //   storageKey: 'nuxt-color-mode'
  // },
  css: [
    '~/assets/style/theme.css',
    '~/assets/style/global.scss',
  ],
  content: {
    respectPathCase: true, // Use the same path case as the file system
    highlight: {
      theme: {
        // 默认采用的主题是：背景浅色
        default: 'github-light',
        //暗黑模式下，背景色要为深色(如：#333333)，才能看见彩色的代码块
        dark: 'github-dark',
        sepia: 'monokai',
      },
      preload: [
        'c',
        'cpp',
        'java',
      ],

    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})