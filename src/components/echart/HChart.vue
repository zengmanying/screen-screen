<script setup>
import { ref, computed, provide, onMounted, nextTick } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  LinesChart,
  PictorialBarChart,
} from 'echarts/charts'
import { Scatter3DChart } from 'echarts-gl/charts'
import { Grid3DComponent } from 'echarts-gl/components'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  VisualMapComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ChartThemeColor } from './config/color'
import { legend, seriesOpt, xAxis, yAxis, grid } from './config/defaultConfig'
import { deepAssign } from '@/utils'

use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  PieChart,
  LineChart,
  ScatterChart,
  LinesChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  VisualMapComponent,
  Scatter3DChart,
  Grid3DComponent,
])

provide(THEME_KEY, 'dark')

const props = defineProps({
  refName: {
    type: String,
    default: 'chart',
  },
  options: {
    type: Object,
    default: () => {},
  },
  dataset: {
    type: Object,
    default: () => {},
  },
})

const isShowAxis = computed(
  () =>
    props.options &&
    props.options.series &&
    Array.isArray(props.options.series) &&
    props.options.series[0] &&
    ['bar', 'line', 'scatter'].includes(props.options.series[0].serieType)
)

const isPureColor = computed(
  () =>
    props.options &&
    props.options.series &&
    Array.isArray(props.options.series) &&
    props.options.series[0] &&
    ['pie', 'line'].includes(props.options.series[0].serieType)
)

const chartOptions = computed(() => {
  const options = Object.assign(
    {},
    {
      backgroundColor: 'transparent',
    },
    {
      color: props.options.color
        ? props.options.color
        : isPureColor.value
        ? ChartThemeColor.pureColors
        : ChartThemeColor.colors,
    },
    {
      tooltip: deepAssign({ show: false }, props.options.tooltip),
    },
    { title: deepAssign({}, props.options.title) },
    {
      legend: deepAssign({}, legend, props.options.legend),
    },
    {
      grid: deepAssign({}, grid, props.options.grid),
    },
    {
      yAxis:
        props.options &&
        props.options.yAxis &&
        Array.isArray(props.options.yAxis)
          ? props.options.yAxis.map((yAxisItem) => {
              return deepAssign(
                {},
                yAxis,
                { show: isShowAxis.value },
                yAxisItem
              )
            })
          : deepAssign(
              {},
              yAxis,
              { show: isShowAxis.value },
              props.options.yAxis
            ),
    },
    {
      xAxis: deepAssign(
        {},
        xAxis,
        { show: isShowAxis.value },
        props.options.xAxis
      ),
    },
    {
      series:
        props.options &&
        props.options.series &&
        Array.isArray(props.options.series) &&
        props.options.series.map((series) => {
          return deepAssign({}, seriesOpt[series.serieType], series)
        }),
    },
    {
      dataset: props.dataset,
    }
  )
  return options
})

/**
 * init options for vue-echarts
 * switch render mode between canvas and svg
 */
const initOptions = ref({
  renderer: 'canvas',
})

function handleChartClick() {
  console.log('chartClick================')
}
const kcMcCountChart = ref()
onMounted(() => {
  nextTick(() => {
    if (!kcMcCountChart.value || props.refName !== 'kcMcCountChart') return
    lunboEcharts(kcMcCountChart.value)
  })
})

//轮播tootip
let timer = null
const lunboEcharts = (echartsId) => {
  clearInterval(timer) //清除定时器，防止轮播出现混乱
  var currentIndex = -1
  timer = setInterval(() => {
    var dataLen = props.dataset.source.length
    // echartsId.dispatchAction({
    //   type: 'downplay',
    //   seriesIndex: 3,
    //   dataIndex: currentIndex,
    // })
    currentIndex = (currentIndex + 1) % dataLen
    // echartsId.dispatchAction({
    //   type: 'highlight',
    //   seriesIndex: 3,
    //   dataIndex: currentIndex,
    // })
    echartsId.dispatchAction({
      type: 'showTip',
      seriesIndex: 3,
      dataIndex: currentIndex,
      position: 'top',
    })
  }, 3000)
}
</script>
<template>
  <VChart
    :ref="refName"
    element-loading-text="Loading..."
    class="chart"
    :autoresize="true"
    :init-options="initOptions"
    :option="chartOptions"
    theme="dark"
    :style="{ width: '100%', height: '100%' }"
    @click="handleChartClick"
  />
</template>
<style lang="scss" scoped></style>
