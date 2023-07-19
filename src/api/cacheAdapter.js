import { setupCache } from 'axios-cache-adapter'

// 创建缓存适配器实例
const cache = setupCache({
  maxAge: 12 * 60 * 60 * 1000, // 缓存有效期为 12 小时
  exclude: {
    // {Array} List of regular expressions to match against request URLs.
    methods: ['get', 'post', 'patch', 'put', 'delete'],
  },
})

// 获取缓存存储对象
const cacheStorage = cache.store._store

// 打印缓存键名列表
if (cacheStorage) {
  console.log(Object.keys(cacheStorage))
}

export default cache
