import http from '@/request';

// 获取菜单列表
export const getAuthMenuListApi = () => {
    return http.get(`/menu/list`, {});
    // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
};

// 获取按钮权限
export const getAuthButtonListApi = () => {
    return http.get(`/auth/buttons`, {});
};
