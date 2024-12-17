<template>
  <div class="header-box flex-row">
    <div class="block"></div>
    <div class="main-header"></div>
    <div class="block"></div>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue';
import { navLinks } from '@/site.config';
</script>

<style lang="scss">
.header-box {
  width: 100%;
  height: var(--wrap-height);
  .main-header {
    flex: 1;
  }
  .block {
    height: 100%;
    width: var(--sider-width);
  }
}
</style>
