<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElConfigProvider } from 'element-plus';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import { getBrowserLang } from '@/utils';
import { useTheme } from '@/hooks/useTheme';
import { usePageStore } from '@/stores/modules/page';
import { LanguageType } from '@/typings/global.d';

const pageStore = usePageStore();

// init theme
const { initTheme } = useTheme();
initTheme();

// init language
const i18n = useI18n();
onMounted(() => {
  const language = pageStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  pageStore.setPageState('language', language as LanguageType);
});

// element language
const locale = computed(() => {
  if (pageStore.language == 'zh') return zhCn;
  if (pageStore.language == 'en') return en;
  return getBrowserLang() == 'zh' ? zhCn : en;
});

// element assemblySize
const assemblySize = computed(() => pageStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
