<template>
  <div class="content-part">
    <main class="content-wrapper flex-row">
      <!-- 大纲 -->
      <div class="block"></div>
      <div class="list-wrapper margin-b-10">
        <div class="content-header title-1">
          {{ mdFile.title }}
        </div>
        <div class="post-date">
          <Icon name="proicons:text-edit-style" class="date-icon"></Icon>
          写于 {{ mdFile.date }}
        </div>
        <div class="post-body">
          <ContentRenderer :value="mdFile" />
        </div>
      </div>
      <div class="block title-box">
        <Catalogue
          ref="catalogRef"
          :toc="mdFile.body.toc.links"
          @clickCB="handleCB"
        />
      </div>
    </main>
  </div>
</template>
<script setup>
import { usePostLinks, useCodeCopy } from '@/hooks/usePost';
import { getPost } from '@/utils/index';
import Catalogue from '~/components/post/Catalogue.vue';
const route = useRoute();
const post = route.params.post;
const path = post.join('/'); // 对应content目录下文件的路径

// 通过路径获取md文件
const mdFile = await getPost(path);

// 第一个标题的id
const firstId = ref();
// 大纲组件的引用
const catalogRef = ref(null);
const visibleHeaders = ref([]);
usePostLinks(); // 文章的通用hooks
useCodeCopy(); //插入复制按钮
// 获取第一个标题的id
onMounted(() => {
  firstId.value = mdFile.body.toc.links.length
    ? mdFile.body.toc.links[0].id
    : 0;

  const observer = new IntersectionObserver(handleIntersect, {
    root: document.querySelector('.list-wrapper'), // 监听的根元素
    threshold: 0.2, // 触发回调的阈值
  });

  // 获取list-wrapper元素下所有的h2, h3标签
  const headers = document.querySelectorAll('.list-wrapper > h1,h2,h3');
  headers.forEach(header => {
    observer.observe(header);
  });
});
// IntersectionObserver 回调函数
const handleIntersect = entries => {
  visibleHeaders.value = entries
    .filter(entry => entry.isIntersecting)
    .map(entry => entry.target);
  // console.log(visibleHeaders.value);
  const activeHeader = visibleHeaders.value[visibleHeaders.value.length - 1];
  if (activeHeader) {
    catalogRef.value.setActiveElement(activeHeader.id);
  }
};

// 点击大纲标题CB
const handleCB = section => {
  scrollToSection(section.id);
};
const scrollToSection = id => {
  // 点击第一个标题时，滚动到顶部
  if (id == firstId.value) {
    document
      .querySelector('.content-header')
      .scrollIntoView({ behavior: 'smooth' });
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
<style lang="scss" scoped>
.post-date {
  display: flex;
  align-items: center;
  .date-icon {
    font-size: 24px;
    margin-right: 5px;
  }
  margin: 10px 0 5px 0;
  color: #435585;
}
.title-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.title-1 {
  font-weight: bold;
  font-size: 1.1em;
}
</style>
