<template>

  <mag-dialog ref="dialogRef"
              @dialog-ready="dialogEvents.onDialogReady"
              @dialog-confirm="dialogEvents.onDialogConfirm"
              @dialog-cancel="dialogEvents.onDialogCancel">
    <mag-border-layout>
      <mag-form region="north" ref="formRef">
        <mag-button-group style="margin-bottom: 5px;">
          <mag-button type="primary">顶部按钮</mag-button>
          <mag-button @click="dialogEvents.onDialogCancel">关闭对话框</mag-button>
        </mag-button-group>
      </mag-form>

      <mag-table region="center" header="表格样例" ref="orgTableRef" :row-checkbox="true" :use-page="false" height="100%" :data="orgs">
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
  </mag-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {FormRules} from "element-plus";
import {Download, Plus, Upload} from "@element-plus/icons-vue";
import {Objects} from "@/utils";
import {orgs} from "@/views/demos/mainData";

const dialogRef = ref();
const formRef = ref();
const formData = reactive({
  title: '',
  author: '',
  date: '',
  memo: ''
})

const orgTableRef = ref();
const rules = reactive<FormRules>({
  title: [{
    required: true,
    message: '请输入标题',
    trigger: 'blur'
  }],
  author: [{
    required: true,
    message: '请输入作者',
    trigger: 'blur'
  }],
  date: [{
    required: true,
    message: '请输入出版日期',
    trigger: 'blur'
  }]
});

const dialogEvents = {
  /**
   * 对话框准备事件
   * @param data
   */
  onDialogReady(mode: string, data: any) {
    formRef.value.resetForm();
    if (!Objects.isEmpty(data)) {
      Objects.setObjectValues(formData, data);
    }
  },

  /**
   * 对话框确定事件
   */
  onDialogConfirm() {
    formRef.value.validateForm((model: any) => {
      console.log('model=', model)
      dialogRef.value.closeDialog({ret: 1});
    });
  },

  /**
   * 对话框取消事件
   */
  onDialogCancel() {
    dialogRef.value.closeDialog({ret: 0});
  }
};
</script>

<style scoped lang="scss">
</style>
