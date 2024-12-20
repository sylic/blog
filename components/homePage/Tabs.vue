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
const activedIndex = ref(0);
const emits = defineEmits(['handleChange']);
emits('handleChange', 0);
const handleTabChange = index => {
  activedIndex.value = index;
  emits('handleChange', index);
};
</script>

<style lang="scss" scoped>
.tab-part {
  .active {
    background-color: #f3d0d7;
  }
}
</style>
