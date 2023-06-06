<script setup>
import { ref, computed, provide } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ChartThemeColor } from './config/color'
import { legend, seriesOpt, xAxis, yAxis, grid } from './config/defaultConfig'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
])

provide(THEME_KEY, 'dark')

const props = defineProps({
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
    ['bar', 'line'].includes(props.options.series[0].serieType)
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
      color: isPureColor.value
        ? ChartThemeColor.pureColors
        : ChartThemeColor.colors,
    },
    {
      legend,
      xAxis: {
        ...xAxis,
        ...{ show: isShowAxis.value },
      },
      yAxis: {
        ...yAxis,
        ...{ show: isShowAxis.value },
      },
      grid: {
        ...grid,
      },
    },
    props.options,
    {
      series:
        props.options &&
        props.options.series &&
        Array.isArray(props.options.series) &&
        props.options.series.map((series) => {
          console.log(seriesOpt[series.serieType])
          return { ...seriesOpt[series.serieType], ...series }
        }),
    },
    {
      dataset: props.dataset,
    }
  )
  console.log('chartOptions=================', options)
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
</script>
<template>
  <VChart
    ref="chart"
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
