<template>
  <div class="content-part">
    <Tabs @handleChange="handleTabChange"></Tabs>
    <div class="main-part">
      <!-- 对应 pages下的index -->
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import Tabs from '~/components/homePage/Tabs.vue';

import { homePageTabs } from '@/config';
const router = useRouter();
const tabIndex = ref();

watch(
  () => tabIndex.value,
  val => {
    const { path, showPagenation } = findPath();
    router.push({ path });
  }
);

const findPath = () => {
  return homePageTabs.find((item, index) => index == tabIndex.value);
};
const handleTabChange = index => {
  tabIndex.value = index;
};
</script>

<style lang="scss" scoped>
.content-part {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .main-part {
    margin-bottom: 10px;
    height: calc(100% - 60px);
    overflow: scroll;
  }
}
</style>
