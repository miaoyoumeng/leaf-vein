import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import router from '@/routers';
import { ResultData } from './modules';
import { useUserStore } from '@/stores/modules/user';
import { ContentType, RespCode } from '@/typings/global.d';

// 强制退出清空缓存信息
export const clearLoginStores = () => {
    console.log('清除登录标识');
};

class RequestHttp {
    instance: AxiosInstance;
    constructor(options: CreateAxiosDefaults) {
        this.instance = axios.create(options);
        // 全局的请求请求拦截
        this.instance.interceptors.request.use(
            config => {
                config.headers['Content-Type'] = ContentType.APPLICATION_JSON;
                const userStore = useUserStore();
                if (userStore && userStore.token) {
                    config.headers.Authorization = userStore.token;
                }
                return config;
            },
            error => {
                this.showMessage(error);
                return Promise.reject(new Error(error || 'Error'));
            }
        );
        // 全局的响应拦截
        this.instance.interceptors.response.use(
            res => {
                const data = res.data;
                const code = data.code;

                // 添加promise主要是为了刷新token的时候拦截resolve
                return new Promise((resolve, reject) => {
                    if (code === RespCode.success) {
                        // 成功的操作
                        resolve(data);
                    } else if (code === RespCode.unauthorized) {
                        router.push({ path: '/to_login' });
                        clearLoginStores();
                    } else if (code === RespCode.forbidden) {
                        this.showMessage('权限访问拒绝', 'warning');
                    } else if (code >= 1000 && code <= 2000) {
                        // 成功的操作
                        this.showMessage(data.msg, 'warning');
                        resolve(data);
                    } else {
                        // 错误处理
                        this.showMessage(data.msg);
                        reject(new Error(data.msg || 'Error'));
                    }
                });
            },
            error => {
                this.showMessage(error);
                return Promise.reject(new Error(error || 'Error'));
            }
        );
    }

    /**
     * @description: 错误信息弹窗
     * @param {*} message 错误消息
     * @param {*} type 类型
     */
    showMessage(message = 'Error', type = 'error') {
        console.log('type:' + type + ',message:' + message);
    }

    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.instance.get(url, { params, ..._object });
    }

    post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.instance.post(url, { params, ..._object });
    }

    put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.instance.put(url, { params, ..._object });
    }

    delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.instance.delete(url, { params, ..._object });
    }

    download(url: string, params?: object, _object = {}): Promise<BlobPart> {
        return this.instance.post(url, params, { ..._object, responseType: 'blob' });
    }
}

export default RequestHttp;
