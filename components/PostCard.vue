<template>
  <div class="post-card hover" @click.prevent="goToPostDetail">
    <div class="post-title">{{ post.title }}</div>
    <div class="post-description dark-white text-threeline ">{{ post.description }}</div>
    <div class="other-line flex-row flex-sb">
      <div class="post-date dark-white">{{ post.date }}</div>
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
// tag 超过4个就截取
const tagLength = post.tags ? post.tags.length : 0;
if (tagLength > 4) {
  post.tags = post.tags.slice(0, 4);
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
  width: 70%;
  border: 1px solid var(--border-color-grey);
  padding: 16px;
  border-radius: var(--border-radius-base);
  margin-top: 16px;
  transition: box-shadow 0.3s ease;

  .post-title {
    font-weight: bold;
    font-size: 1.1em;
  }

  .post-description {
    margin: 10px 0;
    font-size: 0.9em;
  }

  .post-date {
    font-size: 0.8em;
  }

  .other-line {
  }
}

.post-card:hover {
  box-shadow: var(--box-shadow);
}
</style>
