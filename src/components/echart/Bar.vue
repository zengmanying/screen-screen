<script setup>
import { computed, ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, ScatterChart } from 'echarts/charts'
import { GridComponent, DatasetComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, ScatterChart, GridComponent, DatasetComponent])

const initOptions = ref({
  renderer: 'canvas',
})

const lineOptions = {
  backgroundColor: 'transparent',
  grid: {
    containLabel: true,
    x: 0,
    y: 25,
    x2: 15,
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
        show: false,
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
    boundaryGap: true,
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
      type: 'bar',
      smooth: true,
      barWidth: 16,
      label: {
        show: true,
        fontSize: 14,
        color: '#fff',
        position: 'top',
      },
      showBackground: true,
      backgroundStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(195, 226, 255, 0.1)', // 100% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(195, 226, 255, 0)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(24, 144, 255, 0.35)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(24, 130, 255, 1)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    {
      name: 'Object',
      type: 'scatter',
      symbol: 'rect',
      silent: true,
      itemStyle: {
        normal: {
          color: '#1ee7e7',
        },
      },
      symbolSize: [16, 5],
      symbolOffset: [0, 0],
      z: 20,
    },
  ],
}

const data = [
  {
    name: '0-5',
    value: 521,
  },
  {
    name: '5-10',
    value: 895,
  },
  {
    name: '10-15',
    value: 623,
  },
  {
    name: '15-20',
    value: 1435,
    symbol: 100,
  },
  {
    name: '20-25',
    value: 1386,
  },
  {
    name: '25-30',
    value: 712,
  },
  {
    name: '30-35',
    value: 521,
  },
  {
    name: '35-40',
    value: 895,
  },
  {
    name: '40-45',
    value: 623,
  },
  {
    name: '45-50',
    value: 1435,
  },
  {
    name: '50-55',
    value: 1386,
  },
  {
    name: '55-60',
    value: 712,
  },
  {
    name: '60~∞',
    value: 712,
  },
]

const hasSymbolData = computed(() => {
  let arr = []
  data.forEach((item) => {
    arr.push({
      name: item.name,
      value: item.value,
      symbol: item.value,
    })
  })
  return arr
})

const openOptions = computed(() => {
  return {
    ...lineOptions,
    dataset: {
      dimensions: ['name', 'value', 'symbol'],
      source: hasSymbolData.value,
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
