import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {AppConfiguration, AppProfile, AppStorageType, AppTokenStorage} from "@/element-mage-types";
import Message from '@/utils/Message';

const apiRequestInstaller = function (appConfig: AppConfiguration, session: AppStorageType) {
  /**
   * 创建实例
   */
  const appProfile: AppProfile = appConfig?.profiles[appConfig?.active as string];
  const apiRequest: AxiosInstance = axios.create({
    baseURL: appProfile?.apiBaseUrl,
    timeout: 120000,
    headers: {'Content-Type': 'application/json;charset=utf-8'}
  });

  /**
   * 请求拦截器
   */
  apiRequest.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const tos: AppTokenStorage = session?.getTokenStorage();

        /* 设置Token */
        if (tos?.accessToken && tos?.accessToken !== '') {
          config.headers["Authorization"] = tos?.type + ' ' + tos?.accessToken;
          config.headers["Refresh-Access-Token"] = "false";
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error.message);
      }
  );

  /**
   * 响应拦截器
   */
  apiRequest.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response && response.data) {
          /* 响应数据为二进制流 */
          if (response.data instanceof ArrayBuffer) {
            return response;
          }

          /* 响应数据为json: 成功 */
          const respData: any = response.data;
          const code = respData?.code || 0;
          const status = respData?.status || 599;
          const message = respData?.msg || "无效的返回数据";
          if (code == 1) {
            return response.data;
          }

          /* 响应数据为json: 失败 */
          return Promise.reject(checkError(status, message));
        }

        return response;
      },
      (error: any) => {
        if (error.response && error.response.data) {
          const respData: any = error.response.data;
          const status = respData?.status || 599;
          return Promise.reject(checkError(status, error.message));
        }

        return Promise.reject(checkError(504, error.message));
      }
  );

  /**
   * 检查错误类型
   * @param status
   * @param msg
   */
  const checkError = (status: number, msg: string) => {
    switch (status) {
      case 401:
        Message.confirm('当前会话或授权已过期，现在重新登录吗？', '系统提示', function () {
          location.href = '#' + (appProfile.apiLoginUrl || '/login');
        });
        break;
      case 404:
        Message.error('服务或页面未找到');
        break;
      case 500:
        Message.error('<p style="margin-top: 5px;">' + msg + '</p>');
        break;
      default:
        Message.error('<p style="margin-top: 5px;">' + msg + '</p>');
    }

    return {status, msg};
  };

  return {
    ApiRequest: apiRequest
  }
}

export {
  apiRequestInstaller
}
