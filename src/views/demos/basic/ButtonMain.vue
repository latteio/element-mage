<template>
  <!-- 按钮和按钮组 -->
  <mag-divider content-position="left">按钮和按钮组相关</mag-divider>
  <mag-form :columns="1" ref="formRef">
    <mag-flex-component>
      <mag-button type="primary" @click="resetForm">保存
      </mag-button>
      <mag-button type="primary" @click="submitForm" :icon="Refresh">提交</mag-button>
    </mag-flex-component>
    <mag-button-group position="right">
      <mag-button type="primary">首页</mag-button>
      <mag-button type="primary">前页</mag-button>
      <mag-button type="primary">后页</mag-button>
      <mag-button type="primary">尾页</mag-button>
    </mag-button-group>
    <mag-button-group>
      <mag-button type="primary" round>首页</mag-button>
      <mag-button type="primary" round>前页</mag-button>
      <mag-button type="primary" round>后页</mag-button>
      <mag-button type="primary" round>尾页</mag-button>
    </mag-button-group>
    <mag-button-group>
      <mag-link type="primary">首页</mag-link>
      <mag-link type="primary">前页</mag-link>
      <mag-link type="primary">后页</mag-link>
      <mag-link type="primary">尾页</mag-link>
    </mag-button-group>
  </mag-form>


</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {Refresh} from "@element-plus/icons-vue";

const columns = [
  {prop: 'name', label: '姓名', width: '120'},
  {prop: 'age', label: '年龄', width: '80'},
  {prop: 'address', label: '地址'}
]

const tableData = [
  {id: 1, value: '1', label: '张三', name: '张三', age: 25, address: '北京市'},
  {id: 2, value: '2', label: '李四', name: '李四', age: 30, address: '上海市'},
  {id: 3, value: '3', label: '王五', name: '王五', age: 28, address: '广州市'}
]

const formData = reactive({
  name: null,
  num: 10,
  file: null
});

const formRef = ref();
const btnGroup1 = [{
  type: '',
  label: '按鈕1',
  onClick: function () {
    console.log(1)
  }
}, {
  type: 'primary',
  label: '按鈕2',
  onClick: function () {
    console.log(2)
  }
}, {
  type: 'warning',
  label: '按鈕3',
  onClick: function () {
    console.log(3)
  }
}, {
  type: 'danger',
  label: '按鈕4',
  onClick: function () {
    console.log(4)
  }
}];

const btnGroup2 = [{
  type: '',
  label: '文字按鈕1',
  text: true,
  onClick: function () {
    console.log(1)
  }
}, {
  type: 'primary',
  label: '文字按鈕2',
  text: true,
  onClick: function () {
    console.log(2)
  }
}, {
  type: 'warning',
  label: '文字按鈕3',
  text: true,
  onClick: function () {
    console.log(3)
  }
}, {
  type: 'danger',
  label: '文字按鈕4',
  text: true,
  onClick: function () {
    console.log(4)
  }
}];

const getFormValues = () => {
}

const submitForm = () => {
}

const resetForm = () => {
  formRef.value.resetForm();
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
</style>