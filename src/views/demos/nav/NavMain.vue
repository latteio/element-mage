<template>
  <div>
    <mag-divider content-position="left">dropdown</mag-divider>
    <mag-dropdown :item-click="dropdownItemClick" :item-data="dropdownItems" header="菜单类型" :button-type="true"
                  type="danger"/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import {MagDropdownItemType} from "@/components/navigation/MagDropdown";

const dropdownItems: MagDropdownItemType[] = [
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
    icon: "MagIconOutlink"
  }
];

const dropdownItemClick = (value: string) => {
  console.log('value===', value)
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
</style>