import axios from 'axios'

// 创建一个 axios 实例
const http = axios.create({
  // baseURL: 'http://10.19.89.80:8085/mock/188', // 接口的基础路径
  baseURL: 'http://10.68.15.160:8081',
  timeout: 10000, // 请求超时时间
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
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default http
