<template>
  <div class="post-card hover">
    <div v-for="item in parsedContent" :key="item.id">
      <component :is="item.tag" v-bind="item.props" :class="item.class">
        <template v-for="child in item.children">
          <component :is="child.tag" v-bind="child.props" :class="child.class">
            {{ child.value }}
          </component>
        </template>
      </component>
    </div>
    <!-- 只展示第一级标题和内容 -->
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const post = props.post;
const parsedContent = ref([]);

// const parseContent = children => {
//   return children
//     .map(child => {
//       if (
//         child.type === 'element' &&
//         ['h1', 'h2', 'h3', 'h4', 'h5', 'p'].includes(child.tag)
//       ) {
//         let className = '';
//         switch (child.tag) {
//           case 'h1':
//             className = 'heading-1';
//             break;
//           case 'h2':
//             className = 'heading-2';
//             break;
//           case 'h3':
//             className = 'heading-3';
//             break;
//           case 'h4':
//             className = 'heading-4';
//             break;
//           case 'h5':
//             className = 'heading-5';
//             break;
//           case 'p':
//             className = 'paragraph';
//             break;
//           default:
//             className = '';
//         }
//         return {
//           tag: child.tag,
//           props: child.props,
//           class: className,
//           children: child.children.filter(
//             c => c.type === 'text' || c.type === 'element'
//           ),
//         };
//       }
//     })
//     .filter(Boolean);
// };

const parseContent = children => {
  return children.map(child => {
    if (child.type === 'element') {
      let className = '';
      switch (child.tag) {
        case 'h1':
          className = 'heading-1';
          break;
        case 'h2':
          className = 'heading-2';
          break;
        case 'h3':
          className = 'heading-3';
          break;
        case 'h4':
          className = 'heading-4';
          break;
        case 'h5':
          className = 'heading-5';
          break;
        case 'p':
          className = 'paragraph';
          break;
        default:
          className = 'md-content';
      }
      return {
        tag: 'div',
        props: child.props,
        class: className,
        children: parseContent(child.children || []),
      };
    } else if (child.type === 'text') {
      return {
        tag: 'span',
        value: child.value,
      };
    }
  });
};

onMounted(() => {
  parsedContent.value = parseContent(post.body.children);
});
</script>

<style lang="scss" scoped>
.post-card {
  width: 70%;
  border: 1px solid var(--border-color-grey);
  padding: 16px;
  border-radius: 10px;
  margin-top: 16px;
}

.md-content {
  font-size: 1.2em;
}
</style>
