<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @click="handleClose">
      <div class="modal-container"  @click.stop>
        <div class="modal-header">
         <Icon name="proicons:search" class="search-box-icon" title="搜索"></Icon>
         <input class="search-input" type="text" v-model="keywords" placeholder="根据关键字搜索" @keyup.enter="handleSearch"/>
        </div>

        <div class="modal-body">
          
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
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

// 搜索结果
const searchResult = ref([]);
const serachLoading = ref(false);
// 搜索
const handleSearch =async () => {
  // 关键字为空时，不搜索
  if (!keywords.value) {
    searchResult.value = [];
    return;
  }
  serachLoading.value = true;
  // 搜索
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
  serachLoading.value = false;
  console.log(searchResult.value);
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
}

.modal-container {
  width: 500px;
  height: 200px;
  margin: 70px auto;
  padding: 15px 20px;
  background-color: var(--bg-color-light);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flexbox;
  flex-direction: column;
}

.modal-header{
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: #fff;
  padding:10px;
  .search-box-icon{
    font-size: 1.5em;
    margin-right: 10px;
  }
  .search-input{
    border: none;
    outline: none;
  }

}

.modal-body {
  margin: 20px 0;
  flex: 1;
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