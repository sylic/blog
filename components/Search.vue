<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @click="handleClose">
      <div class="modal-container"  @click.stop>
        <div class="modal-header">
         <Icon name="proicons:search" class="search-box-icon" title="搜索"></Icon>
         <input class="search-input" type="text" v-model="keywords" placeholder="请输入关键字" @keyup.enter="handleSearch" @input="handleTextChange"/>
        </div>

        <div class="modal-body">
          <div class="info-text" v-if="searchStatus === 0">
            {{ getInfoText }}
          </div>
          <div v-else>
            <div v-for="item in searchResult" :key="item._id" class="result-item hover" @click="handlePostClick(item)">
              <div class="title text-twoline" v-html="showKeyWordsFileter(item)"></div>
              <div class="description">{{ item.date }}</div>
            </div>
          </div>  
        </div>
        <div class="modal-footer" v-if="searchStatus === 2">
          共找到{{ searchResult.length }}条记录
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import {throttled,debounce} from "@/utils/common"
const router = useRouter();
const props = defineProps({
  show: Boolean
})
const show = ref(props.show);
const emits = defineEmits(['update:show'])
const handleClose = () => {
  show.value = false
  emits('update:show', false)
}
const keywords = ref('');
const searchStatus = ref(0); // 0: 未搜索 1: 搜索中 2: 搜索完成
// 搜索结果
const searchResult = ref([]);
// 搜索
const handleSearch = throttled(async () => {
  console.log('搜索');
  // 关键字为空时，不搜索
  if (!keywords.value) {
    searchResult.value = [];
    return;
  }
  searchStatus.value = 1;
  // 搜索 标题 描述 标签 
  searchResult.value = await queryContent()
    .where({
      $or: [
        { title: { $regex: new RegExp(`.*${keywords.value}.*`, 'i') } },
        {
          description: {
            $regex: new RegExp(`.*${keywords.value}.*`, 'i'),
          },
        },
        {
          tags: {
            $contains: keywords.value,
          },
        },
      ],
    })
    .find()
  searchStatus.value = 2;
},1000);
// 输入框内容变化
const handleTextChange = () => {
  if (!keywords.value) {
    searchResult.value = [];
    searchStatus.value = 0;
  }
}

// 提示文案
const getInfoText = computed(() => {
  if (searchStatus.value === 1) {
    return '搜索中...';
  }
  if (searchResult.value.length === 0 && searchStatus.value === 2) {
    return '未搜索到相关内容';
  }
  return '按下回车键以搜索';
});

// 点击文章
const handlePostClick = (post) => {
  handleClose(); // 关闭搜索框
  router.push({
    path: `/post${post._path}`,
  });
}

// 关键字高亮
const showKeyWordsFileter = (post) => {
  if (!keywords.value) {
    return '';
  }
  let res = ''
  let word = keywords.value;
  const reg = new RegExp(word, 'ig');
  if(post.title.match(reg)){
    res = post.title.replace(reg, (match) => {
      return `<span class="key-word">${match}</span>`;
    });
  }
  if(post.description.match(reg)){
    res = post.description.replace(reg, (match) => {
      return `<span class="key-word">${match}</span>`;
    });
  }
  if(post.tags.join('').match(reg)){
    res = post.tags.join('').replace(reg, (match) => {
      return `<span class="key-word">${match}</span>`;
    });
  }
  return res;
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  font-size: 1em;
}

.modal-container {
  width: var(--modal-width);
  height: 35%;
  margin: 70px auto;
  padding: 15px 20px;
  background-color: var(--bg-color-light);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}


.modal-header{
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: #fff;
  padding:10px;
  .search-box-icon{
    font-size: 1.5em;
    margin-right: 10px;
    color: var(--icon-color);
  }
  .search-input{
    width: 100%;
    border: none;
    font-size: 1em;
    outline: none;
  }

}

.modal-body {
  margin: 20px 0;
  flex: 1;
  height: calc(100% - 40px);
  overflow: auto;
  .info-text{
    width: 100%;
    height: 100%;
    margin-top: 20%;
    font-size: 1em;
    text-align: center;
    color: #b4b4b8;
  }
  .result-item{
    margin-bottom: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 6px;
    color: var(--text-grey-color);
    .title{
      font-size: 1em;
      font-weight: 500;
      .key-word{
        color: var(--key-word-color);
        padding-left: 2px;
        padding-right: 2px;
        font-weight: bolder;
      }
    }
    .description{
      margin-top: 5px;
      font-size: 0.9em;
    }
  }
}
.modal-footer{
  /* height: 40px; */
  color: var(--text-grey-color);
  padding-left: 10px;
}

.modal-default-button {
  float: right;
}

/*
 * 对于 transition="modal" 的元素来说
 * 当通过 Vue.js 切换它们的可见性时
 * 以下样式会被自动应用。
 *
 * 你可以简单地通过编辑这些样式
 * 来体验该模态框的过渡效果。
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>