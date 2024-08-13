import { defineStore } from 'pinia';
import { store } from "@/stores/index";

export const userStore = defineStore('userStore', {
  state: () => ({
    userInfo: <any>{
    },
    access_token: '',
    isRefresh: false, // 是否需要刷新页面
  }),
  getters: {
    getAccessToken():any {
      return this.access_token
    }
  },
  actions: {
    setAccessToken(payload: any) {
      this.access_token = payload
    },
    setUserInfo(payload: any) {
      this.userInfo = payload
    },
    setIsRefresh(payload: boolean) {
      this.isRefresh = payload
    },
  },
  persist: [
    {
      paths: ['userInfo', 'access_token'],
      storage: localStorage,
    }
  ]
});

export function userStoreHook() {
    return userStore(store);
}