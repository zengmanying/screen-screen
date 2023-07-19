<template>
  <div class="current-date-time">
    <div class="current-date">{{ currentDate }}</div>
    <div class="current-time">{{ currentTime }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentDate = ref('')
const currentTime = ref('')
let intervalId = null

onMounted(() => {
  // 获取当前日期和时间
  const updateDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    currentDate.value = `${year}-${month}-${day}`
    currentTime.value = `${hours}:${minutes}:${seconds}`
  }

  updateDateTime()

  // 每秒更新一次当前日期和时间
  intervalId = setInterval(() => {
    updateDateTime()
  }, 1000)
})

// 在组件卸载时清除计时器
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
<style>
.current-date-time {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.85);
  padding-left: 32px;
  font-size: 20px;
  white-space: nowrap;
}
.current-time {
  margin-left: 12px;
}
</style>
