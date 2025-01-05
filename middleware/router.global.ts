import { authorInfo } from '@/config'

export default defineNuxtRouteMiddleware((to, _from) => {
  useHead({
    title: to.path,
    titleTemplate: (titleChunk) => {
      const title = `${titleChunk?.replace(/^\/+/, '')} | ${authorInfo.title}`
      return title;
    }
  })
})