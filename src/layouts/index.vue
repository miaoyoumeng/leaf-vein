<!-- 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutComponents[layout]" />
  <ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from 'vue';
import { usePageStore } from '@/stores/modules/page';
import ThemeDrawer from './components/ThemeDrawer/index.vue';
import LayoutVertical from './LayoutVertical/index.vue';
import LayoutClassic from './LayoutClassic/index.vue';
import LayoutTransverse from './LayoutTransverse/index.vue';
import LayoutColumns from './LayoutColumns/index.vue';

const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns
};

const pageStore = usePageStore();
const layout = computed(() => pageStore.layout);
</script>

<style scoped lang="scss">
.layout {
  min-width: 600px;
}
</style>
