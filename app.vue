<template>
  <div class="home-layout flex-col">
    <header class="header-wrapper">
      <Header></Header>
    </header>
    <NuxtLoadingIndicator color="#777" />
    <NuxtPage />
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.home-layout {
  height: 100%;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.header-wrapper {
  height: var(--wrap-height);
  transition: all 0.4s ease-out;
}
</style>
