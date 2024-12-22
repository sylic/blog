import { authorInfo } from '@/config'

export default defineNuxtRouteMiddleware((to, _from) => {
  console.log(to.path); // here it prints: "/me"
  useHead({
    title: to.path,
    titleTemplate: (titleChunk) => {
      // const title = `${titleChunk?.replace(/^\/+/, '')} | ${authorInfo.title}`
      console.log(titleChunk); // here it prints: "Me", It appears that titleChunk will incorrectly capitalize the first letter of the input path.
      const title = `${titleChunk?.replace(/^\/+/, '')}`
      console.log("⭐ ~ 当前打印的内容 ~ :", title); // here it prints: "Me"
      return title;
    }
  })
})