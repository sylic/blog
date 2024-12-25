<template>
  <div class="post-list flex-col flex-center">
    <post-card v-for="(post, index) in posts" :post="post" :key="index" />
  </div>
</template>

<script setup lang="ts">
import { } from 'vue';
import { getPosts } from '@/utils/index';

const posts = await getPosts('summary');
</script>
<style lang="scss" scoped></style>
