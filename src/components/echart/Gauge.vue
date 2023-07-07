<script setup>
import { computed, ref, defineProps } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import { DatasetComponent } from 'echarts/components'

use([CanvasRenderer, GaugeChart, DatasetComponent])

const props = defineProps({
  color: {
    type: String,
    default: '#6975F3',
  },
  data: {
    type: Array,
    default: () => [],
  },
})

const initOptions = ref({
  renderer: 'canvas',
})

const options = {
  backgroundColor: 'transparent',
  animation: true,
  series: [
    {
      name: '内部进度条',
      type: 'gauge',
      radius: '100%',
      splitNumber: 5,
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        lineStyle: {
          color: [
            [props.data[0].value / 100, props.color],
            [1, '#111F42'],
          ],
          width: 10,
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      itemStyle: {
        show: false,
      },
      detail: {
        formatter: function (value) {
          if (value !== 0) {
            return value.toFixed(2) + '%'
          } else {
            return 0 + '%'
          }
        },
        offsetCenter: [0, 50], // x, y，单位px
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
          fontSize: 14, //表盘上的标题文字大小
          fontWeight: 600,
          width: 72,
          height: 26,
          borderRadius: 20,
          padding: 0,
          backgroundColor: props.color,
        },
      },
      title: {
        //标题
        show: true,
        offsetCenter: [0, 25],
        textStyle: {
          padding: 0,
          fontSize: 12,
          color: 'rgba(255,255,255,0.85)',
        },
      },
      data: props.data,
      pointer: {
        show: true,
        length: '55%',
        radius: '0',
        width: 3, //指针粗细
        itemStyle: {
          color: props.color,
        },
      },
      animationDuration: 1000,
    },
    {
      name: '外部刻度',
      type: 'gauge',
      radius: '100%',
      min: 0, //最小刻度
      max: 100, //最大刻度
      splitNumber: 5, //刻度数量
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: [[1, 'rgba(0,0,0,0)']],
        },
      }, //仪表盘轴线
      axisLabel: {
        show: true,
        color: 'rgba(255, 255, 255, 0.85)',
        distance: 8,
        fontSize: 10,
      }, //刻度标签。
      axisTick: {
        show: true,
        splitNumber: 10,
        lineStyle: {
          color: 'rgba(115, 138, 164, 0.6)',
          width: 1,
        },
        length: 4,
      }, //刻度样式
      splitLine: {
        show: true,
        length: 8,
        lineStyle: {
          color: '#4D6480',
        },
      }, //分隔线样式
      detail: {
        show: false,
      },
      pointer: {
        show: false,
      },
    },
  ],
}

const openOptions = computed(() => {
  return {
    ...options,
  }
})
</script>
<template>
  <VChart
    element-loading-text="Loading..."
    class="chart"
    :autoresize="true"
    :init-options="initOptions"
    :option="openOptions"
    :style="{ width: '100%', height: '100%' }"
    theme="dark"
  />
</template>
