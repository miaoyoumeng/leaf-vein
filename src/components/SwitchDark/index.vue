<template>
  <el-switch v-model="pageStore.isDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @change="switchDark" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from '@/hooks/useTheme';
import { usePageStore } from '@/stores/modules/page';
import { Sunny, Moon } from '@element-plus/icons-vue';

const { switchDark } = useTheme();
const pageStore = usePageStore();
</script>
