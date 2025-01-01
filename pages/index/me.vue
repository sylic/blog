<template>
  <div class="content-part post-body">
    <ContentDoc path="me" class="slide-enter-content" />
  </div>
</template>

<script setup lang="ts">
import { usePostLinks } from '@/hooks/usePost';
usePostLinks(); // 文章的通用hooks
</script>

<style lang="scss" scoped></style>
