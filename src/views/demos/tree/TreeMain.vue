<template>
  <mag-tree header="机构树" ref="orgTreeRef" node-key="id" :props="orgTreeProps" default-expand-all
                  :data="orgs" :params="queryParams">
    <mag-tree-bar>
      <mag-button type="primary" @click.stop="onAdd">新增</mag-button>
      <mag-button type="primary" @click.stop="onUpload">上传</mag-button>
      <mag-button type="primary" @click.stop="onDownload">下载</mag-button>
    </mag-tree-bar>
  </mag-tree>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {orgs} from "@/views/demos/mainData";

const orgTreeRef = ref();
const orgTreeProps = {
  label: 'orgName'
};
const queryParams = {code: 1, name: 2};

const onAdd = (event: any, node: any) => {
  console.log('add', node)
}

const onUpload = (event: any, node: any) => {
  console.log('upload', node)
}

const onDownload = (event: any, node: any) => {
  console.log('download', node)
}

onMounted(() => {
})
</script>

<style scoped lang="scss">
</style>
