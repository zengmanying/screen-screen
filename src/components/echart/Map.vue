<script setup>
import * as echarts from 'echarts/core'
import { computed, ref, defineProps } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart, LinesChart, EffectScatterChart } from 'echarts/charts'
import {
  DatasetComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components'
import geoCoordMap from '@/assets/mapJson/map.json'
import chinaPartJson from '@/assets/mapJson/china-part.json'
import chinaJson from '@/assets/mapJson/china.json'

use([
  CanvasRenderer,
  MapChart,
  LinesChart,
  EffectScatterChart,
  DatasetComponent,
  VisualMapComponent,
  GeoComponent,
])

echarts.registerMap('china', chinaJson)
echarts.registerMap('chinaPartJson', chinaPartJson)

const props = defineProps({
  hotData: {
    type: Array,
    default: () => [],
  },
})

const linesData = computed(() => {
  const top10Arr = props.hotData.slice(0, 10)
  const data = top10Arr.map((item) => {
    return {
      name: item.cityName,
      value: item.value,
    }
  })
  return data
})

const initOptions = ref({
  renderer: 'canvas',
})

const options = computed(() => {
  return {
    backgroundColor: 'transparent',
    visualMap: [
      {
        splitNumber: 5,
        min: 0,
        max: 30000,
        left: 'left',
        bottom: '25%',
        calculable: true,
        itemWidth: 6,
        itemHeight: 126,
        symbolSize: [0, 0], // 设置标记的大小为0，避免遮盖背景图片
        inRange: {
          color: [
            'rgba(0, 51, 128, 1)',
            'rgba(0, 85, 184, 1)',
            'rgba(56, 148, 255, 1)',
            'rgba(88, 215, 255, 1)',
            'rgba(88, 215, 255, 1)',
            'rgba(128, 255, 255, 1)',
          ],
        },
      },
    ],
    geo: [
      {
        map: 'china',
        roam: false,
        aspectScale: 0.85,
        layoutCenter: ['50%', '42%'],
        layoutSize: '90%',
        label: {
          show: true,
          color: '#fff',
        },
        itemStyle: {
          borderColor: '#2B80FF',
        },
        emphasis: {
          disabled: true,
        },
      },
      {
        type: 'map',
        map: 'chinaPartJson',
        zlevel: -1,
        aspectScale: 0.85,
        layoutCenter: ['50%', '42%'],
        layoutSize: '90%',
        roam: false,
        silent: true,
        regions: [
          {
            name: '南海诸岛',
            value: 0,
            itemStyle: { normal: { opacity: 0, label: { show: false } } },
          },
        ],
        itemStyle: {
          normal: {
            // borderColor: '#2a81fe',
            // borderWidth: 3,
            shadowColor: '#032868',
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
      },
      {
        type: 'map',
        map: 'chinaPartJson',
        zlevel: -2,
        aspectScale: 0.85,
        layoutCenter: ['50%', '42%'],
        layoutSize: '90%',
        roam: false,
        silent: true,
        regions: [
          {
            name: '南海诸岛',
            value: 0,
            itemStyle: { normal: { opacity: 0, label: { show: false } } },
          },
        ],
        itemStyle: {
          normal: {
            borderColor: '#76ffff',
            borderWidth: 0,
            shadowColor: '#76ffff',
            shadowOffsetX: 0,
            shadowOffsetY: 20,
          },
        },
      },
      {
        type: 'map',
        map: 'chinaPartJson',
        zlevel: -3,
        aspectScale: 0.85,
        layoutCenter: ['50%', '42%'],
        layoutSize: '90%',
        roam: false,
        silent: true,
        regions: [
          {
            name: '南海诸岛',
            value: 0,
            itemStyle: { normal: { opacity: 0, label: { show: false } } },
          },
        ],
        itemStyle: {
          normal: {
            borderColor: '#76ffff',
            borderWidth: 0,
            shadowColor: 'rgba(118, 255,255, .5)',
            shadowBlur: 30,
            shadowOffsetX: 0,
            shadowOffsetY: 21,
          },
        },
      },
      // {
      //   type: 'map',
      //   map: 'chinaPartJson',
      //   zlevel: -2,
      //   aspectScale: 0.85,
      //   layoutCenter: ['50%', '44%'],
      //   layoutSize: '90%',
      //   roam: false,
      //   silent: true,
      //   regions: [
      //     {
      //       name: '南海诸岛',
      //       value: 0,
      //       itemStyle: { normal: { opacity: 0, label: { show: false } } },
      //     },
      //   ],
      //   itemStyle: {
      //     normal: {
      //       borderColor: 'rgba(255,255,255,.3)',
      //       borderWidth: 2,
      //       shadowColor: 'rgba(0, 169, 253, 0.4)',
      //       shadowBlur: 20,
      //       shadowOffsetX: 0,
      //       shadowOffsetY: 2,
      //       areaColor: 'rgba(11, 47, 83, 0.3)',
      //     },
      //   },
      // },
      // {
      //   type: 'map',
      //   map: 'chinaPartJson',
      //   zlevel: -3,
      //   aspectScale: 0.85,
      //   layoutCenter: ['50%', '45%'],
      //   layoutSize: '90%',
      //   roam: false,
      //   silent: true,
      //   regions: [
      //     {
      //       name: '南海诸岛',
      //       value: 0,
      //       itemStyle: { normal: { opacity: 0, label: { show: false } } },
      //     },
      //   ],
      //   itemStyle: {
      //     normal: {
      //       borderColor: 'rgba(255,255,255,.2)',
      //       shadowColor: 'rgba(0, 169, 253, 0.4)',
      //       shadowBlur: 20,
      //       shadowOffsetX: 0,
      //       shadowOffsetY: 2,
      //       areaColor: 'rgba(11, 47, 83, 0.3)',
      //     },
      //   },
      // },
    ],
    series: [
      {
        name: 'AQI',
        type: 'map',
        map: 'china',
        zlevel: 1,
        data: props.hotData,
        geoIndex: 0,
      },
      {
        name: '飞线',
        type: 'lines',
        geoIndex: 0,
        zlevel: 2,
        effect: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(251, 190, 32, 0.2)', // 0% 处的颜色
              },
              {
                offset: 0,
                color: 'rgba(254, 228, 84, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255, 254, 253, 1)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          show: true,
          constantSpeed: 50,
          trailLength: 0.7,
        },
        lineStyle: {
          normal: {
            width: 2,
            opacity: 0.1,
            curveness: -0.2,
          },
        },
        animation: false,
        data: getLinesData(linesData.value),
      },
      {
        name: '图标',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 1,
        symbol: 'image://effect-scatter-symbol.svg',
        rippleEffect: {
          number: 1,
          period: 4,
          scale: 2,
          brushType: 'stroke',
        },
        label: {
          show: false,
        },
        symbolSize: 30,
        data: linesData.value.map(function (dataItem) {
          return {
            name: dataItem.name,
            value: geoCoordMap[dataItem.name].concat([dataItem.value.value]),
          }
        }),
      },
      {
        name: '红星',
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 1,
        symbol: 'image://star.svg',
        label: {
          show: false,
        },
        symbolSize: 24,
        data: [
          {
            name: '北京',
            value: [116.405285, 39.904989],
          },
        ],
      },
    ],
  }
})

const getLinesData = (data) => {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = geoCoordMap['北京']
    var toCoord = geoCoordMap[dataItem.name]
    if (fromCoord && toCoord) {
      res.push({
        fromName: '北京',
        toName: dataItem.name,
        coords: [fromCoord, toCoord],
        lineStyle: {
          color: 'rgba(254, 228, 84, 0.1)',
        },
      })
    }
  }
  return res
}
</script>
<template>
  <VChart
    element-loading-text="Loading..."
    class="chart"
    :autoresize="true"
    :init-options="initOptions"
    :option="options"
    :style="{ width: '100%', height: '100%' }"
    theme="dark"
  />
</template>
