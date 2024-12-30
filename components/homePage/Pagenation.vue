<template>
  <div class="pagenation">
    <div :class="prePageClass" @click="handleTurnPage('-')">{{ '<' }}</div>
    <div
      v-for="index in page.totalPage"
      :class="getPageCellClass(index)"
      :key="index"
      @click="handlePageChange(index)"
    >
      {{ index }}
    </div>
    <div :class="nextPageClass" @click="handleTurnPage('+')">{{ '>' }}</div>
  </div>
</template>

<script setup>
import { Page } from '~/config';
const prop = defineProps({
  filePath: String, // 对应content下的文件夹名
});

const emits = defineEmits(['handleChange']);

const page = ref({
  current: 1,
  total: 0,
  totalPage: 0,
  pageSize: Page.pageSize,
});
const prePageClass = computed(() => {
  return {
    cell: true,
    'pre-active': page.value.current != 1 && page.value.totalPage != 1,
    'cell-disabled': page.value.current === 1,
  };
});
const nextPageClass = computed(() => {
  return {
    cell: true,
    'cell-disabled': page.value.current === page.value.totalPage,
    'next-active':
      page.value.totalPage != 1 && page.value.current != page.value.totalPage,
  };
});
const getPageCellClass = index => {
  return {
    'cell page-cell': true,
    active: page.value.current === index,
  };
};
// 查询总数
const queryTotal = async () => {
  const count = await queryContent(prop.filePath).count();
  page.value.total = count || 0;
  page.value.totalPage = Math.ceil(page.value.total / page.value.pageSize);
};
onMounted(() => {
  queryTotal();
});
// 翻页
const handleTurnPage = type => {
  if (type === '+') {
    if (page.value.current < page.value.totalPage) {
      page.value.current++;
      emits('handleChange', page.value.current);
    }
  } else {
    if (page.value.current > 1) {
      page.value.current--;
      emits('handleChange', page.value.current);
    }
  }
};
// 点击页码
const handlePageChange = index => {
  page.value.current = index;
  emits('handleChange', index);
};
</script>

<style lang="scss" scoped>
.pagenation {
  height: var(--pagenation-height);
  user-select: none;
  display: flex;
  margin-top: 20px;
  .cell {
    padding: 0 10px;
    height: 42px;
    line-height: 42px;
    width: 42px;
    text-align: center;
    font-weight: 600;
    border-radius: 8px;
    margin-right: 5px;
  }
  .active {
    background-color: var(--color-pink);
  }
  .cell-disabled {
    font-weight: normal;
    color: var(--color-gray);
  }
  .next-active:hover,
  .pre-active:hover {
    cursor: pointer;
    background-color: var(--color-pink);
  }
  .page-cell:hover {
    cursor: pointer;
    background-color: var(--color-pink);
  }
}
</style>
