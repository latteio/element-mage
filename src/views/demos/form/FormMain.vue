<template>
  <!-- 表单和表单元素 -->
  <mag-divider content-position="left">表单和表单元素</mag-divider>
  <mag-border-layout>
    <mag-form size="default" region="north" header="查询表单" :model="formData" :columns="3" ref="formRef" :use-query="true" query-align="left" @query="onQuery" @reset="onReset" :expanded="false">
      <mag-input :model="formData" prop="name" label="姓名：" placeholder="请输入姓名" clearable/>
      <mag-select :model="formData" prop="gender" label="性别：" :data="genders" placeholder="请选择性别" clearable ref="genderRef"/>
      <mag-input-number :model="formData" prop="age" :min="0" :max="150" :step="10" label="年龄：" placeholder="请输入年龄" clearable/>
      <mag-select :model="formData" prop="city" :data="cities " label="城市：" placeholder="请选择所在城市" clearable/>
      <mag-select-tree :model="formData" prop="org" :data="orgs" label="机构树：" placeholder="请选择所在机构" clearable ref="orgRef"
                       node-key="id" :props="{label: 'orgName'}"/>
    </mag-form>

    <mag-form size="large" region="center" header="操作表单" :model="formData" :columns="3" ref="formRef" :use-query="false">
      <mag-form-bar position="top">
        <mag-button type="primary">保存</mag-button>
        <mag-button type="primary">关闭</mag-button>
      </mag-form-bar>
      <mag-input :model="formData" prop="name" label="姓名：" placeholder="请输入姓名" clearable/>
      <mag-select :model="formData" prop="gender" label="性别：" :data="genders" placeholder="请选择性别" clearable ref="genderRef"/>
      <mag-input-number :model="formData" prop="age" :min="0" :max="150" :step="10" label="年龄：" placeholder="请输入年龄" clearable/>
      <mag-text :model="formData" prop="loc" label="籍贯：" placeholder="请输入籍贯" clearable/>
      <mag-select :model="formData" prop="city" :data="cities " label="城市：" placeholder="请选择所在城市" clearable/>
      <mag-select-tree :model="formData" prop="org" :data="orgs" label="机构树：" placeholder="请选择所在机构" clearable ref="orgRef"
                       node-key="id" :props="{label: 'orgName'}"/>
      <mag-input-tag :model="formData" prop="lov" label="爱好：" :span="2" placeholder="请输入爱好(多个)" clearable/>
      <mag-select-date :model="formData" prop="birth" :fit="true" label="出生日期：" placeholder="请选择出生日期" clearable/>
      <mag-select-date :model="formData" prop="workTime" type="daterange" label="工作时间：" :span="3" :fit="false" placeholder="请选择工作时间" clearable/>
      <mag-select-time :model="formData" prop="birthtime" type="timerange" label="出生时辰：" :span="-1" :fit="false" placeholder="请选择出生时辰" clearable/>
      <mag-switch :model="formData" prop="marry" label="婚否：" placeholder="请选择婚否" :span="-1" clearable/>
      <mag-input-area :model="formData" prop="memo" label="备注：" placeholder="请输入备注" clearable readonly/>
      <mag-hidden :model="formData" prop="id" label=""></mag-hidden>
      <mag-hidden :model="formData" prop="policy" label=""></mag-hidden>
      <mag-input-button :model="formData" prop="num" :icon="Search" label="打开对话框: " @click="clickButton"/>
      <mag-select-table
          :model="formData"
          label="选择表格: "
          prop="name"
          value-key="id"
          label-key="name"
          :data="employees"
          :params="{}"
          :multiple="true"
          placeholder="请选择人员(多选)"
      >
        <mag-table-column prop="name" label="姓名"/>
        <mag-table-column prop="age" label="年龄"/>
        <mag-table-column prop="address" label="地址"/>
      </mag-select-table>
      <mag-text>测试文本:</mag-text>
      <mag-upload :model="formData" label="文件上传: " prop="file" @click="clickUploadButton"/>
    </mag-form>
  </mag-border-layout>

  <mag-upload-dialog ref="dialogRef"
                     :model="dialogModel"
                     @dialog-confirm="onDialogConfirm"
                     @dialog-cancel="onDialogCancel"
  />
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {cities, employees, genders, orgs} from "@/views/demos/mainData";
import {Search} from "@element-plus/icons-vue";

const formRef = ref();
const formData = reactive({
  id: '',
  name: '张三',
  gender: '',
  gender1: '',
  age: '',
  loc: 'sichuan chengdu',
  city: '',
  org: '',
  family: [],
  lov: ['看书', '学习', '音乐'],
  birth: '',
  birthtime: '',
  workTime: '',
  marry: true,
  policy: '',
  memo: ''
})

const dialogRef = ref();
const dialogModel = reactive({
  visible: false,
  fullscreen: false,
  header: '',
  showConfirmBtn: false,
  showCancelBtn: false,
  data: {},
  onClose: (retValues: any) => {
    console.log(retValues)
  }
});

const clickUploadButton = (e: any, dataScope: any) => {
  let data = {title: '成长记', author: '老狼', date: '2012-10-09'};
  dialogModel.visible = true;
  dialogModel.header = "上传对话框"
  dialogModel.data = data;
}

const clickButton = (e: any, dataScope: any) => {
  console.log('e==', e)
  console.log('d==', dataScope)
}

const genderRef = ref();
const orgRef = ref();
const family: any = [];

const onQuery = (event: any, model: any) => {
  console.log('onQuery', model)
}

const onReset = (event: any, model: any) => {
  console.log('onReset', model)
}

/**
 * 对话框确定事件
 */
const onDialogConfirm = () => {
  // dialogRef.value.closeDialog({ret: 1});
}

/**
 * 对话框取消事件
 */
const onDialogCancel = () => {
  // dialogRef.value.closeDialog({ret: 0});
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
</style>
