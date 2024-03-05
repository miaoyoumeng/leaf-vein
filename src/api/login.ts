import http from '@/request';

// 用户退出登录
export const logoutApi = () => {
    return http.get('/sso/logout');
};

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = params => {
    return http.post('/login/uid/sign/on', params);
};

// 登录模块
export namespace Login {
    export interface ReqLoginForm {
        uid: string;
        password: string;
    }
    export interface ResLogin {
        access_token: string;
    }
    export interface ResAuthButtons {
        [key: string]: string[];
    }
}

// 分页请求参数
export interface ReqPage {
    pageNum: number;
    pageSize: number;
}

// 用户管理模块
export namespace User {
    export interface ReqUserParams extends ReqPage {
        username: string;
        gender: number;
        idCard: string;
        email: string;
        address: string;
        createTime: string[];
        status: number;
    }
    export interface ResUserList {
        id: string;
        username: string;
        gender: number;
        user: { detail: { age: number } };
        idCard: string;
        email: string;
        address: string;
        createTime: string;
        status: number;
        avatar: string;
        photo: any[];
        children?: ResUserList[];
    }
    export interface ResStatus {
        userLabel: string;
        userValue: number;
    }
    export interface ResGender {
        genderLabel: string;
        genderValue: number;
    }
    export interface ResDepartment {
        id: string;
        name: string;
        children?: ResDepartment[];
    }
    export interface ResRole {
        id: string;
        name: string;
        children?: ResDepartment[];
    }
}
