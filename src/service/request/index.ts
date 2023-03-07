import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface HYInstanceInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInstanceInterceptors<T>
}

class HYRequest {
  instance: AxiosInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // window.console.log('全局请求成功拦截')
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // window.console.log('全局响应成功拦截')
        return res.data
      },
      (err) => {
        // window.console.log('全局响应失败拦截')
        return err
      }
    )

    // 实例的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )
  }

  request<T = any>(config: HYRequestConfig<T>) {
    if (config.interceptors?.requestInterceptor)
      config = config.interceptors.requestInterceptor(config)

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor)
            res = config.interceptors.responseInterceptor(res)

          resolve(res)
        })
        .catch((err: any) => {
          if (config.interceptors?.responseInterceptorCatch)
            err = config.interceptors.responseInterceptorCatch(err)

          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
