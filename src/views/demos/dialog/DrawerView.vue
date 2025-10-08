<template>
  <mag-drawer ref="drawerRef"
              @dialog-ready="dialogEvents.onDialogReady"
              @dialog-cancel="dialogEvents.onDialogCancel">
    <mag-form :model="formData" :columns="1">
      <mag-form-bar>
        <mag-button @click="dialogEvents.onDialogCancel">关闭对话框</mag-button>
      </mag-form-bar>
      <mag-input :model="formData" prop="title" label="标题：" placeholder="请输入标题" clearable/>
      <mag-input :model="formData" prop="author" label="作者：" placeholder="请输入作者"
                 clearable/>
      <mag-input :model="formData" prop="date" label="日期：" placeholder="请输入日期" clearable/>
      <mag-input-area :model="formData" prop="memo" label="备注：" :span="2"
                      placeholder="请输入备注"/>
    </mag-form>
  </mag-drawer>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";

const drawerRef = ref();
const formData = reactive({
  title: '',
  author: '',
  date: '',
  memo: ''
})

/**
 * 对话框事件
 */
const dialogEvents = {
  onDialogReady(mode: string, data: any) {
    console.log('onDialogReady===', data)
    formData.author = data.author;
  },
  onDialogCancel() {
    drawerRef.value.closeDialog({})
  }
}
</script>

<style scoped lang="scss">
</style>
