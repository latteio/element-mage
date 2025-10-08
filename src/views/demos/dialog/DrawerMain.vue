<template>
  <div>
    <el-button type="primary" @click.stop="openDrw">打开抽屉框</el-button>
    <DrawerView :model="drawerModel"></DrawerView>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import DrawerView from "@/views/demos/dialog/DrawerView.vue";

const drawerModel = reactive({
  visible: false,
  fullscreen: false,
  header: '',
  headerAlign: 'center',
  footerAlign: 'center',
  showConfirmBtn: false,
  showCancelBtn: true,
  data: {},
  onClose(retValues: any) {
    console.log(retValues)
  }
});

/**
 * 定义 drawer 的model并让visible为true以打开对话框, data里面存储要传给对话框的数据
 */
const openDrw = () => {
  let data = {title: '成长记', author: '老狼', data: '2012-10-09'};
  drawerModel.visible = true;
  drawerModel.fullscreen = false;
  drawerModel.header = "新建抽屉框"
  drawerModel.data = data;
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
</style>