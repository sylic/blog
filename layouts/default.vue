<template>
  <div class="home-layout flex-col">
    <header class="p-2em header-wrapper">
      <Header></Header>
    </header>
    <main class="content-wrapper flex-row">
      <div class="block"></div>
      <div class="list-wrapper">
        <MianContent></MianContent>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import Header from './components/Header';
import MianContent from './components/MianContent';
</script>
<style lang="scss" scoped>
.home-layout {
  height: 100%;
}
.header-wrapper {
  height: var(--wrap-height);
}
.content-wrapper {
  flex: 1;
  width: 100%;
  .block {
    height: 100%;
    width: var(--sider-width);
  }
  .list-wrapper {
    height: 100%;
    width: calc(100% - var(--sider-width) * 2);
    position: relative;
    // border-left: 1px dashed grey;
  }
}
</style>
