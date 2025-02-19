<template>
  <div class="post-card hover" @click.prevent="goToPostDetail">
    <div class="post-title">{{ post.title }}</div>
    <div class="post-description text-threeline ">{{ post.description }}</div>
    <div class="other-line flex-row flex-sb">
      <div class="post-date">{{ post.date }}</div>
      <div class="post-tags flex-row" v-if="tagLength">
        <Tag v-for="tag in post.tags" :key="tag" :tag="tag">
          <template #default>#{{ tag }}</template>
        </Tag>
        <div
          v-if="tagLength > 4"
          class="tag"
          :title="`折叠了 ${tagLength - 4} 个标签`"
        >
          <Tag>...</Tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 解析 date，description，tags，title
import { defineProps, ref } from 'vue';
const router = useRouter();
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const post = props.post;
// tag 截取
const tagLength = post.tags ? post.tags.length : 0;
let clientWidth = document.documentElement.clientWidth;
if (tagLength >=2) {
  let sliceCnt = clientWidth > 767 ?4:1;
  post.tags = post.tags.slice(0, sliceCnt);
}

const goToPostDetail = () => {
  router.push({
    path: `/post${props.post._path}`,
  });
};
</script>

<style lang="scss">
.post-card {
  user-select: none;
  width: var(--post-card-width);
  border: 1px solid var(--post-border);
  padding: 16px;
  border-radius: var(--border-radius-base);
  margin: 16px 0 0 5px;
  transition: box-shadow 0.3s ease-in;
  .post-title {
    font-weight: bold;
    font-size: var(--post-card-title);
  }

  .post-description {
    margin: 10px 0;
    font-size: 0.9em;
    color: var(--post-description);
  }

 

  .other-line {
     .post-date {
      font-size: 0.8em;
      color: var(--post-description);
    }
  }
}

.post-card:hover {
  box-shadow: var(--box-shadow);
}
</style>
