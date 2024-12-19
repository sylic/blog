// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-16',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon'
  ],
  css: [
    '@/assets/style/theme.css',
    '@/assets/style/global.scss',
  ],
  icon: {
    class: 'icon',
    mode: 'css',
  },
})
