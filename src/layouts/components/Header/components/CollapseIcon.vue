<template>
    <el-icon class="collapse-icon" @click="changeCollapse">
        <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
    </el-icon>
</template>

<script setup lang="ts">
import { usePageStore } from '@/stores/modules/page';

const pageStore = usePageStore();
const changeCollapse = () => pageStore.setGlobalState("isCollapse", !pageStore.isCollapse);
</script>

<style scoped lang="scss">
.collapse-icon {
    margin-right: 20px;
    font-size: 22px;
    color: var(--el-header-text-color);
    cursor: pointer;
}
</style>
