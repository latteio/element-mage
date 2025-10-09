<template>
  <div>
    <el-button type="primary" @click.stop="openDlg">打开对话框</el-button>
    <DialogView :model="dialogModel"></DialogView>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import DialogView from "@/views/demos/dialog/DialogView.vue";

const dialogModel = reactive({
  visible: false,
  fullscreen: true,
  header: '',
  headerAlign: 'center',
  footerAlign: 'center',
  showConfirmBtn: false,
  showCancelBtn: true,
  data: {},
  onClose: (retValues: any) => {
    console.log(retValues)
  }
});

/**
 * 定义dialog 的model并让visible为true以打开对话框, data里面存储要传给对话框的数据
 */
const openDlg = () => {
  let data = {title: '成长记', author: '老狼', date: '2012-10-09'};
  dialogModel.visible = true;
  // dialogModel.fullscreen = true;
  dialogModel.header = "新建对话框"
  dialogModel.data = data;
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
</style>
