<template>
  <div class="hover marin-r-10" @click="changeMode" title="切换主题">
    <component :is="currentComp"></component>
  </div>
</template>

<script setup>
import { ref, h } from 'vue';
import { Icon } from '#components';
const colorMode = useColorMode();
const moon = h(Icon, { name: 'proicons:moon', class: 'header-icon-class' });
const sun = h(Icon, {
  name: 'proicons:brightness',
  class: 'header-icon-class',
});
// const nuxtColorKey="data-theme"
// 1. 初始化 dark->moon
// 2. 切换
const currentComp = ref();

// const changeMode = () => {
//   colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'; // 切换
//   currentComp.value = colorMode.value == 'dark'?moon:sun;
//   localStorage.setItem(nuxtColorKey,colorMode.value)
// };

// onMounted(()=>{
//   setDefaultMode()
// })

// const setDefaultMode =()=>{
//     let lastTheme = localStorage.getItem(nuxtColorKey)||'';
//     colorMode.value = lastTheme;
//     currentComp.value = colorMode.value === 'dark' ? moon : sun;
// }
// watch(() => colorMode.value, (newValue) => {
//       setDefaultMode()
// });

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

</script>

<style lang="scss" scoped></style>
