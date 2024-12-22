<template>
  <div class="post-list flex-col flex-center">
    <post-card v-for="(post, index) in posts" :post="post" :key="index" />
  </div>
</template>

<script setup lang="ts">
import {} from 'vue';
import { getIncludedYearPosts } from '@/utils/index';

const posts = await getIncludedYearPosts('summary');
</script>
<style lang="scss" scoped></style>
