/* UserInfo 用户信息 */

import { AssemblySizeType, LanguageType, LayoutType, Menu } from '@/typings/global.d';

export interface UserInfo {
    token: string;
    info: {
        name: string; //账号名称
        displayName: string; //显示名称
        profilePicture: string; //头像
    };
}

/* AuthState */
export interface AuthState {
    routeName: string;
    authButtonList: {
        [key: string]: string[];
    };
    authMenuList: Menu.MenuOptions[];
}

/* PageState */
export interface PageState {
    layout: LayoutType;
    assemblySize: AssemblySizeType;
    language: LanguageType;
    maximize: boolean;
    primary: string;
    isDark: boolean;
    isGrey: boolean;
    isWeak: boolean;
    asideInverted: boolean;
    headerInverted: boolean;
    isCollapse: boolean;
    accordion: boolean;
    breadcrumb: boolean;
    breadcrumbIcon: boolean;
    tabs: boolean;
    tabsIcon: boolean;
    footer: boolean;
}

/* tabsMenuProps */
export interface TabsMenuProps {
    icon: string;
    title: string;
    path: string;
    name: string;
    close: boolean;
    isKeepAlive: boolean;
}

/* TabsState */
export interface TabsState {
    tabsMenuList: TabsMenuProps[];
}

/* KeepAliveState */
export interface KeepAliveState {
    keepAliveName: string[];
}
