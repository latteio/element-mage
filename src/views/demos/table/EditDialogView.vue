<template>
  <mag-dialog ref="dialogRef"
              @dialog-ready="dialogEvents.onDialogReady"
              @dialog-confirm="dialogEvents.onDialogConfirm"
              @dialog-cancel="dialogEvents.onDialogCancel">
    <mag-form ref="formRef" :model="formData" :columns="3" :rules="rules" label-position="top">
      <mag-input :model="formData" prop="code" label="员工编码：" placeholder="请输入员工编码" clearable/>
      <mag-input :model="formData" prop="name" label="员工姓名：" placeholder="请输入员工姓名" clearable/>
      <mag-select :model="formData" prop="gender" label="性别：" :data="genderOptions" placeholder="请选择性别" clearable/>
      <mag-input-area :model="formData" prop="memo" label="备注：" :span="2" placeholder="请输入备注"/>
    </mag-form>
  </mag-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {FormRules} from "element-plus";
import {Message, Objects} from "@/utils";

const dialogRef = ref();
const formRef = ref();
const formData = reactive({
  code: '',
  name: '',
  gender: '',
  memo: ''
})

const genderOptions = [{
  value: '0',
  label: '未知'
}, {
  value: '1',
  label: '男'
}, {
  value: '2',
  label: '女'
}];

const rules = reactive<FormRules>({
  code: [{
    required: true,
    message: '请输入员工编码',
    trigger: 'blur'
  }],
  name: [{
    required: true,
    message: '请输入员工姓名',
    trigger: 'blur'
  }],
  gender: [{
    required: true,
    message: '请选择性别',
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
    formRef.value.validateForm(() => {
      dialogRef.value.closeDialog({});
    }, () => {
      Message.error("表单未保存")
    });
  },

  /**
   * 对话框取消事件
   */
  onDialogCancel() {
    dialogRef.value.closeDialog({});
  }
};
</script>

<style scoped lang="scss">
</style>
