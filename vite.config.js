import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'

// 路径查找
const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

// 设置别名
const alias = {
  '@': pathResolve('src'),
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [vue(), eslintPlugin()],
  build: {
    // 清除console和debugger
    minify: 'terser', // 使用terserOptions需要配置
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
