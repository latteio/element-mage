<template>
  <mag-table :visible="true" header="表格样例" ref="empTableRef" :row-checkbox="true" :row-index="true"
             :data="employees" :params="queryParams"
             :use-page="true"
             page-align="center"
             :border="true"
             :selectable-handler="selectableHandler">
    <mag-table-bar>
      <mag-button :icon="Plus" @click="addRow">新增</mag-button>
      <mag-input :form-type="false" :model="formData" prop="name" label="姓名: " label-width="60" placeholder="请输入姓名" clearable/>
      <mag-select-date :form-type="false" :model="formData" prop="birth" label="出生日期：" label-width="100" placeholder="请选择出生日期" clearable/>
    </mag-table-bar>
    <mag-table-column prop="code" label="员工编码" :filters="[{value:'10000', text:'10000'}]" :filter-method="filterFunc"/>
    <mag-table-column prop="name" label="员工姓名"/>
    <mag-table-column prop="idNumber" label="身份证号"/>
    <mag-table-column-tag prop="gender" label="性别" :use-tag="true" :tag-data="genderOptions"/>
    <mag-table-column prop="entryTime" label="入职日期"/>
    <mag-table-column-switch prop="isEnabled" label="是否启用" :change-handler="changeFunc"/>
    <mag-table-column-buttons prop="buttons" label="操作" width="400">
      <mag-button type="primary" :icon="Edit" @click.stop="editFunc" :visible-handler="editVisibleFunc">编辑</mag-button>
      <mag-confirm-button type="danger" :icon="Delete" @click.stop="deleFunc" message="确定要删除吗？" :visible-handler="deleteVisibleFunc">删除</mag-confirm-button>
      <mag-button @click.stop="viewFunc" :icon="Search" :visible-handler="viewVisibleFunc">查看</mag-button>
      <mag-dropdown :item-click="dropdownItemClick" :item-data-provider="dropdownItemsProvider" header="菜单类型" :button-type="true"/>
    </mag-table-column-buttons>
  </mag-table>

  <EditDialogView :model="dialogModel"></EditDialogView>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {Delete, Edit, Plus, Search} from "@element-plus/icons-vue";
import EditDialogView from "@/views/demos/table/EditDialogView.vue";
import {employees} from "@/views/demos/mainData";

const empTableRef = ref();
const queryParams = {cid: 1};
const dialogModel = reactive({
  header: '',
  visible: false,
  fullscreen: false,
  data: {},
  onClose(retValues: any) {
    console.log(retValues)
  }
});

const formData = reactive({
  birth: '',
  name: ''
})

const genderOptions = [
  {value: 1, label: '男', type: 'primary'},
  {value: 2, label: '女', type: 'success'},
  {value: 0, label: '未知', type: 'danger', color: '#fff'}
];

const selectableHandler = (data: any) => {
  return data && data.code === '10000';
}

const filterFunc = (value: any, row: any, column: any) => {
  console.log('val=============', value)
  if (row.code === value) {
    return true;
  }
  return false;
}

const addRow = () => {
  dialogModel.visible = true;
  dialogModel.header = "新增对话框"
  dialogModel.data = {};
}

const changeFunc = (val: any, scope: any) => {
  console.log('val', val)
  console.log('scope', scope)
}

const editFunc = (event: any, scope: any) => {
  dialogModel.visible = true;
  dialogModel.header = "编辑对话框"
  dialogModel.data = scope.row;
}

const deleFunc = (event: any, scope: any) => {
  console.log('1===', event)
  console.log('2===', scope)
}

const viewFunc = (event: any, scope: any) => {
  console.log('1===', event)
  console.log('2===', scope)
}

const editVisibleFunc = (scope: any) => {
  return true;
}

const deleteVisibleFunc = (scope: any) => {
  return true;
}

const viewVisibleFunc = (scope: any) => {
  return scope.row.gender !== 2;
}

const dropdownItemsProvider = (scope: any) => {
  if (scope.row.gender == 0) {
    return []
  } else if (scope.row.gender == 1) {
    return [
      {
        value: 'group',
        label: '菜单组',
        icon: 'ElIconEdit'
      }
    ];
  } else {
    return [
      {
        value: 'group',
        label: '菜单组',
        icon: 'ElIconEdit'
      },
      {
        value: 'menu',
        label: '菜单项',
        icon: 'MagIconQuery'
      }, {
        value: 'outLink',
        label: '操作权限',
        icon: 'MagIconOutlink'
      }
    ];
  }
}

const dropdownItemClick = (value: string, scope: any) => {
  console.log('value===', value)
  console.log('scope===', scope)
}

onMounted(() => {
})
</script>

<style scoped lang="scss">
</style>
