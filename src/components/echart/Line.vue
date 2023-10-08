<script setup>
import { ref, defineProps } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, LinesChart } from 'echarts/charts'
import { GridComponent, DatasetComponent } from 'echarts/components'
import { smoothLine } from '@/utils'

use([CanvasRenderer, LineChart, LinesChart, GridComponent, DatasetComponent])

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const initOptions = ref({
  renderer: 'canvas',
})
const lineArrData = props.data.map((item, idx) => [
  idx + 1,
  Object.values(item)[1],
  Object.values(item)[0],
])
const lineData = smoothLine(lineArrData)
const coordsData = [
  {
    coords: [],
  },
]

for (var i = 0; i < lineData.length; i++) {
  coordsData[0].coords.push([lineData[i][0], lineData[i][1]])
}

// const datacoords = computed(() => {
//   return props.data.map((item) => [item.name, item.value])
// })

const lineOptions = {
  backgroundColor: 'transparent',
  grid: {
    containLabel: true,
    left: 21,
    top: 28,
    right: 15,
    bottom: 12,
  },
  yAxis: {
    name: '数量(辆)',
    nameTextStyle: {
      padding: [0, 0, 0, -80],
    },
    splitNumber: 4,
    z: 0,
    axisLabel: {
      formatter: '{value}',
      fontSize: 12,
      color: '#7E89A4',
      padding: [0, 12, 0, 0],
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
  xAxis: {
    min: 1,
    minInterval: 1,
    axisLabel: {
      fontSize: 12,
      color: '#7E89A4',
      formatter: (params) => {
        return lineArrData[params - 1][2]
      },
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
  series: [
    {
      type: 'line',
      lineStyle: {
        color: 'rgba(24, 127, 233, 0.55)',
        width: 2,
      },
      symbol: 'circle',
      symbolSize: (value, params) => {
        return [1, 2, 3, 4, 5, 6].includes(params.value[0]) ? 6 : 0
      },
      showAllSymbol: false,
      label: {
        show: true,
        fontSize: 12,
        color: '#fff',
        formatter: (params) => {
          return [1, 2, 3, 4, 5, 6].includes(params.value[0])
            ? params.value[1]
            : ''
        },
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
      data: lineData,
    },
    {
      name: '',
      type: 'lines',
      coordinateSystem: 'cartesian2d',
      zlevel: 2,
      polyline: true,
      symbol: 'circle',
      effect: {
        show: true,
        trailLength: 0.5,
        symbol: 'circle',
        period: 4, //光点滑动速度
        symbolSize: 4,
      },
      lineStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(153, 237, 255, 1)', // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: 'rgba(80, 223, 255, 1)', // 100% 处的颜色
            },
            {
              offset: 0.8,
              color: 'rgba(33, 148, 255, 1)', // 100% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(24, 127, 233, 0)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        width: 0,
        opacity: 0,
        curveness: 0,
      },
      animation: false,
      data: coordsData,
    },
  ],
}

console.log(lineOptions)

// const openOptions = computed(() => {
//   return {
//     ...lineOptions,
//     dataset: {
//       dimensions: ['name', 'value', 'coord'],
//       source: props.data,
//     },
//   }
// })
</script>
<template>
  <VChart
    element-loading-text="Loading..."
    class="chart"
    :autoresize="true"
    :init-options="initOptions"
    :option="lineOptions"
    :style="{ width: '100%', height: '100%' }"
    theme="dark"
  />
</template>
