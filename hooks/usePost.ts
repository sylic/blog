import { ref, onMounted, onUnmounted, nextTick, createApp } from 'vue';
import CodeTool from '~/components/post/CodeTool.vue';
// 统一处理post-body类名下标签的默认事件 
export const usePostLinks = () => {
  const postRef = ref<HTMLElement | null>(null);

  // 文章点击
  const handlePostClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const tagName = target.tagName;
    if (tagName === 'A') {
      const href = (target as HTMLAnchorElement).getAttribute('href');
      event.preventDefault(); // 阻止a标签的默认行为，如跳转、url锚点等
      if (href && !href.startsWith('#')) { // 外链
        // 通过window.open打开 链接
        window.open(href, '_blank');
      }
    }
    if (tagName === 'H') {
      // H标签里面会默认嵌套a标签，去掉a标签的默认事件
      event.preventDefault();
    }
  };

  onMounted(() => {
    postRef.value = document.querySelector('.post-body');
    postRef.value?.addEventListener('click', handlePostClick); // 给文章加点击事件
  });

  onUnmounted(() => {
    postRef.value?.removeEventListener('click', handlePostClick);
  });
};

// 添加代码复制功能

export const useCodeCopy = () => {
  const postRef = ref();
  onMounted(() => {
    postRef.value = document.querySelectorAll('pre');
    nextTick(() => {
      addCopyCom();
    })
  })

  // 插入工具组件
  const addCopyCom = () => {
    postRef.value?.forEach((el: HTMLElement) => {
      if (el.classList.contains('code-copy-added')) return; // 已有类名
      // 第二个参数为props中的属性值
      const app = createApp(CodeTool, { code: el.innerText, success: false });
      const instance = app.mount(document.createElement('div'));
      el.classList.add('code-copy-added');
      el.appendChild(instance.$el);
    });
  };
}
