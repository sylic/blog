---
date: 2024-12-29 20:46:36
tags:
  - 踩坑记录
title: 记录学习Nuxt过程中遇到的问题
---

- 父组件无法直接通过 ref 拿到子组件实例，而是要子组件中使用`defineExpose`向外暴露变量、方法等

  ```javascript
  // 错误的方法
  // 父组件
  <Catalogue
            ref="catalogRef"
            :toc="mdFile.body.toc.links"
            @clickCB="handleCB"
          />
  const catalogRef = ref(null);
  catalogRef.value.setActiveElement // 无法直接拿到子组件的引用

  // 正确做法
  // 子组件向外暴露变量、方法
  <script setup>
  defineExpose({
    setActiveElement,
  });
  </script>
  ```
