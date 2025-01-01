<template>
  <div class="copy-content">
    <!-- 复制按钮 -->
    <div
      class="copy-btn code-data-copy"
      @click="copyMessage"
      data-clipboard-action="copy"
      :data-clipboard-text="code"
    >
      <div>
        <svg
          v-if="!copySuccessed"
          class="copy-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            <path
              d="M16.75 5.75a3 3 0 0 0-3-3h-6.5a3 3 0 0 0-3 3v9.5a3 3 0 0 0 3 3h6.5a3 3 0 0 0 3-3z"
            />
            <path d="M19.75 6.75v8.5a6 6 0 0 1-6 6h-5.5" />
          </g>
        </svg>
        <svg
          v-else
          class="copy-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m19.75 7.018l-9.257 9.257a1 1 0 0 1-1.414 0L4.25 11.446"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import Clipboard from 'clipboard'; //复制插件
const props = defineProps({
  code: String,
  success: Boolean,
});
const { code } = toRefs(props);
// 子组件不能直接改父组件传过来的props，所以需要用ref包装一下
const copySuccessed = ref(false);
copySuccessed.value = props.success;

const copyMessage = () => {
  let clipboard = new Clipboard('.code-data-copy');
  clipboard.on('success', function (e) {
    copySuccessed.value = true;
    setTimeout(() => {
      copySuccessed.value = false;
    }, 1000);
    clipboard.destroy(); // 销毁,避免多次点击重复出现
  });
  clipboard.on('error', function (e) {
    console.log('复制失败', e);
    copySuccessed.value = false;
  });
};
</script>

<style lang="scss" scoped>
.copy-content {
  height: 0;
}
.copy-btn {
  user-select: none;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  padding: 10px;
  border-radius: 0 0 0 var(--post-code-raius);
  transition: 0.3s;
}
@keyframes successCopy {
  70% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>
