<template>
  <el-dropdown trigger="click" @command="setAssemblySize">
    <i :class="'iconfont icon-contentright'" class="toolBar-icon"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in assemblySizeList" :key="item.value" :command="item.value" :disabled="assemblySize === item.value">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePageStore } from '@/stores/modules/page';
import { AssemblySizeType } from '@/typings/global';

const pageStore = usePageStore();
const assemblySize = computed(() => pageStore.assemblySize);

const assemblySizeList = [
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
  { label: '小型', value: 'small' }
];

const setAssemblySize = (item: AssemblySizeType) => {
  if (assemblySize.value === item) {
    return;
  }
  pageStore.setPageState('assemblySize', item);
};
</script>
