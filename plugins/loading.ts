import { createApp,type DirectiveBinding,} from "vue";
import Loading from "~/components/Loading/loading.vue"
// loading指令

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('loading', {
    mounted(el: HTMLElement & {instance?:any,timer?:number},binding:DirectiveBinding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance
    if (binding.value) {
      el.timer = setTimeout(() => {
        append(el);
      },800)
    }
  },
  updated(el: HTMLElement & { instance?: any, timer?: number }, binding: DirectiveBinding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
          el.timer = window.setTimeout(() => {
            append(el);
          }, 800); // 延迟 800ms 显示 loading
      } else {
          clearTimeout(el.timer);
          remove(el);
      }
    }
    },
   unmounted(el: HTMLElement & { instance?: any, timer?: number }) {
      clearTimeout(el.timer);
      remove(el);
    }
  })
})
const append = (el: HTMLElement & { instance?: any }) => {
  // 向 el 节点插入动态创建的 div 节点，内容就是我们的 loading 组件
  el.appendChild(el.instance.$el);
};

// 移除节点
function remove(el: HTMLElement & { instance?: any }) {
  // 移除动态创建的 div 节点
  if (el.instance && el.instance.$el && el.contains(el.instance.$el)) {
    el.removeChild(el.instance.$el);
  }
}