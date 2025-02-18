<template>
  <div class="tab-part flex-row">
    <tab-card
      v-for="(tab, index) in homePageTabs"
      :key="index"
      :tab-info="tab"
      :class="{ active: activedIndex == index }"
      @click="handleTabChange(index)"
    />
  </div>
</template>

<script setup>
import TabCard from './TabCard.vue';
import {} from 'vue';
import { homePageTabs } from '@/config';
const activedIndex = ref();
const emits = defineEmits(['handleChange']);
const route = useRoute();

// 点击tab切换
const handleTabChange = index => {
  activedIndex.value = index;
  emits('handleChange', index);
};

watch(
  () => route.path,
  val => {
    if (val == '/') {
      // 根目录 默认选中第一个
      activedIndex.value = 0;
      emits('handleChange', activedIndex.value);
    }
    activedIndex.value = homePageTabs.findIndex(item => item.path == val);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.tab-part {
  overflow-x: scroll;
  
  .active {
    background-color: var(--bg-block-color);
  }
}
</style>
