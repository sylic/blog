<template>
  <div class="post-list flex-col flex-center" v-loading="listLoading">
    <post-card v-for="post in posts" :post="post" :key="post._id" />
    <Pagenation filePath="notes" @handleChange="getPostList" />
  </div>
</template>

<script setup lang="ts">
import { getPosts } from '@/utils/index';
import Pagenation from '~/components/homePage/Pagenation.vue';
const posts = ref();
const filePath = 'notes';
const listLoading=ref(false);
onMounted(() => {
  getPostList(1);
});
// 分页CB
const getPostList = async (pageNo: number) => {
  listLoading.value = true;
  posts.value = await getPosts(filePath, pageNo);
  listLoading.value = false;
};

definePageMeta({
  pageTransition:{
    name:'markdownShowTransition'
  }
})
</script>

<style lang="scss" scoped>
.post-list {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
