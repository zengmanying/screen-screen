import axios from 'axios'
import cache from './cacheAdapter'

const loadEnv = () => {
  return import.meta.env
}

const { VITE_PROXY_DOMAIN_REAL } = loadEnv()

// 创建一个 axios 实例
const http = axios.create({
  baseURL: VITE_PROXY_DOMAIN_REAL, // 正式环境
  timeout: 10000, // 请求超时时间
  adapter: cache.adapter,
})

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在请求发送之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const responseData = response.data
    responseData.resultCode = '200'
    // responseData.data = JSON.parse(responseData.data)
    return responseData
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default http
