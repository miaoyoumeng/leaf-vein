import { defineStore } from 'pinia';
import { UserInfo } from '@/stores/interface';
import piniaPersistConfig from '@/stores/helper/persist';

export const useUserStore = defineStore('user_info_store', {
  state: (): UserInfo => ({
    token: '',
    info: {
      name: '', //账号名称
      displayName: '', //显示名称
      profilePicture: '' //头像
    }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setInfo
    setUserInfo(info: UserInfo['info']) {
      this.info = info;
    }
  },
  persist: piniaPersistConfig('login_user_info')
});
