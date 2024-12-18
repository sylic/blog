import { h } from "vue"
import { Icon } from '#components';

// 配置项
export const authorInfo = {
  name: 'LiLiStar',
  lang: 'zh-CN',
  title: "LiLiStar's HomePage",
}
// 外链配置
export const outerLinks = [
  {
    title: "Github",
    herf: "https://github.com/sylic",
    icon: h(Icon, { name: 'proicons:github', class: 'header-icon-class' })
  },
  {
    title: "博客园",
    herf: "https://www.cnblogs.com/lilistar",
    icon: h(Icon, { name: "proicons:sparkle", class: 'header-icon-class' })
  }
]