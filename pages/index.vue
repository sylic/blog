<!-- 根路由 -->
<template>
  <div class="content-part">
    <Tabs @handleChange="handleTabChange"></Tabs>
    <div class="main-part">
      <NuxtPage />
    </div>
    <Pagenation v-if="showPageNation" />
  </div>
</template>

<script setup>
import Tabs from '@/components/homePage/Tabs.vue';
import Pagenation from '~/components/homePage/Pagenation.vue';
import {} from 'vue';
const showPageNation = ref(true);
const handleTabChange = index => {
  showPageNation.value = index != 0;
};
</script>

<style lang="scss" scoped>
.content-part {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .main-part {
    flex: 1;
  }
}
</style>
