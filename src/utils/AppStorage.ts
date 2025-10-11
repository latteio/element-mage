import {AppConfiguration, AppStorageType} from "@/element-mage-types";

const appStorageInstaller = function (appConfig: AppConfiguration) {
  /**
   * window.localStorage:   浏览器永久性缓存
   * window.sessionStorage: 浏览器实例性缓存
   * @method set    设置永久缓存
   * @method get    获取永久缓存
   * @method remove 移除永久缓存
   * @method clear  移除全部永久缓存
   */
  let __APP__TOKEN__KEY: string = "OpaqueToken";
  let __APP__STORAGE__KEY: any = `MAG_APP_STORAGE_KEY__${appConfig.code}_`;

  function getStorageKeyInternal(key: string) {
    return `${__APP__STORAGE__KEY}${key}`;
  }

  const Local = {
    /**
     * 设置永久缓存
     * @param key
     * @param val
     */
    set<T>(key: string, val: T) {
      window.localStorage.setItem(getStorageKeyInternal(key), JSON.stringify(val));
    },

    /**
     * 获取永久缓存
     * @param key
     */
    get(key: string) {
      let json = <string>window.localStorage.getItem(getStorageKeyInternal(key));
      return JSON.parse(json);
    },

    /**
     * 移除永久缓存
     * @param key
     */
    remove(key: string) {
      window.localStorage.removeItem(getStorageKeyInternal(key));
    },

    /**
     * 移除全部永久缓存
     */
    clear() {
      window.localStorage.clear();
    },
    getStorageKey: getStorageKeyInternal
  };

  /**
   * window.sessionStorage 浏览器临时缓存
   * @method set 设置临时缓存
   * @method get 获取临时缓存
   * @method remove 移除临时缓存
   * @method clear 移除全部临时缓存
   * @method setTokenStorage 设置token
   * @method getTokenStorage 获取token
   */
  const Session: AppStorageType = {
    /**
     * 设置临时缓存
     * @param key
     * @param val
     */
    set<T>(key: string, val: T) {
      window.sessionStorage.setItem(getStorageKeyInternal(key), JSON.stringify(val));
    },

    /**
     * 获取临时缓存
     * @param key
     */
    get(key: string) {
      let json = <string>window.sessionStorage.getItem(getStorageKeyInternal(key));
      return JSON.parse(json);
    },

    /**
     * 移除临时缓存
     * @param key
     */
    remove(key: string) {
      window.sessionStorage.removeItem(getStorageKeyInternal(key));
    },

    /**
     * 移除全部临时缓存
     */
    clear() {
      window.sessionStorage.clear();
    },

    /**
     * 设置token
     * @param val
     */
    setTokenStorage<T>(val: T) {
      this.set(__APP__TOKEN__KEY, val);
    },

    /**
     * 获取token
     */
    getTokenStorage() {
      return {
        type: this.get(__APP__TOKEN__KEY) && this.get(__APP__TOKEN__KEY)["type"],
        accessToken: this.get(__APP__TOKEN__KEY) && this.get(__APP__TOKEN__KEY)["accessToken"],
        refreshToken: this.get(__APP__TOKEN__KEY) && this.get(__APP__TOKEN__KEY)["refreshToken"]
      }
    },
    getStorageKey: getStorageKeyInternal
  };

  return {Local, Session};
}

export {
  appStorageInstaller
}
