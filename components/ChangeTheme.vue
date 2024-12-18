<template>
  <div class="change-mode-com"></div>
</template>

<script setup>
import { ref } from 'vue';
import { authorInfo } from '@/config';
import { getSystemTheme } from '@/utils/index';
const theme = getSystemTheme();
console.log(theme, '主题色');
</script>

<style lang="scss" scoped></style>
