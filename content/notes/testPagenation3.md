---
date: 2024-12-29 09:49:36
tags:
  - example
  - demo
title: 这是我的demo文档，分页测试3
---

还需要有搜索功能，根据 tages 搜索？用这个框架就是为了显示网页源代码做 seo，简单百度了一下没仔细撸官网，知道了 asyncData 中 return 数据就行了，刚拿到这个框架简单搭建了项目以后就开始无脑切图了，然后就留下了坑，因为一般开发页面的时候习惯拆分组件，但是一个整个页面想显示源代码，那就不能拆组件，因为 asyncData 方法会在组件（限于页面组件）每次加载之前被调用。