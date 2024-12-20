<template>
  <div class="hover marin-r-10" @click="changeMode">
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
// 1. 初始化 dark->moon
// 2. 切换
const currentComp = ref();
currentComp.value = colorMode.value === 'dark' ? moon : sun;
watchEffect(() => {
  currentComp.value = colorMode.value === 'dark' ? moon : sun;
}); // 更换主题色
const changeMode = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'; // 切换
};
</script>

<style lang="scss" scoped></style>
