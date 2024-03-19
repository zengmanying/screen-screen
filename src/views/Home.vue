<script setup>
import { onMounted, onUnmounted } from 'vue'
import {} from '@/api/home'
import { updateDataInBeforeDawn, updateDataByHalfHour } from '@/utils'

const getServiceData = () => {}

onMounted(() => {
  // 初始调用所有接口数据
  getServiceData()
  // 每天凌晨更新数据
  updateDataInBeforeDawn(() => {})
  // 30分钟更新数据
  updateDataByHalfHour((segmentation) => {
    console.log(segmentation)
  })
})

onUnmounted(() => {})
</script>

<template>
  <div class="home-content">
    <aside class="left-sidelayer">左侧</aside>
    <div class="center-content">中间</div>
    <aside class="right-sidelayer">右侧</aside>
  </div>
</template>

<style scoped lang="scss">
.home-content {
  display: flex;
  width: 100%;
  height: 100%;
  .left-sidelayer,
  .right-sidelayer {
    width: 400px;
    flex-shrink: 0;
  }
  .center-content {
    position: relative;
    margin: 0 20px;
    flex: 1;
  }
}
</style>
