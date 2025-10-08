<template>
  <mag-page :router="router" backward-path="/" :header="pageModel.header" @page-ready="onPageReady">
    <el-descriptions :column="3" size="small" class="mt-4">
      <el-descriptions-item label="Username">
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item label="Telephone">
        18100000000
      </el-descriptions-item>
      <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address">
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal
      circumstance, but critical bug fixes would require hotfix so the actual
      release number <b>could be</b> more than 1 per week.
    </p>
  </mag-page>
</template>

<script setup lang="ts">
import router from "@/routes";
import {reactive} from "vue";

const pageModel = reactive({header: ''});
const onPageReady = (params: any) => {
  console.log('params===', params)
  pageModel.header = params.header;
}
</script>

<style scoped lang="scss">
</style>