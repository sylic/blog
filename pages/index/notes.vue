<template>
  <div class="post-list flex-col flex-center">
    <post-card v-for="post in posts" :post="post" :key="post._id" />
    <Pagenation filePath="notes" @handleChange="getPostList" />
  </div>
</template>

<script setup lang="ts">
import { getPosts } from '@/utils/index';
import Pagenation from '~/components/homePage/Pagenation.vue';
const posts = ref();
const filePath = 'notes';

onMounted(async () => {
  posts.value = await getPosts(filePath, 1);
});

// 分页CB
const getPostList = async (pageNo: number) => {
  posts.value = await getPosts(filePath, pageNo);
  // console.log(posts);
};
</script>

<style lang="scss" scoped>
.post-list {
  width: 100%;
  height: 100%;
}
</style>
