import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      // 请求拦截时，把 token 放到 headers 里面
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default hyRequest
