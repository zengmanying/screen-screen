<script setup>
import { computed, ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, DatasetComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, GridComponent, DatasetComponent])

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
              color: '#1ee7e7', // 100% 处的颜色
            },
            {
              offset: 0.09,
              color: '#1ee7e7', // 100% 处的颜色
            },
            {
              offset: 0.1,
              color: 'rgba(24, 144, 255, 0.35)', // 0% 处的颜色
            },
            {
              offset: 0.9,
              color: 'rgba(24, 130, 255, 1)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        shadowColor: '#1EE7E7',
      },
    },
  ],
}

const openOptions = computed(() => {
  return {
    ...lineOptions,
    dataset: {
      dimensions: ['name', 'value'],
      source: [
        {
          name: '1月',
          value: 521,
        },
        {
          name: '2月',
          value: 895,
        },
        {
          name: '3月',
          value: 623,
        },
        {
          name: '4月',
          value: 1435,
        },
        {
          name: '5月',
          value: 1386,
        },
        {
          name: '6月',
          value: 712,
        },
        {
          name: '7月',
          value: 521,
        },
        {
          name: '8月',
          value: 895,
        },
        {
          name: '9月',
          value: 623,
        },
        {
          name: '10月',
          value: 1435,
        },
        {
          name: '11月',
          value: 1386,
        },
        {
          name: '12月',
          value: 712,
        },
      ],
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
