<template>
  <!-- 文章的大纲 -->
  <div class="toc-box">
    <div class="title" v-for="(d, index) in prop.toc" :key="index">
      <div
        class="title-1 text-oneline hover"
        @click.self="handleClick($event, d)"
        :class="{ active: activeElement === d.id }"
      >
        {{ d.text }}
      </div>
      <div
        v-if="d.children"
        v-for="(child, childIndex) in d.children"
        :key="childIndex"
        @click.stop="handleClick($event, child)"
      >
        <div
          class="title-2 text-oneline hover"
          :class="{ active: activeElement === child.id }"
        >
          &emsp;&nbsp;{{ child.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, defineExpose } from 'vue';
const prop = defineProps({
  toc: Array,
});
const emit = defineEmits(['clickCB']);
const activeElement = ref(null);
/*
{
  depth:第几级标题
  text:标题内容
  id: 标题的id
  children： 下级标题
}
*/
const handleClick = (event: any, c: any) => {
  activeElement.value = c.id;
  emit('clickCB', c);
};
const setActiveElement = (id: number) => {
  activeElement.value = id;
};

// 向外暴露的方法
defineExpose({
  setActiveElement,
});
</script>

<style lang="scss" scoped>
.toc-box {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  user-select: none;
  color: var(--post-text-color);
  .title {
    padding: 3px 10px;

    .title-1 {
      width: 100%;
      font-size: 0.9em;
    }

    .hover:hover {
      cursor: pointer;
      font-weight: bold;
    }

    .active {
      font-weight: bold;
      // color: var(--text-color-light);
    }

    .title-2 {
      padding-top: 3px;
      font-size: 0.8em;
    }
  }
}
</style>
