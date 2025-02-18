<template>
  <div class="header-box flex-row">
    <div class="block"></div>
    <div class="main-header flex-row flex-sb">
      <div class="author" :description="authorInfo.name">
        {{ authorInfo.name }}
      </div>
      <div class="outer-links flex-row">
        <Icon @click="handleSearch" name="proicons:search" class="header-icon-class marin-r-10 hover" title="搜索"></Icon>
        <ChangeTheme />
        <!-- a 标签访问过后颜色会变为链接颜色 -->
        <div
          v-for="link in outerLinks"
          :key="link.herf"
          class="hover marin-r-10"
          :title="link.title"
          @click="handleLinkClick(link.herf)"
        >
          <component :is="link.icon" />
        </div>
      </div>
    </div>
    <div class="block"></div>
  </div>
</template>

<script setup>
import {} from 'vue';
import { authorInfo, outerLinks } from '@/config';
import { Icon } from '#components';
import { useSearch } from "@/hooks/useSearch"

const {mountSearch} = useSearch();

const handleLinkClick = (path) => {
  window.open(path);
};

// 搜索
const handleSearch =() => {
  mountSearch();
}
</script>

<style lang="scss">
.header-box {
  width: 100%;
  height: var(--wrap-height);
  .author {
    font-size: var(--title-font-size);
  }
  .main-header {
    flex: 1;
  }
  .block {
    height: 100%;
    width: var(--sider-width);
  }
}
</style>
