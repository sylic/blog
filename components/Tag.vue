<template>
  <div class="tag">
    <slot></slot>
  </div>
</template>

<script setup>
import {} from 'vue';
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: var(--border-radius-base-8);
  background-color: var(--bg-tag);
  font-size: 0.6em;
  margin-right: 8px;
}
</style>
