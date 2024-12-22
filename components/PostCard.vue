<template>
  <div class="post-card hover">
    <div class="post-title">{{ post.title }}</div>
    <div class="post-description">{{ post.description }}</div>
    <div class="other-line flex-row flex-sb">
      <div class="post-date">{{ post.date }}</div>
      <div class="post-tags flex-row">
        <Tag v-for="tag in post.tags" :key="tag" :tag="tag">
          <template #default>#{{ tag }}</template>
        </Tag>
      </div>
    </div>
  </div>
</template>

<script setup>
// 解析 date，description，tags，title
import { defineProps, ref } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const post = props.post;

// 这个方法在详情页再使用，列表页不需要
// const parseContent = children => {
//   return children.map(child => {
//     if (child.type === 'element') {
//       let className = '';
//       switch (child.tag) {
//         case 'h1':
//           className = 'heading-1';
//           break;
//         case 'h2':
//           className = 'heading-2';
//           break;
//         case 'h3':
//           className = 'heading-3';
//           break;
//         case 'h4':
//           className = 'heading-4';
//           break;
//         case 'h5':
//           className = 'heading-5';
//           break;
//         case 'p':
//           className = 'paragraph';
//           break;
//         default:
//           className = 'md-content';
//       }
//       return {
//         tag: 'div',
//         props: child.props,
//         class: className,
//         children: parseContent(child.children || []),
//       };
//     } else if (child.type === 'text') {
//       return {
//         tag: 'span',
//         value: child.value,
//       };
//     }
//   });
// };
</script>

<style lang="scss" scoped>
.post-card {
  width: 70%;
  border: 1px solid var(--border-color-grey);
  padding: 16px;
  border-radius: var(--border-radius-base);
  margin-top: 16px;
  .post-title {
    font-weight: bold;
    font-size: 1.2em;
  }
  .post-description {
    margin: 10px 0;
    font-size: 1em;
  }
  .other-line {
  }
}
</style>
