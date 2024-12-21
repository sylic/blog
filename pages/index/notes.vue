<template>
  <div class="post-list flex-col flex-center">
    <post-card v-for="(post, index) in posts" :post="post" :key="index" />
  </div>
</template>

<script setup>
import {} from 'vue';
import { getIncludedYearPosts } from '@/utils/index';

const posts = await getIncludedYearPosts('notes');
</script>

<style lang="scss" scoped>
.post-list {
  width: 100%;
  height: 100%;
}
</style>
