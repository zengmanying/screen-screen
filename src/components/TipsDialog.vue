<script setup>
import { onMounted, ref } from 'vue'
import { getTips } from '@/api/home.js'
import { useRoute } from 'vue-router'
const route = useRoute()
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:visible'])
const hideTips = () => {
  emit('update:visible', false)
}

const tipsData = ref([])
const getTipsData = async () => {
  const resp = await getTips(route.name)
  tipsData.value = resp.data
}

onMounted(() => {
  getTipsData()
})
</script>
<template>
  <div :class="['tips-modal-wrap', { show: visible }]">
    <div class="tips-modal-mask"></div>
    <div class="tips-modal">
      <div class="tips-modal-header">
        <span class="tips-modal-title">口径说明</span>
        <img
          class="tips-modal-close"
          src="@/assets/tips-modal-close.svg"
          alt=""
          @click="hideTips"
        />
      </div>
      <div class="tips-modal-content thin-scroll">
        <table>
          <tr>
            <th>序号</th>
            <th>分析指标</th>
            <th>车型</th>
            <th>主要逻辑简述</th>
            <th>计算周期</th>
            <th>更新日期</th>
          </tr>
          <tr v-for="item in tipsData" :key="item.id">
            <td>{{ item.ID }}</td>
            <td>{{ item.NAME }}</td>
            <td>{{ item.CAR_TYPE }}</td>
            <td>{{ item.DESCRIPTION }}</td>
            <td>{{ item.PERIOD }}</td>
            <td>{{ item.UPDATE_PERIOD }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.tips-modal-wrap {
  display: none;
  &.show {
    display: block;
  }
}
.tips-modal-wrap {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.tips-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  width: 1044px;
  height: 730px;
  transform: translate(-50%, -50%);
  background: url('@/assets/tips-modal.png') no-repeat;
  background-size: cover;
  padding: 40px 40px 20px;
  &-header {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 32px 32px;
  }
  &-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 22px;
    font-weight: bold;
  }
  &-close {
    width: 36px;
    margin-left: auto;
    cursor: pointer;
  }
  &-content {
    max-height: 560px;
    overflow: auto;
    padding: 0 32px 12px;
    margin-right: 24px;
    table {
      width: 100%;
    }
    th,
    td {
      text-align: center;
      height: 33px;
      padding: 4px 8px;
      box-shadow: 0 -1px 0 0 rgba(26, 98, 179, 0.6);
    }
    th {
      background: linear-gradient(
        -180deg,
        rgba(1, 32, 79, 0),
        rgba(9, 40, 86, 1)
      );
      white-space: nowrap;
    }
    td {
      color: rgba(255, 255, 255, 0.8);
      background: linear-gradient(
        -180deg,
        rgba(0, 26, 65, 0.5),
        rgba(0, 19, 46, 0.8)
      );
    }
  }
}

.thin-scroll::-webkit-scrollbar {
  width: 7px;
}

.thin-scroll::-webkit-scrollbar-track {
  background-color: transparent;
  border-left: 2px solid transparent;
}

.thin-scroll::-webkit-scrollbar-thumb {
  background-color: #a6a6a6;
  border-left: 2px solid transparent;
  border-radius: 7px;
}

.thin-scroll::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 255, 255, 0.2);
}
</style>
