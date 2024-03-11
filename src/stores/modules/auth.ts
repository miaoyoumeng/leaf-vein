import { defineStore } from 'pinia';
import { AuthState } from '@/stores/interface';
import { getAuthMenuListApi, getAuthButtonListApi } from '@/api/auth';
import { Menu } from '@/typings/global.d';

export const useAuthStore = defineStore({
    id: 'leaf-vein-auth',
    state: (): AuthState => ({
        // 按钮权限列表
        authButtonList: {},
        // 菜单权限列表
        authMenuList: [],
        // 当前页面的 router name，用来做按钮权限筛选
        routeName: ''
    }),
    getters: {
        // 按钮权限列表
        authButtonListGet: state => state.authButtonList,
        // 菜单权限列表 ==> 这里的菜单没有经过任何处理
        authMenuListGet: state => state.authMenuList,
        // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
        showMenuListGet: state => getShowMenuList(state.authMenuList),
        // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
        flatMenuListGet: state => getFlatMenuList(state.authMenuList),
        // 递归处理后的所有面包屑导航列表
        breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
    },
    actions: {
        // Get AuthButtonList
        async getAuthButtonList() {
            const { data } = await getAuthButtonListApi();
            this.authButtonList = data;
        },
        // Get AuthMenuList
        async getAuthMenuList() {
            const { data } = await getAuthMenuListApi();
            this.authMenuList = data;
        },
        // Set RouteName
        async setRouteName(name: string) {
            this.routeName = name;
        }
    }
});

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
    let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
    return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
function getShowMenuList(menuList: Menu.MenuOptions[]) {
    let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
    return newMenuList.filter(item => {
        item.children?.length && (item.children = getShowMenuList(item.children));
        return !item.meta?.isHide;
    });
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
const getAllBreadcrumbList = (menuList: Menu.MenuOptions[], parent = [], result: { [key: string]: any } = {}) => {
    for (const item of menuList) {
        result[item.path] = [...parent, item];
        if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
    }
    return result;
};
