<template>
  <div class="home-layout flex-col">
    <header class="header-wrapper">
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
  transition: all 0.4s ease-out;
}
</style>
