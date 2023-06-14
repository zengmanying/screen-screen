<script setup>
import { computed, ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, DatasetComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, DatasetComponent])

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const initOptions = ref({
  renderer: 'canvas',
})

const lineOptions = {
  backgroundColor: 'transparent',
  grid: {
    containLabel: true,
    x: 0,
    y: 28,
    x2: 20,
    y2: 0,
  },
  yAxis: [
    {
      type: 'value',
      z: 0,
      axisLabel: {
        formatter: '{value}',
        fontSize: 12,
        color: '#7E89A4',
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(126, 137, 164, 0.5)',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(126, 137, 164, 0.3)',
          type: 'dashed',
        },
      },
    },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    z: 2,
    splitNumber: 5,
    axisLabel: {
      fontSize: 12,
      color: '#7E89A4',
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(126, 137, 164, 0.5)',
      },
    },
    splitLine: {
      show: false,
    },
  },
  animation: true,
  series: [
    {
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#187FE9',
        width: 3,
      },
      symbol: 'circle',
      symbolSize: 6,
      label: {
        show: true,
        fontSize: 14,
        color: '#fff',
      },
      itemStyle: {
        color: '#187FE9',
        borderWidth: 6,
        borderColor: 'rgba(24, 127, 233, 0.35)',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(24, 130, 255, 0.6)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(24, 144, 255, 0.2)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
      },
    },
  ],
}

const openOptions = computed(() => {
  return {
    ...lineOptions,
    dataset: {
      dimensions: ['name', 'value'],
      source: props.data,
    },
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
