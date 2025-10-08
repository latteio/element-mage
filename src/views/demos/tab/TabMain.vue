<template>
  <mag-border-layout>
    <mag-form region="north">
      <mag-button @click.stop="displayOrHidden">显示/隐藏</mag-button>
    </mag-form>

    <mag-tab-group header="标题" ref="tabGroupRef" region="center" :active="activeTab">
      <mag-tab header="Tab 1" :icon="Setting" name="tab1">
        内容1
      </mag-tab>

      <mag-tab header="Tab 2" name="tab2">
        内容2
      </mag-tab>

      <mag-tab header="Tab 3" name="tab3">
        内容3
      </mag-tab>

      <mag-tab header="Tab 4" name="tab4">
        内容4
      </mag-tab>
    </mag-tab-group>
  </mag-border-layout>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Setting} from "@element-plus/icons-vue";

const visible = ref(true);
const tabGroupRef = ref();
const activeTab = ref("tab2");

const displayOrHidden = () => {
  visible.value = !visible.value;
  tabGroupRef.value.setVisible(visible.value);
}
</script>

<style scoped lang="scss">
</style>
