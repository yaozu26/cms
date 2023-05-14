import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { localCached } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 在用户进行接口拦截中携带token
    requestSuccessFn(config) {
      const token = localCached.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default hyRequest
