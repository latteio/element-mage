<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
            default-active="1"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <span>基础</span>
            </template>
            <el-menu-item @click="handleSelect('app')">应用</el-menu-item>
            <el-menu-item @click="handleSelect('button')">按钮</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <span>布局</span>
            </template>
            <el-menu-item @click="handleSelect('borderLayout')">Border布局</el-menu-item>
            <el-menu-item @click="handleSelect('stackLayout')">Stack布局</el-menu-item>
            <el-menu-item @click="handleSelect('page')">页面</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <span>导航</span>
            </template>
            <el-menu-item @click="handleSelect('nav')">Dropdown列表</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <span>数据</span>
            </template>
            <el-menu-item @click="handleSelect('form')">表单域</el-menu-item>
            <el-menu-item @click="handleSelect('dialog')">对话框</el-menu-item>
            <el-menu-item @click="handleSelect('drawer')">抽屉框</el-menu-item>
            <el-menu-item @click="handleSelect('tab')">选项卡</el-menu-item>
            <el-menu-item @click="handleSelect('table')">表格</el-menu-item>
            <el-menu-item @click="handleSelect('editTable')">可编辑表格</el-menu-item>
            <el-menu-item @click="handleSelect('tree')">树</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {onMounted} from 'vue';
import router from "@/routes";

const handleOpen = (key: string, keyPath: string[]) => {
}

const handleClose = (key: string, keyPath: string[]) => {
}

const handleSelect = (menu: any) => {
  if (menu == 'page') {
    router.push(menu + "?mode=add&header=查询")
  } else {
    router.push(menu)
  }
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
.common-layout {
  display: flex;
  width: 100%;
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-main {
  padding: 20px;
  background-color: #f0f2f5;
  height: 100%;
  overflow-y: auto;
}
</style>
