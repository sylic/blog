---
date: 2025-02-17 20:46:36
tags:
  - Nuxt3
  - 切换主题
title: 记录网站切换主题色的实现方法-css变量
---

之前使用了color-mode来实现切换主题色，遇到个难以排查的问题： 切换了主题色，当路由改变时，useColorMode()返回的value值确没有改变(看上去是无法修改其value值，同时value值会始终返回系统的主题色 [color-mode文档](https://color-mode.nuxtjs.org/#:~:text=value,not%20update%20it))。于是我尝试使用css切换变量的形式来实现这一功能，并且重新设计一下网站的颜色搭配；

## 使用css变量来实现主题色的切换
在Nuxt中，css文件默认是放到根目录下的`assets` 文件夹下，我这里命名为`theme.css` ，然后还需要再 `nuxt.config.ts` 中加上查找这些全局css文件的配置：

``` ts
export default defineNuxtConfig({
css:[
  '~/assets/style/theme.css'
]
})

```
我是通过动态给html元素加class类名的方式来实现切换样式的，所以在 `theme.css` 文件中，需要在html标签下定义2套不套主题色的样式变量；

``` css
html,
body {
  --bg-color-light: #f5f5f5; // 浅色模式下的背景色
  --bg-color-dark: #333333; // 暗黑模式下的背景色
}

.dark{
  --bg-color: var(--bg-color-dark);
}
.light{
  --bg-color: var(--bg-color-light);
}
//在元素的css中使用 var(--bg-color)， 当dark类名切换为light类名时，--bg-color对应的值会自动切换；
```

### 切换主题色
这里将切换主题的功能抽离为一个组件 `changeTheme.vue`，使用了`localStorage`来存储和读取之前选择的主题色(为了刷新后主题色不失效);tips: 结合了nuxt提供的useColorMode来读取用户的系统色，第一次进入页面会自适应主题。
``` ts
const colorMode = useColorMode();
const currentComp = ref(); // 切换月亮和太阳图标的变量
const theme = ref("");// 默认light
const changeMode = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'; // 切换
  currentComp.value = theme.value == 'dark'? sun : moon;
  document.documentElement.setAttribute('class',`${theme.value}`);
};
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || colorMode.value;
  theme.value = savedTheme;
  document.documentElement.setAttribute('class',`${theme.value}`);
  currentComp.value = savedTheme === 'light' ? moon : sun;
});

watch(()=>theme.value, (newTheme) => {
  localStorage.setItem('theme', newTheme);
});

```



## 暗黑、浅色模式下，代码块中代码的颜色如何做适配

nuxt为我们提供了content模块，可以通过在 `nuxt.config.ts` 中配置 代码高亮的 `highlight`来实现代码块的色彩适应；但是我这里暗黑模式下发现，背景色需要为深色，否则代码片段的颜色可能会看不清内容。（吸取github上的颜色，发现 #333333 还比较ok）

``` ts
export default defineNuxtConfig({
  content: {
    respectPathCase: true, // Use the same path case as the file system
    highlight: {
      theme: {
        // 默认采用的主题是：背景浅色
        default: 'github-light',
        //!!! 注意，暗黑模式下，背景色要为深色，才能看见 彩色的代码块
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
})

```