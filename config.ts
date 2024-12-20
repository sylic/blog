import { h } from "vue"
import { Icon } from '#components';

// 配置项
export const authorInfo = {
  name: 'LiLiStar',
  lang: 'zh-CN',
  title: "LiLiStar's HomePage",
}
// 主题色配置
export const systemConfig = {
  theme: ["light", "dark"],
  themeModeAttr: "theme-mode"
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
// 主页tab配置
export const homePageTabs = [
  {
    title: "Me",
    icon: h(Icon, { name: 'proicons:coffee-hot', class: 'header-icon-class' }),
    componentName: 'Me'
  },
  {
    title: "Notes",
    icon: h(Icon, { name: 'proicons:draw-text', class: 'header-icon-class' })
  },
  {
    title: "Summary",
    icon: h(Icon, { name: 'proicons:emoji-laughter', class: 'header-icon-class' })
  },
  {
    title: "Tools",
    icon: h(Icon, { name: 'proicons:calculator', class: 'header-icon-class' })
  },
]