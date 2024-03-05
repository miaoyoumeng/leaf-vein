// import http from '@/request';
import authButtonList from '@/assets/json/authButtonList.json';
import authMenuList from '@/assets/json/authMenuList.json';
// 获取菜单列表
export const getAuthMenuListApi = () => {
    // return http.get(`/auth/menus`);
    return authMenuList;
};

// 获取按钮权限
export const getAuthButtonListApi = () => {
    // return http.get(`/auth/buttons`);
    return authButtonList;
};
