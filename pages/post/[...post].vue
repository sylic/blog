<template>
  <div class="content-part">
    <main class="content-wrapper flex-row">
      <!-- 大纲 -->
      <div class="block">
      </div>
      <div class="list-wrapper margin-b-10">
        <div class="content-header title-1">
          {{ mdFile.title }}
        </div>
        <ContentDoc :path="path" />
      </div>
      <div class="block title-box">
        <Catalogue ref="catalogRef" :toc="mdFile.body.toc.links" @clickCB="handleCB" />
      </div>
    </main>
  </div>
</template>
<script setup>
// import Giscus from '@giscus/vue';
import { getPost } from '@/utils/index';
import Catalogue from '@/components/post/catalogue.vue';
const route = useRoute();
const post = route.params.post;
const path = post.join('/'); // 对应content目录下文件的路径

// 通过路径获取md文件
const mdFile = await getPost(path);

// 点击标题
const handleCB = (section) => {
  console.log("父组件", section);
}
</script>
<style lang="scss" scoped>
.title-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.title-1 {
  font-weight: bold;
  font-size: 1.2em;

}
</style>