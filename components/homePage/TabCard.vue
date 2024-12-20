<template>
  <div class="flex-row tab-card hover">
    <component :is="props.tabInfo.icon"></component>
    <div class="tab-name">{{ props.tabInfo.title }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  tabInfo: {},
});
</script>

<style lang="scss" scoped>
.tab-card {
  margin-right: 15px;
  padding: 5px 10px;
  height: var(--tab-card-height);
  border-radius: var(--base-raduis);
  align-items: center;
  .tab-name {
    margin-left: 0.2em;
    font-size: 1.2em;
  }
}
</style>
