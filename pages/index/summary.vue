<template>
  <div class="post-list flex-col flex-center">
    <post-card v-for="(post, index) in posts" :post="post" :key="index" />
    <Pagenation filePath="summary" @handleChange="getPostList" />
  </div>
</template>

<script setup lang="ts">
import {} from 'vue';
import Pagenation from '~/components/homePage/Pagenation.vue';
import { getPosts } from '@/utils/index';
const filePath = 'summary';
const posts = ref();

onMounted(async () => {
  posts.value = await getPosts(filePath, 1);
});

// 分页CB
const getPostList = async (pageNo: number) => {
  console.log(pageNo);
  posts.value = await getPosts(filePath, pageNo);
};
</script>
<style lang="scss" scoped></style>
