<template>
  <div class="hover marin-r-10" @click="changeMode">
    <component :is="currentComp"></component>
  </div>
</template>

<script setup>
import { ref, h } from 'vue';
import { systemConfig } from '@/config';
import { Icon } from '#components';

// ToDo getSystemTheme报错
// import { getSystemTheme } from '@/utils/index';
// const theme = getSystemTheme();
// console.log(theme, '主题色');
const moon = h(Icon, { name: 'proicons:moon', class: 'header-icon-class' });
const sun = h(Icon, {
  name: 'proicons:brightness',
  class: 'header-icon-class',
});
const currentComp = ref(sun);
const isLight = ref(true);
onMounted(() => {
  isLight.value = window.matchMedia('(prefers-color-scheme: light)').matches;
  currentComp.value = isLight ? sun : moon;
  document.body.setAttribute(
    systemConfig.themeModeAttr,
    isLight.value ? 'light' : 'dark'
  );
});
// 更换主题色
const changeMode = () => {
  if (isLight.value) {
    document.body.setAttribute(systemConfig.themeModeAttr, 'dark');
    currentComp.value = moon;
  } else {
    document.body.setAttribute(systemConfig.themeModeAttr, 'light');
    currentComp.value = sun;
  }
  isLight.value = !isLight.value;
};
</script>

<style lang="scss" scoped></style>
