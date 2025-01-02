---
date: 2024-12-31 10:46:36
tags:
  - markdown代码块
  - createApp
title: 记录一下处理markdown中的代码块的方法
---

markdown 解析出的代码块(code 标签)是由`pre`标签包裹着的，可以通过 css 子代选择器去自定义代码块的背景色、字号等；除此之外，还可以给代码块添加复制按钮(最开始想通过伪元素+样式来实现，但是这种办法没法很好的监听点击事件)，封装单独的复制按钮组件 A，再通过 createApp 语法将 A 挂载到 pre 标签。

## 代码块样式

通过全局的 css 样式来实现，在`pre > code `中增加预设的一些样式，如圆角，padding,背景色等。建议在 `ContentDoc` 或 `ContentRenderer` 标签的父元素加一个 class 类名，避免污染 markdown 之外的元素样式；

```css
/* post-body是父元素的类名 */
.post-body {
  pre:has(> code) {
    padding: 1.2em 1em;
    margin: 15px 10px;
    background-color: var(--post-box-bg);
    border-radius: 0.5em;
    font-size: 1em;
    line-height: 1.5em;
    overflow: auto;

    code {
      padding: 0;
      margin: 0;
      background-color: var(--post-box-bg); // 添加自己喜欢的颜色
      border-radius: 5px;
      font-size: 1em;
      line-height: 1.5em;
    }
  }
  :not(pre > code) {
    code {
      /* 行内代码样式 */
    }
  }
  blockquote {
    /* 引用文本块 */
  }
}
```

> 其他标签，如 li、h 标题等等，都可以用同样的方式来自定义样式

## 代码块复制功能
思路：通过查到所有的`pre`标签，给每一个`pre`标签动态挂载一个组件,用到了vue3 `createApp` API:第一个参数是根组件。第二个参数可选，它是要传递给根组件的 props，用法请见 [Vue.js-createApp](https://cn.vuejs.org/api/application)

### 复制按钮组件
dom元素主要实现复制按钮和已复制按钮的切换，需要用一个变量定义来控制；组件使用`absolute`绝对定位，放置在右上角(<strong>pre标签-relative</strong>)；
``` html
<div class="copy-content">
  copySuccessed?复制成功的按钮：复制按钮
</div>  
<style>
.copy-btn {
  user-select: none;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  padding: 10px;
  border-radius: 0 0 0 var(--post-code-raius);
}
</style>
```

`script` 标签中接收2个变量，`code`是`pre`标签中的`innerText`,`success` 用于控制复制是否成功；

``` javascript
<script setup>
const props = defineProps({
  code: String,
  success: Boolean,
});
// 子组件不能直接改父组件传过来的props，所以需要用ref包装一下
const copySuccessed = ref(false);
copySuccessed.value = props.success;

const copyMessage = () => {
  // 去除多余的换行符
  const cleanedCode = props.code.replace(/\n\s*\n/g, '\n');
  navigator.clipboard
    .writeText(cleanedCode)
    .then(() => {
      copySuccessed.value = true;
      setTimeout(() => {
        copySuccessed.value = false;
      }, 2000);
    })
    .catch(err => {
      copySuccessed.value = false;
    });
};
</script>
```

### 挂载 复制组件 到pre标签
需要先找出页面所有的pre标签，再遍历所有的pre标签，将这段代码抽到一个hooks里，便于复用；
``` typescript
export const useCodeCopy = () => {
  const postRef = ref();
  onMounted(() => {
    postRef.value = document.querySelectorAll('pre');
    nextTick(() => {
      addCopyCom();
    })
  })

  // 插入工具组件
  const addCopyCom = () => {
    postRef.value?.forEach((el: HTMLElement) => {
      if (el.classList.contains('code-copy-added')) return; // 已有类名，跳过
      // 第二个参数为props中的属性值
      const app = createApp(CodeTool, { code: el.innerText, success: false });
      const instance = app.mount(document.createElement('div'));
      el.classList.add('code-copy-added');
      el.appendChild(instance.$el);
    });
  };
}
```