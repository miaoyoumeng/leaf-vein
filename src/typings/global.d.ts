/* Menu */
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: MetaProps;
    children?: MenuOptions[];
  }
  interface MetaProps {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
  }
}

/* FileType */
declare namespace File {
  type ImageMimeType =
    | 'image/apng'
    | 'image/bmp'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/pjpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/tiff'
    | 'image/webp'
    | 'image/x-icon';

  type ExcelMimeType = 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
}

// http header
export enum ContentType {
  APPLICATION_JSON = 'application/json;charset=utf-8',
  MULTIPART_FORM_DATA = 'multipart/form-data'
}

// 响应状态码
export enum RespCode {
  // 请求成功
  success = 0,
  // 未登录
  unauthorized = 401,
  // 无权限
  forbidden = 403
}

/* Vite */
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
  VITE_USER_NODE_ENV: 'dev' | 'prod' | 'test';
  VITE_GLOB_APP_TITLE: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_REPORT: boolean;
  VITE_ROUTER_MODE: 'hash' | 'history';
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none';
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_API_URL: string;
  VITE_PROXY: [string, string][];
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};

declare type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns';

export type AssemblySizeType = 'large' | 'default' | 'small';

export type LanguageType = 'zh' | 'en' | null;

declare type Recordable<T = any> = Record<string, T>;
