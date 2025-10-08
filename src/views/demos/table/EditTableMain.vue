<template>
  <mag-table :visible="true" header="可编辑表格样例" ref="empTableRef" :row-checkbox="true" :row-index="true"
             :data="employees" :params="queryParams" :use-page="true" page-align="center" :border="false"
             :selectable-handler="selectableHandler">
    <mag-table-bar align="center">
      <mag-button type="primary" :icon="Plus" @click="addRow">新增</mag-button>
      <mag-button type="primary" :icon="Edit" @click="editRow">编辑</mag-button>
      <mag-button type="primary" :icon="Close" @click="cancelEdit">取消编辑</mag-button>
      <mag-button type="primary" :icon="Delete" @click="delRow">删除</mag-button>
      <mag-button type="primary" :icon="Query" @click="getModifiedRows">获取编辑行数据</mag-button>
      <mag-button type="primary" :icon="Save" @click="saveModifiedRows">保存编辑行数据</mag-button>
    </mag-table-bar>
    <mag-table-column prop="code" label="员工编码" :editable="true">
      <mag-select-table
          label="选择表格: "
          prop="code"
          value-key="code"
          label-key="name"
          :data="employees"
          :params="{}"
          :multiple="true"
          placeholder="请选择人员"
      >
        <mag-table-column prop="name" label="姓名"/>
        <mag-table-column prop="age" label="年龄"/>
        <mag-table-column prop="address" label="地址"/>
      </mag-select-table>
    </mag-table-column>
    <mag-table-column prop="name" label="员工姓名" :editable="true">
      <mag-input prop="name" clearable></mag-input>
    </mag-table-column>
    <mag-table-column prop="idNumber" label="身份证号" :editable="true">
      <mag-input-number prop="idNumber" clearable></mag-input-number>
    </mag-table-column>
    <mag-table-column prop="gender" label=性别 :editable="true">
      <mag-select prop="gender" :data="genderOptions" clearable></mag-select>
    </mag-table-column>
    <mag-table-column prop="entryTime" label="入职日期" :editable="true">
      <mag-select-date prop="entryTime" clearable></mag-select-date>
    </mag-table-column>
    <mag-table-column-switch prop="isEnabled" label="是否启用" :change-handler="changeFunc"/>
    <mag-table-column-buttons prop="buttons" label="操作" width="220">
      <mag-edit-button @save="onEditableRowSave">编辑</mag-edit-button>
      <mag-delete-button>删除</mag-delete-button>
    </mag-table-column-buttons>
  </mag-table>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Close, Delete, Edit, Plus} from "@element-plus/icons-vue";
import {ApiRequest} from "@/utils";
import {employees} from "@/views/demos/mainData";

const empTableRef = ref();
const queryParams = {cid: 1};
const genderOptions = [{value: 1, label: '男'}, {value: 2, label: '女',}, {value: 0, label: '未知',}];

const addRow = () => {
  empTableRef.value.addRow({
    code: null,
    name: null,
    idNumber: 0,
    gender: 1,
    entryTime: null,
    isEnabled: 0
  });
}

const editRow = () => {
  empTableRef.value.editRows();
}

const cancelEdit = () => {
  empTableRef.value.cancelEdit();
}

const delRow = () => {
  empTableRef.value.delRow({
    id: '883812909791051776'
  });
}

const getModifiedRows = () => {
  console.log(empTableRef.value.getModifiedRows())
}

const saveModifiedRows = () => {
  return ApiRequest({
    url: '/api/system/employee/batchSave',
    method: 'post',
    data: empTableRef.value.getModifiedRows()
  }).then((response: any) => {
    console.log(response)
    empTableRef.value.load({});
  }).catch((error: any) => {
    console.log(error)
  });
}

const selectableHandler = (data: any) => {
  return data && data.code === '10000';
}

const changeFunc = (val: any, scope: any) => {
  console.log('val', val)
  console.log('scope', scope)
}

const onEditableRowSave = (scope: any, data: any) => {
  console.log('scope===', scope)
  console.log('data===', data)
}

onMounted(() => {
})
</script>

<style scoped lang="scss">
</style>
