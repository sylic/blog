<template>
  <div class="home-layout flex-col">
    <header class="p-2em header-wrapper">
      <Header></Header>
    </header>
    <NuxtPage />
  </div>
</template>
<script lang="ts" setup>
import Header from './components/Header';
</script>
<style lang="scss" scoped>
.home-layout {
  height: 100%;
}

.header-wrapper {
  height: var(--wrap-height);
}
</style>
