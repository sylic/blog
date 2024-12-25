<template>
  <!-- 文章的大纲 -->
  <div class="toc-box">
    <div class="title" v-for="(d, index) in prop.toc" :key="index">
      <div :class="['title- 1', 'text - oneline', 'hover',]" @click.self="handleClick(d)">{{
        d.text }}</div>
      <div v-if="d.children" v-for="(child, childIndex) in d.children" :key="childIndex"
        @click.stop="handleClick(child)">
        <div class="title-2 text-oneline hover">&emsp;&nbsp;{{ child.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"
const prop = defineProps({
  toc: []
});
const emit = defineEmits(['clickCB'])
// console.log(prop.toc);
/*
{
  depth:第几级标题
  text:标题内容
  id: 标题的id
  children： 下级标题
}
*/
const handleClick = (c) => {
  console.log(c, '目录点击');
  c.isActive = true
  emit('clickCB', c)
}
</script>

<style lang="scss" scoped>
.toc-box {
  width: 100%;

  .title {
    padding: 3px 10px;

    .title-1 {
      width: 100%;
      font-size: 0.9em;
    }

    .hover {
      cursor: pointer;

    }

    .active {
      font-size: bold;
    }

    .title-2 {
      padding-top: 3px;
      font-size: 0.9em;
    }
  }

}
</style>
