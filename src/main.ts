import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';
// svg icons
import 'virtual:svg-icons-register';
// reset style sheet
import '@/styles/reset.scss';
// CSS common style sheet
import '@/styles/common.scss';
// iconfont css
import '@/assets/iconfont/iconfont.scss';
// font css
import '@/assets/fonts/font.scss';
// element css
import 'element-plus/dist/index.css';
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css';
// custom element dark css
import '@/styles/element-dark.scss';
// custom element css
import '@/styles/element.scss';

// vue Router
import router from '@/routers';
// pinia store
import pinia from '@/stores';
import I18n from '@/languages/index';
import directives from '@/directives/index';

const app = createApp(App);
// register the element Icons component
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(ElementPlus).use(directives).use(router).use(I18n).use(pinia).mount('#app');
