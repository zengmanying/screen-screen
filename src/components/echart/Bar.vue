<script setup>
import { computed, ref, defineProps } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, ScatterChart, PictorialBarChart } from 'echarts/charts'
import { GridComponent, DatasetComponent } from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  ScatterChart,
  PictorialBarChart,
  GridComponent,
  DatasetComponent,
])

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
    y: 30,
    x2: 85,
    y2: 0,
  },
  yAxis: [
    {
      type: 'value',
      name: '数量(辆)',
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
    name: '里程(万公里)',
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
        fontSize: 12,
        color: '#fff',
        position: 'top',
      },
      // showBackground: true,
      // backgroundStyle: {
      //   color: {
      //     type: 'linear',
      //     x: 0,
      //     y: 0,
      //     x2: 0,
      //     y2: 1,
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: 'rgba(195, 226, 255, 0.1)', // 100% 处的颜色
      //       },
      //       {
      //         offset: 1,
      //         color: 'rgba(195, 226, 255, 0)', // 100% 处的颜色
      //       },
      //     ],
      //     global: false, // 缺省为 false
      //   },
      // },
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
              color: 'rgba(28, 84, 165, 1)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(97, 182, 230, 1)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    {
      type: 'pictorialBar',
      barMaxWidth: '20',
      symbol: 'diamond',
      symbolOffset: [0, '50%'],
      symbolSize: [16, 8],
      zlevel: 2,
      itemStyle: {
        color: 'rgba(97, 182, 230, 1)',
      },
    },
    {
      type: 'pictorialBar',
      barMaxWidth: '20',
      symbolPosition: 'end',
      symbol: 'diamond',
      symbolOffset: [0, '-50%'],
      symbolSize: [16, 8],
      zlevel: 2,
      itemStyle: {
        color: '#1EE7E7',
      },
    },
    // {
    //   name: 'Object',
    //   type: 'scatter',
    //   symbol: 'rect',
    //   silent: true,
    //   itemStyle: {
    //     normal: {
    //       color: '#1ee7e7',
    //     },
    //   },
    //   symbolSize: [16, 5],
    //   symbolOffset: [0, 0],
    //   z: 20,
    // },
  ],
}

const hasSymbolData = computed(() => {
  let arr = []
  props.data.forEach((item) => {
    arr.push({
      name: item.name,
      value: item.value,
      diamond: 1,
      symbol: item.value,
    })
  })
  return arr
})

const openOptions = computed(() => {
  return {
    ...lineOptions,
    dataset: {
      dimensions: ['name', 'value', 'diamond', 'symbol'],
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
