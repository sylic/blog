<template>
  <div class="content-part post-body">
    <ContentDoc path="me" />
  </div>
</template>

<script setup lang="ts">
import { usePostLinks } from '@/hooks/usePost';
usePostLinks(); // 文章的通用hooks
definePageMeta({
  pageTransition:{
    name:'markdownShowTransition'
  }
})
</script>

<style lang="scss" scoped>
.markdownShowTransition-enter-active,
.markdownShowTransition-leave-active {
  transition: opacity 0.5s ease-in;
}
.markdownShowTransition-enter-from,
.markdownShowTransition-leave-to {
  opacity: 0;
}
</style>
