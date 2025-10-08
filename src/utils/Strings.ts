const Strings = {
  /**
   * 获取字符串中的查询参数
   * @param str 目标字符串
   */
  getQueryParams(str: string) {
    const result: Record<string, string> = {};
    if (str && str.indexOf("?") >= 0) {
      const query = str.substring(str.indexOf("?") + 1);
      const params = query.split("&");
      params.forEach(param => {
        const parts = param.split("=");
        const key = parts[0] || "";
        const value = parts[1] || "";
        if (key) {
          result[key] = decodeURIComponent(value || "");
        }
      });
    }
    return result;
  },

  /**
   * 获取url字符串中的查询参数
   */
  getUrlParams() {
    if (typeof window !== 'undefined') {
      return this.getQueryParams(window.location.href);
    }
    return {};
  },

  /**
   * 驼峰转连接号
   * @param str
   */
  camelToMinus(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}

export default Strings;
