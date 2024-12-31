---
date: 2024-12-31 10:46:36
tags:
  - markdown代码块
  - Vue.extend
title: 记录一下处理markdown中的代码块的方法
---
markdown 解析出的代码块是由`pre`标签包裹着的，可以通过css去自定义代码块的背景色、字号等；除此之外，还可以给代码块添加复制按钮(最开始想通过伪元素+样式来实现，但是这种办法没法很好的监听点击事件)，封装单独的复制按钮组件A，再通过Vue.extends语法将A挂载到pre标签。

### 代码块样式
通过全局的css样式来实现，在`pre > code `中增加预设的一些样式，如圆角，padding,背景色等。建议在 `ContentDoc` 或 `ContentRenderer` 标签的父元素加一个class类名，避免污染markdown之外的元素样式；
``` css
/* post-body是父元素的类名 */
.post-body{  
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
  :not(pre >code){
    code {
      /* 行内代码样式 */
    }
  }
  blockquote{
    /* 引用文本块 */
  }
}
```
> 其他标签，如li、h标题等等，都可以用同样的方式来自定义样式
### 代码块复制功能
