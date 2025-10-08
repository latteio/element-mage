<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup name="app">
import {onMounted} from 'vue';

/**
 * 设置主题
 */
onMounted(() => {
});
</script>

<style lang="scss" scoped>
</style>
