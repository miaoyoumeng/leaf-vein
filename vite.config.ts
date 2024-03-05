import { defineConfig, loadEnv, ConfigEnv, UserConfig, PluginOption } from 'vite';
import Vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { createHtmlPlugin } from 'vite-plugin-html';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslintPlugin from 'vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression';
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite';
import path, { resolve } from 'path';
import dayjs from 'dayjs';

import pkg from './package.json';
import { Recordable, ViteEnv } from '@/typings/global.d';
import { VitePWA } from 'vite-plugin-pwa';

const { name, version } = pkg;
const __APP_INFO__ = {
    pkg: { name, version },
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);
    const { VITE_GLOB_APP_TITLE, VITE_PWA } = viteEnv;
    return {
        base: viteEnv.VITE_PUBLIC_PATH,
        root: root,
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            },
            extensions: ['.mjs', '.js', '.json', '.ts', '.vue']
        },
        plugins: [
            Vue(),
            // vue 可以使用 jsx/tsx 语法
            vueJsx(),
            // esLint 报错信息显示在浏览器界面上
            eslintPlugin(),
            // name 可以写在 script 标签上
            vueSetupExtend({}),
            // 创建打包压缩配置
            createCompression(viteEnv),
            // 注入变量到 html 文件
            createHtmlPlugin({
                minify: true,
                entry: 'src/main.ts',
                inject: {
                    data: { title: VITE_GLOB_APP_TITLE }
                }
            }),
            createSvgIconsPlugin({
                iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            }),
            // vitePWA
            VITE_PWA && createVitePwa(viteEnv)
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/styles/var.scss";`
                }
            }
        },
        server: {
            host: '0.0.0.0',
            port: 8900,
            open: false,
            cors: true,
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:4523/m1/4079066-0-default',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        },
        build: {
            outDir: 'dist',
            minify: 'esbuild',
            sourcemap: false,
            // 禁用 gzip 压缩大小报告，可略微减少打包时间
            reportCompressedSize: false,
            // 规定触发警告的 chunk 大小
            chunkSizeWarningLimit: 2000,
            rollupOptions: {
                output: {
                    // Static resource classification and packaging
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
                }
            }
        }
    };
});

function wrapperEnv(envConf: Recordable): ViteEnv {
    const ret: any = {};

    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, '\n');
        realName = realName === 'true' ? true : realName === 'false' ? false : realName;
        if (envName === 'VITE_PORT') realName = Number(realName);
        if (envName === 'VITE_PROXY') {
            try {
                realName = JSON.parse(realName);
            } catch (error) {}
        }
        ret[envName] = realName;
    }
    return ret;
}

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
    const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
    const compressList = VITE_BUILD_COMPRESS.split(',');
    const plugins: PluginOption[] = [];
    if (compressList.includes('gzip')) {
        plugins.push(
            viteCompression({
                ext: '.gz',
                algorithm: 'gzip',
                deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
            })
        );
    }
    if (compressList.includes('brotli')) {
        plugins.push(
            viteCompression({
                ext: '.br',
                algorithm: 'brotliCompress',
                deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
            })
        );
    }
    return plugins;
};

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
    const { VITE_GLOB_APP_TITLE } = viteEnv;
    return VitePWA({
        registerType: 'autoUpdate',
        manifest: {
            name: VITE_GLOB_APP_TITLE,
            short_name: VITE_GLOB_APP_TITLE,
            theme_color: '#ffffff',
            icons: [
                {
                    src: '/logo.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '/logo.png',
                    sizes: '512x512',
                    type: 'image/png'
                },
                {
                    src: '/logo.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable'
                }
            ]
        }
    });
};
