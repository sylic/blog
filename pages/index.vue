<template>
  <div class="content-part">
    <main class="content-wrapper flex-row">
      <div class="block"></div>
      <div class="list-wrapper">
        <MianContent></MianContent>
      </div>
    </main>
  </div>
</template>

<script setup>
import MianContent from '@/components/homePage/MianContent.vue';

</script>

<style lang="scss" scoped>
.content-part {
  width: 100%;
  height: 100%;

  .content-wrapper {
    flex: 1;
    width: 100%;
    height: 100%;

    .block {
      height: 100%;
      width: var(--sider-width);
    }

    .list-wrapper {
      height: 100%;
      width: calc(100% - var(--sider-width) * 2);
      position: relative;
    }
  }
}
</style>
