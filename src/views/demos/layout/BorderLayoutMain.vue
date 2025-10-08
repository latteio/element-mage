<template>
  <mag-border-layout>
    <!-- north: 表单 -->
    <mag-form region="north" header="表单实例" :model="formData" :columns="3" ref="formRef" :use-query="true">
      <mag-input :model="formData" prop="name" label="姓名：" placeholder="请输入姓名" clearable/>
      <mag-select :model="formData" prop="gender" label="性别：" :data="genders" placeholder="请选择性别" clearable ref="genderRef"/>
      <mag-input-number :model="formData" prop="age" :min="0" :max="150" :step="10" label="年龄：" placeholder="请输入年龄" clearable/>
      <mag-input :model="formData" prop="loc" label="籍贯：" placeholder="请输入籍贯" clearable/>
      <mag-select :model="formData" prop="city" :data="cities" label="城市：" placeholder="请选择所在城市" clearable/>
      <mag-select-tree :model="formData" prop="org" :data="orgs" label="机构树：" placeholder="请选择所在机构" clearable ref="orgRef"/>
      <mag-select-table :model="formData" prop="family" label="家人：" value-key="code" label-key="name"
                        :data="employees" :params="{}"
                        :multiple="true" placeholder="请选择家人" clearable>
        <mag-table-column prop="name" label="姓名"/>
        <mag-table-column prop="age" label="年龄"/>
        <mag-table-column prop="address" label="地址"/>
      </mag-select-table>
      <mag-input-tag :model="formData" prop="lov" label="爱好：" :span="2" placeholder="请输入爱好(多个)" clearable/>
      <mag-select-date :model="formData" prop="birth" type="daterange" label="出生日期：" placeholder="请选择出生日期" clearable/>
      <mag-select-time :model="formData" prop="birthtime" type="timerange" label="出生时辰：" placeholder="请选择出生时辰" clearable/>
      <mag-switch :model="formData" prop="marry" label="婚否：" placeholder="请选择婚否" clearable/>
      <mag-input-area :model="formData" prop="memo" :span="3" label="备注：" placeholder="请输入备注" clearable/>
    </mag-form>

    <!-- west: 树 -->
    <mag-tree region="west" style="width: 300px;" header="左边机构树" ref="orgTreeRef" node-key="id" :props="orgTreeProps" default-expand-all
              :data="orgs" :params="{}">
    </mag-tree>

    <!-- east: 树 -->
    <mag-tree region="east" style="width: 300px;" header="右边机构树" ref="orgTreeRef" node-key="id" :props="orgTreeProps" default-expand-all
              :data="orgs" :params="{}">
    </mag-tree>

    <!-- south: 表格 -->
    <mag-table region="center" header="中央表格样例" ref="orgTableRef" :row-checkbox="true" :use-page="false" height="100%" :data="orgs">
      <mag-table-bar align="right">
        <mag-button type="primary" :icon="Plus">新增</mag-button>
        <mag-button type="primary" :icon="Upload">上传</mag-button>
        <mag-button type="primary" :icon="Download">下载</mag-button>
      </mag-table-bar>
      <mag-table-column prop="orgCode" label="机构编码"/>
      <mag-table-column prop="orgName" label="机构名称"/>
      <mag-table-column-tag prop="orgType" label=机构类型 :use-tag="true"
                            :tag-data="[{value:'10', label:'机构', type:'primary'}, {value:'20',label:'机构所属下级机构'}, {value:'30',label:'机构所属部门', type:'success'}]"/>
      <mag-table-column prop="sortNo" label="排序"/>
    </mag-table>

    <!-- south: 表格 -->
    <mag-table region="south" header="底部表格样例" ref="orgTableRef" :row-checkbox="true" :use-page="false" height="300px" :data="orgs">
      <mag-table-bar>
        <mag-button type="primary" :icon="Plus">新增</mag-button>
        <mag-button type="primary" :icon="Upload">上传</mag-button>
        <mag-button type="primary" :icon="Download">下载</mag-button>
      </mag-table-bar>
      <mag-table-column prop="orgCode" label="机构编码"/>
      <mag-table-column prop="orgName" label="机构名称"/>
      <mag-table-column-tag prop="orgType" label=机构类型 :use-tag="true"
                            :tag-data="[{value:'10', label:'机构', type:'primary'}, {value:'20',label:'机构所属下级机构'}, {value:'30',label:'机构所属部门', type:'success'}]"/>
      <mag-table-column prop="sortNo" label="排序"/>
    </mag-table>
  </mag-border-layout>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {Download, Plus, Upload} from "@element-plus/icons-vue";
import {cities, employees, genders, orgs} from "@/views/demos/mainData";

const formRef = ref();
const formData = reactive({
  name: '',
  gender: '',
  gender1: '',
  age: '',
  loc: '',
  city: '',
  org: '',
  family: [],
  lov: ['看书', '学习', '音乐'],
  birth: '',
  birthtime: '',
  marry: true,
  policy: '',
  memo: ''
})
const orgTableRef = ref();
const orgTreeProps = {
  label: 'orgName'
};
</script>

<style scoped lang="scss">
</style>
