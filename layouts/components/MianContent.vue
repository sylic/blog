<template>
  <div class="content-part">
    <Tabs @handleChange="handleTabChange"></Tabs>
    <div class="main-part">
      <!-- 对应 pages下的index -->
      <NuxtPage />
    </div>
    <Pagenation v-if="needShowPagenation" />
  </div>
</template>

<script setup>
import Tabs from '~/components/homePage/Tabs.vue';
import Pagenation from '~/components/homePage/Pagenation.vue';
import { homePageTabs } from '@/config';
const router = useRouter();
const route = useRoute();
const tabIndex = ref();

const needShowPagenation = ref(false);
watch(
  () => tabIndex.value,
  val => {
    const { path, showPagenation } = findPath();
    needShowPagenation.value = showPagenation;
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
    // flex: 1;
    margin-bottom: 10px;
    height: calc(
      100% - var(--pagenation-height) - var(--tab-card-height) - 10px
    );
  }
}
</style>
