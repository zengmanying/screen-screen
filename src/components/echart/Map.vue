<script setup>
import * as echarts from 'echarts/core'
import { computed, ref } from 'vue'
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

const linesData = {
  name: '北京',
  value: [
    [
      {
        name: '北京',
      },
      {
        name: '北京',
        value: 200,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '青岛',
        value: 200,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '广州',
        value: 90,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '昆明',
        value: 90,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '南京',
        value: 90,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '石家庄',
        value: 90,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '成都',
        value: 90,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '合肥',
        value: 90,
      },
    ],
    [
      {
        name: '北京',
      },
      {
        name: '西安',
        value: 90,
      },
    ],
  ],
}

const chartData = [
  { name: '台湾', value: 45 },
  { name: '新疆', value: 76 },
  { name: '宁夏', value: 75 },
  { name: '青海', value: 18 },
  { name: '甘肃', value: 124 },
  { name: '陕西', value: 245 },
  { name: '西藏', value: 1 },
  { name: '云南', value: 174 },
  { name: '贵州', value: 146 },
  { name: '四川', value: 539 },
  { name: '重庆', value: 576 },
  { name: '海南', value: 168 },
  { name: '广西', value: 5252 },
  { name: '广东', value: 5352 },
  { name: '湖南', value: 4018 },
  { name: '湖北', value: 743 },
  { name: '河南', value: 1272 },
  { name: '山东', value: 758 },
  { name: '江西', value: 2935 },
  { name: '福建', value: 5296 },
  { name: '安徽', value: 990 },
  { name: '浙江', value: 5215 },
  { name: '江苏', value: 631 },
  { name: '上海', value: 342 },
  { name: '黑龙江', value: 481 },
  { name: '吉林', value: 93 },
  { name: '辽宁', value: 125 },
  { name: '内蒙古', value: 675 },
  { name: '山西', value: 133 },
  { name: '河北', value: 318 },
  { name: '天津', value: 136 },
  { name: '北京', value: 428 },
]

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
        max: 10000,
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
          borderColor: 'rgba(189, 219, 255, 0.5)',
          shadowColor: 'rgba(0, 169, 253, 0.4)',
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowOffsetY: 2,
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
            borderColor: 'rgba(255,255,255,.8)',
            borderWidth: 5,
            shadowColor: 'rgba(0, 169, 253, 0.4)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 2,
          },
        },
      },
      {
        type: 'map',
        map: 'chinaPartJson',
        zlevel: -2,
        aspectScale: 0.85,
        layoutCenter: ['50%', '44%'],
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
            borderColor: 'rgba(255,255,255,.3)',
            borderWidth: 2,
            shadowColor: 'rgba(0, 169, 253, 0.4)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 2,
            areaColor: 'rgba(11, 47, 83, 0.3)',
          },
        },
      },
      {
        type: 'map',
        map: 'chinaPartJson',
        zlevel: -3,
        aspectScale: 0.85,
        layoutCenter: ['50%', '45%'],
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
            borderColor: 'rgba(255,255,255,.2)',
            shadowColor: 'rgba(0, 169, 253, 0.4)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 2,
            areaColor: 'rgba(11, 47, 83, 0.3)',
          },
        },
      },
    ],
    series: [
      {
        name: 'AQI',
        type: 'map',
        map: 'china',
        zlevel: 1,
        data: chartData,
        geoIndex: 0,
      },
      {
        name: linesData.name,
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
        data: getLinesData(linesData.value),
      },
      {
        name: linesData.name,
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
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
          }
        }),
      },
    ],
  }
})

const getLinesData = (data) => {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = geoCoordMap[dataItem[0].name]
    var toCoord = geoCoordMap[dataItem[1].name]
    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[0].name,
        toName: dataItem[1].name,
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
