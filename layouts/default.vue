<template>
  <div class="home-layout">
    <header class="p-2em">
      <Header></Header>
    </header>
    <aside></aside>
    <main class="flex-1 px-7 py-10 w-100%">
      <div class="max-w-70ch m-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import Header from './components/Header';
</script>
