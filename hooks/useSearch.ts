import { ref, onMounted, createApp} from 'vue';
import Search from '@/components/Search.vue';

// 搜索
export const useSearch = () => {
  const body = ref<HTMLElement | null>(null);
  const isShow = ref(true);

  // 挂载搜索组件
  const mountSearch = () => {
    const SearchComponent = createApp(Search, { show: isShow.value,'update:show': (val: boolean) => isShow.value = val });
    const instance = SearchComponent.mount(document.createElement('div'));
    body.value = document.querySelector('body');
    body.value?.appendChild(instance.$el);
  };

  return {
    mountSearch,
  };
};