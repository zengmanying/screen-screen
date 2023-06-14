<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { xAxis, yAxis, legend } from '../components/echart/config/defaultConfig'
import HChart from '../components/echart/HChart.vue'
import CreateChartThemeColor from '../components/echart/config/color'
import VChart from 'vue-echarts'
import { Carousel } from 'ant-design-vue'
import '../assets/ant-carousel.css'
onBeforeMount(() => {
  CreateChartThemeColor()
})
onMounted(() => {
  getSeries(effectDTOList)
})
const barAndLineOptions = {
  legend: {
    top: 'auto',
    bottom: 6,
    left: 'center',
  },
  grid: {
    top: 30,
    right: 60,
    bottom: 80,
    left: 60,
  },
  yAxis: [
    {
      name: '2023',
      type: 'value',
      gridIndex: 0,
      position: 'left',
      offset: 0,
    },
    {
      name: '',
      type: 'value',
      gridIndex: 0,
      axisLabel: {
        formatter: function (value) {
          return value * 100 + '%'
        },
      },
      position: 'right',
      offset: 0,
    },
  ],
}
// 市场车辆识别率
const recognitionRateSeries = [
  {
    name: '新增预警车辆',
    serieType: 'bar',
    yAxisIndex: 0,
  },
  {
    name: '历史预警车辆',
    serieType: 'bar',
    yAxisIndex: 0,
  },
  {
    name: '累计市场车辆识别率',
    serieType: 'lineNoArea',
    yAxisIndex: 1,
    smooth: true,
    itemStyle: {
      color: 'rgba(31, 69, 99, 1)',
      borderWidth: 2,
      borderColor: 'rgba(254, 219, 150, 1)',
    },
    lineStyle: {
      color: 'rgba(254, 219, 150, 1)',
    },
  },
  {
    name: '新增市场车辆识别率',
    serieType: 'lineNoArea',
    yAxisIndex: 1,
    smooth: true,
    itemStyle: {
      color: 'rgba(31, 69, 99, 1)',
      borderWidth: 2,
      borderColor: 'rgba(186, 231, 255, 1)',
    },
    lineStyle: {
      color: 'rgba(186, 231, 255, 1)',
    },
  },
]
const recognitionRateOpt = computed(() => {
  return { ...barAndLineOptions, ...{ series: recognitionRateSeries } }
})
const recognitionRateDataset = ref({
  source: [
    {
      name: '1月',
      newCar: 823,
      historyCar: 1000,
      totalRate: 0.5,
      newRate: 0.8,
    },
    {
      name: '2月',
      newCar: 823,
      historyCar: 1200,
      totalRate: 0.6,
      newRate: 0.8,
    },
    {
      name: '3月',
      newCar: 2200,
      historyCar: 1800,
      totalRate: 0.7,
      newRate: 0.8,
    },
    {
      name: '4月',
      newCar: 823,
      historyCar: 1400,
      totalRate: 0.9,
      newRate: 0.5,
    },
    {
      name: '5月',
      newCar: 1500,
      historyCar: 1600,
      totalRate: 0.8,
      newRate: 0.6,
    },
  ],
})
// 预警车辆检出率/准确率统计
const accuracyRateSeries = [
  {
    name: '预警车辆总数',
    serieType: 'bar',
    yAxisIndex: 0,
    barWidth: 6,
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
            color: 'rgba(254, 219, 150, 1)', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(254, 219, 150, 0.35)', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    },
  },
  {
    name: '维修车辆总数',
    serieType: 'bar',
    yAxisIndex: 0,
    barWidth: 6,
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
            color: 'rgba(120, 101, 241, 1)', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(120, 101, 241, 0.35)', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    },
  },
  {
    name: '维修清单中预警车辆数',
    serieType: 'bar',
    yAxisIndex: 0,
    barWidth: 6,
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
            color: 'rgba(186, 231, 255, 1)', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(186, 231, 255, 0.35)', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    },
  },
  {
    name: '检出率',
    serieType: 'lineNoArea',
    yAxisIndex: 1,
    smooth: true,
    itemStyle: {
      color: 'rgba(31, 69, 99, 1)',
      borderWidth: 2,
      borderColor: 'rgba(30, 231, 231, 1)',
    },
    lineStyle: {
      color: 'rgba(30, 231, 231, 1)',
    },
  },
  {
    name: '准确率',
    serieType: 'lineNoArea',
    yAxisIndex: 1,
    smooth: true,
    itemStyle: {
      color: 'rgba(31, 69, 99, 1)',
      borderWidth: 2,
      borderColor: 'rgba(233, 131, 227, 1)',
    },
    lineStyle: {
      color: 'rgba(233, 131, 227, 1)',
    },
  },
]

const accuracyRateDataset = ref({
  source: [
    {
      name: '1月',
      waringRepairCar: 823,
      totalCar: 1000,
      underRepairCar: 400,
      detectionRate: 0.5,
      accuracyRate: 0.8,
    },
    {
      name: '2月',
      waringRepairCar: 823,
      totalCar: 1200,
      underRepairCar: 800,
      detectionRate: 0.6,
      accuracyRate: 0.8,
    },
    {
      name: '3月',
      waringRepairCar: 2200,
      totalCar: 1800,
      underRepairCar: 900,
      detectionRate: 0.7,
      accuracyRate: 0.8,
    },
    {
      name: '4月',
      waringRepairCar: 823,
      totalCar: 1400,
      underRepairCar: 1000,
      detectionRate: 0.9,
      accuracyRate: 0.5,
    },
    {
      name: '5月',
      waringRepairCar: 1500,
      totalCar: 1600,
      underRepairCar: 1200,
      detectionRate: 0.8,
      accuracyRate: 0.6,
    },
  ],
})

const accuracyRateOpt = computed(() => {
  return { ...barAndLineOptions, ...{ series: accuracyRateSeries } }
})

// 预警车辆风险等级分布
const roseOptions = ref({
  legend: {
    icon: 'circle',
    bottom: '10%',
    top: 'auto',
    left: 'center',
  },
  series: [
    {
      name: '风险等级',
      serieType: 'pie',
      center: ['50%', '40%'],
      roseType: 'radius',
    },
  ],
})

const riskLevelDataset = ref({
  source: [
    {
      name: '低风险',
      value: 323,
    },
    {
      name: '中风险',
      value: 723,
    },
    {
      name: '高风险',
      value: 523,
    },
  ],
})

// 各项目预警车辆数量分布
const getCarNumOptions = (
  barColor1 = 'rgba(24, 130, 255, 1)',
  barColor2 = 'rgba(24, 144, 255, 0.35)',
  scatterColor = '#187FE9'
) => {
  return {
    grid: {
      containLabel: true,
      top: 40,
      left: 20,
      right: 40,
      bottom: 35,
    },
    legend: {
      show: false,
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    xAxis: {
      type: 'value',
      position: 'top',
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(126, 137, 164, 0.3)',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(126, 137, 164, 0.3)',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '预警车辆数量',
        serieType: 'bar',
        yAxisIndex: 0,
        barWidth: 6,
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          fontSize: 12,
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: barColor1, // 0% 处的颜色
              },
              {
                offset: 1,
                color: barColor2, // 100% 处的颜色
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
            color: scatterColor,
          },
        },
        symbolSize: [3, 6],
        symbolOffset: [0, 0],
        z: 20,
      },
    ],
  }
}

const carNumDataset = ref({
  dimensions: ['name', 'value', 'symbol'],
  source: [
    {
      name: '项目001',
      value: 823,
      symbol: 823,
    },
    {
      name: '项目002',
      value: 723,
      symbol: 723,
    },
    {
      name: '项目003',
      value: 523,
      symbol: 523,
    },
    {
      name: '项目004',
      value: 823,
      symbol: 823,
    },
    {
      name: '项目005',
      value: 723,
      symbol: 723,
    },
    {
      name: '项目006',
      value: 523,
      symbol: 523,
    },
    {
      name: '项目007',
      value: 823,
      symbol: 823,
    },
    {
      name: '项目008',
      value: 723,
      symbol: 723,
    },
    {
      name: '项目009',
      value: 523,
      symbol: 523,
    },
  ],
})

// 各算法预警车辆数量分布
const carAlgorithmDataset = ref({
  dimensions: ['name', 'value', 'symbol'],
  source: [
    {
      name: '40℃过温时长',
      value: 823,
      symbol: 823,
    },
    {
      name: '45℃过温时长',
      value: 723,
      symbol: 723,
    },
    {
      name: '电池温度过高',
      value: 823,
      symbol: 823,
    },
    {
      name: '温度跳变',
      value: 723,
      symbol: 723,
    },
    {
      name: '温差离散',
      value: 523,
      symbol: 523,
    },
    {
      name: '压差预警',
      value: 823,
      symbol: 823,
    },
    {
      name: 'ΔSOC绝对值',
      value: 723,
      symbol: 723,
    },
    {
      name: 'ΔSOC变化率',
      value: 523,
      symbol: 523,
    },
    {
      name: '压差一致性',
      value: 523,
      symbol: 523,
    },
  ],
})

//预警车辆里程分布
const carMileageDataset = ref({
  source: [
    {
      name: '[0-5]',
      value: 823,
    },
    {
      name: '(5-10]',
      value: 723,
    },
    {
      name: '(10-15]',
      value: 523,
    },
    {
      name: '(15-20]',
      value: 823,
    },
    {
      name: '(20-30]',
      value: 723,
    },
    {
      name: '30以上',
      value: 523,
    },
  ],
})

// 过温时长及占比
var effectDTOList = [
  {
    name: '[0,20)',
    count: 100,
    status: 0,
  },
  {
    name: '[20,40)',
    count: 50,
    status: 0,
  },
  {
    name: '[40,60)',
    count: 100,
    status: 0,
  },
  {
    name: '[60,80)',
    count: 140,
    status: 0,
  },
  {
    name: '[80,100)',
    count: 105,
    status: 0,
  },
  {
    name: '[100,120)',
    count: 150,
    status: 1,
  },
  {
    name: '[120,140)',
    count: 220,
    status: 1,
  },
  {
    name: '[140,160)',
    count: 150,
    status: 1,
  },
  {
    name: '[160,180)',
    count: 80,
    status: 1,
  },
  {
    name: '[180,200)',
    count: 100,
    status: 2,
  },
  {
    name: '[200,220)',
    count: 160,
    status: 2,
  },
  {
    name: '[220,240)',
    count: 180,
    status: 2,
  },
  {
    name: '[240,260)',
    count: 120,
    status: 3,
  },
  {
    name: '[260,280)',
    count: 100,
    status: 3,
  },
  {
    name: '[280,∞)',
    count: 100,
    status: 3,
  },
]
let effectDTOSeries = ref([])
let effectDTOXAxis = ref([])

const lineAreaOptions = computed(() => {
  return {
    grid: {
      top: 10,
      bottom: 50,
      left: 50,
      right: 0,
    },
    xAxis: {
      axisLabel: {
        rotate: 35,
      },
      position: 'bottom',
      data: effectDTOXAxis.value,
    },
    series: effectDTOSeries.value,
  }
})
const getSeries = (httpData) => {
  let data = []
  let seriesItem
  var st = httpData[0].status
  for (var i = 0; i < httpData.length; i++) {
    var name = httpData[i].name
    effectDTOXAxis.value.push(name)
    data.push([name, httpData[i].count])
    if (st != httpData[i].status || i == httpData.length - 1) {
      let areaColor = ''
      let lineColor = ''
      switch (st) {
        case 0:
          areaColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(30, 231, 231, .36)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(30, 231, 231, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          }
          lineColor = 'rgba(30, 231, 231, 1)'
          break
        case 1:
          areaColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(220, 209, 151, .36)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(220, 209, 151, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          }
          lineColor = 'rgba(220, 209, 151, 1)'
          break
        case 2:
          areaColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(245, 163, 88, .36)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(245, 163, 88, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          }
          lineColor = 'rgba(245, 163, 88, 1)'
          break
        case 3:
          areaColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(241, 98, 88, .36)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(241, 98, 88, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          }
          lineColor = 'rgba(241, 98, 88, 1)'
      }
      seriesItem = {
        name: '',
        serieType: 'line',
        data: data,
        areaStyle: {
          color: areaColor,
          opacity: 1,
        },
        lineStyle: {
          width: 2,
          color: lineColor,
        },
      }
      effectDTOSeries.value.push(seriesItem)
      data = [[name, httpData[i].count]]
      st = httpData[i].status
    }
  }
}
// 工况预警展示
const scatter3dOptions = {
  legend: {
    ...legend,
    ...{
      bottom: 0,
      top: 'auto',
      left: 'center',
      selectedMode: false,
    },
  },
  visualMap: {
    show: false,
    max: 1,
    type: 'piecewise',
    splitNumber: 3,
    inRange: {
      color: ['#1EE7E7', '#187FE9', '#F16258'],
    },
    dimension: 2,
    orient: 'horizontal',
    textStyle: {
      color: '#fff',
    },
    left: 'center',
    bottom: 0,
  },
  grid3D: {
    axisPointer: {
      show: false,
    },
    left: 10,
    right: 0,
    top: 'auto',
    bottom: 40,
    viewControl: {
      alpha: 5,
      beta: 37,
    },
  },
  xAxis3D: {
    ...xAxis,
    ...{
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(126, 137, 164, 0.5)',
          width: 1,
        },
      },
      axisLabel: {
        color: 'rgba(126, 137, 164, 1)',
        fontSize: 12,
        margin: 12,
      },
    },
  },
  yAxis3D: yAxis,
  zAxis3D: {
    ...yAxis,
    ...{
      axisLabel: {
        color: 'rgba(126, 137, 164, 1)',
        fontSize: 12,
        margin: 16,
      },
    },
  },
  series: [
    {
      type: 'scatter3D',
      name: '高风险',
      symbolSize: 8,
      itemStyle: {
        opacity: 1,
        color: 'rgba(241, 98, 88, 1)',
      },
    },
    {
      type: 'scatter3D',
      name: '中风险',
      symbolSize: 8,
      itemStyle: {
        opacity: 1,
        color: 'rgba(24, 127, 233, 1)',
      },
    },
    {
      type: 'scatter3D',
      symbolSize: 8,
      name: '低风险',
      itemStyle: {
        opacity: 1,
        color: 'rgba(30, 231, 231, 1)',
      },
    },
  ],
  dataset: {
    source: [
      [0, -20, 1],
      [-10, 0, 0.5],
      [-20, 10, 0.2],
      [10, 20, 0.6],
      [4, 80, 0.7],
      [-1, 0, 0.5],
      [-18, 10, 0.5],
      [10, 10, 0.9],
    ],
  },
}

// SOH分布
const scatterOptions = ref({
  grid: {
    right: 0,
    top: 50,
    bottom: 66,
  },
  legend: {
    top: 'auto',
    bottom: 0,
    left: 'center',
  },
  yAxis: {
    name: '里程表(万公里)',
  },
  series: [
    {
      name: 'SOH电池容量百分比',
      serieType: 'scatter',
      symbol: 'image://scatter-symbol.svg',
    },
  ],
})
const sohDataset = ref({
  source: [
    [5, 323],
    [5, 167],
    [5, 284],
    [10, 413],
    [13, 217],
    [20, 587],
    [35, 487],
    [50, 287],
  ],
})
</script>
<template>
  <div class="battery-content">
    <aside class="left-sidelayer">
      <div class="early-waring">
        <div class="early-waring-header">
          <img src="../assets/battery/early-warning-title.svg" alt="" />
        </div>
        <section class="car-num">
          <div class="car-num-content">
            预警算法应用总数<span class="car-num-count">51</span>个
          </div>
        </section>
      </div>
      <div class="card car-recognition-rate">
        <div class="card-header">
          <span class="card-title">市场车辆识别率</span>
        </div>
        <div class="card-body">
          <HChart
            :options="recognitionRateOpt"
            :dataset="recognitionRateDataset"
          ></HChart>
        </div>
      </div>
      <div class="card car-accuracy-rate">
        <div class="card-header">
          <span class="card-title">预警车辆检出率/准确率统计</span>
        </div>
        <div class="card-body">
          <HChart
            :options="accuracyRateOpt"
            :dataset="accuracyRateDataset"
          ></HChart>
        </div>
      </div>
    </aside>
    <div class="right-layer">
      <div class="right-top-container">
        <div class="right-top-title">
          <img src="../assets/battery/multi-warning-title.svg" alt="" />
        </div>
        <div class="right-top-content">
          <div class="card car-risk-level">
            <div class="card-header">
              <span class="card-title">预警车辆风险等级分布</span>
            </div>
            <div class="card-body">
              <HChart
                :options="roseOptions"
                :dataset="riskLevelDataset"
                class="roseChart"
              ></HChart>
            </div>
          </div>
          <div class="card car-num-spread">
            <div class="card-header">
              <span class="card-title">各项目预警车辆数量分布</span>
            </div>
            <div class="card-body">
              <Carousel autoplay>
                <HChart
                  :options="getCarNumOptions()"
                  :dataset="carNumDataset"
                ></HChart>
                <HChart
                  :options="getCarNumOptions()"
                  :dataset="carNumDataset"
                ></HChart>
                <HChart
                  :options="getCarNumOptions()"
                  :dataset="carNumDataset"
                ></HChart>
                <HChart
                  :options="getCarNumOptions()"
                  :dataset="carNumDataset"
                ></HChart>
              </Carousel>
            </div>
          </div>
          <div class="card car-algorithm-spread">
            <div class="card-header">
              <span class="card-title">各算法预警车辆数量分布</span>
            </div>
            <div class="card-body">
              <Carousel autoplay>
                <HChart
                  :options="
                    getCarNumOptions(
                      'rgba(30, 231, 231, 1)',
                      'rgba(30, 231, 231, 0.35)',
                      '#1EE7E7'
                    )
                  "
                  :dataset="carAlgorithmDataset"
                ></HChart>
                <HChart
                  :options="
                    getCarNumOptions(
                      'rgba(30, 231, 231, 1)',
                      'rgba(30, 231, 231, 0.35)',
                      '#1EE7E7'
                    )
                  "
                  :dataset="carAlgorithmDataset"
                ></HChart>
                <HChart
                  :options="
                    getCarNumOptions(
                      'rgba(30, 231, 231, 1)',
                      'rgba(30, 231, 231, 0.35)',
                      '#1EE7E7'
                    )
                  "
                  :dataset="carAlgorithmDataset"
                ></HChart>
                <HChart
                  :options="
                    getCarNumOptions(
                      'rgba(30, 231, 231, 1)',
                      'rgba(30, 231, 231, 0.35)',
                      '#1EE7E7'
                    )
                  "
                  :dataset="carAlgorithmDataset"
                ></HChart>
              </Carousel>
            </div>
          </div>
          <div class="card car-mileage-spread">
            <div class="card-header">
              <span class="card-title">预警车辆里程分布</span>
            </div>
            <div class="card-body">
              <div style="width: 74%; height: 100%">
                <HChart
                  :options="roseOptions"
                  :dataset="carMileageDataset"
                  class="roseChart"
                ></HChart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-bottom-container">
        <div class="right-bottom-left-container">
          <div class="right-bottom-left-title">
            <img src="../assets/battery/working-condition-title.svg" alt="" />
          </div>
          <div class="right-bottom-left-content">
            <div class="card car-temp-rate">
              <div class="card-header">
                <span class="card-title">过温时长及占比</span>
              </div>
              <div class="card-body">
                <dl>
                  <dt>超40℃时长预警车辆数量分布</dt>
                  <dd>
                    <HChart :options="lineAreaOptions"></HChart>
                  </dd>
                </dl>
                <dl>
                  <dt>超40℃时长占比预警车辆数量分布</dt>
                  <dd>
                    <HChart :options="lineAreaOptions"></HChart>
                  </dd>
                </dl>
                <dl>
                  <dt>超45℃时长预警车辆数量分布</dt>
                  <dd>
                    <HChart :options="lineAreaOptions"></HChart>
                  </dd>
                </dl>
                <dl>
                  <dt>超45℃时长占比预警车辆数量分布</dt>
                  <dd>
                    <HChart :options="lineAreaOptions"></HChart>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="card car-working-show">
              <div class="card-header">
                <span class="card-title">工况预警展示</span>
              </div>
              <div class="card-body">
                <!-- <div id="scatter3d" style="width: 100%; height: 100%"></div> -->
                <!-- <HChart
                  :options="scatter3dOptions"
                  :dataset="workingShowDataset"
                ></HChart> -->
                <VChart
                  ref="chart"
                  element-loading-text="Loading..."
                  class="chart"
                  :autoresize="true"
                  :option="scatter3dOptions"
                  theme="dark"
                  :style="{ width: '100%', height: '100%' }"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="right-bottom-right-container">
          <div class="right-bottom-right-title">
            <img src="../assets/battery/soh-title.svg" alt="" />
          </div>
          <div class="right-bottom-right-content">
            <div class="card car-soh">
              <div class="card-header">
                <span class="card-title">SOH分布</span>
              </div>
              <div class="card-body">
                <HChart
                  :options="scatterOptions"
                  :dataset="sohDataset"
                ></HChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.battery-content {
  width: 100%;
  height: 100%;
  display: flex;
  .card {
    display: flex;
    flex-direction: column;
    &-body {
      flex: 1;
    }
  }
}
.left-sidelayer {
  width: 400px;
  flex-shrink: 0;
  &::before,
  &::after {
    position: absolute;
    left: 411px;
    top: 80px;
    bottom: 0;
    display: block;
    content: '';
    width: 42px;
    background-image: url('../assets/battery/left-side-bg.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  &::after {
    left: 0;
    transform: rotateY(180deg);
  }
}
.early-waring {
  width: 100%;
  img {
    width: 100%;
  }
}
.car-num {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: 30px 0;
  height: 102px;
  background: url('../assets/battery/early-warning-bg.svg') no-repeat;
  background-size: cover;
  &-content {
    padding-top: 8px;
    width: 80%;
    text-align: center;
    font-size: 16px;
    color: var(--color-muted);
  }
  &-count {
    font-size: 32px;
    text-shadow: 0px 0px 4px #29ccff;
    margin: 0 4px;
  }
}

.car-recognition-rate {
  height: 331px;
}
.car-accuracy-rate {
  height: 390px;
}

.right-layer {
  padding: 0 0 0 40px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.right-top-content {
  display: flex;
  align-items: center;
  .card {
    flex: auto;
  }
  .card-body {
    padding: 0;
  }
}
.car-risk-level {
  width: 270px;
  height: 344px;
}
.roseChart {
  background: url('../assets/battery/rose-chart-bg.png') no-repeat;
  background-size: 60% auto;
  background-position: 50.5% 30%;
}

.car-num-spread,
.car-algorithm-spread,
.car-mileage-spread {
  width: 365px;
  height: 344px;
  margin-left: 24px;
}
.car-mileage-spread {
  .card-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.ant-carousel :deep(.slick-slide) {
  height: 314px;
  overflow: hidden;
  > div {
    width: 100%;
    height: 100%;
  }
}
.ant-carousel :deep(.slick-dots) {
  li {
    width: 5px;
    height: 5px;
    button {
      border-radius: 5px;
      height: 100%;
      background: rgb(255, 255, 255);
    }
    &.slick-active {
      width: 22px;
      button {
        background: rgb(255, 255, 255);
      }
    }
  }
}
.right-bottom-container {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 40px;
}
.right-bottom-left-container {
  margin-right: 24px;
  width: 1048px;
}
.right-bottom-left-content {
  display: flex;
  align-items: flex-start;
  height: 455px;
  padding-top: 24px;
  .card {
    margin-top: 0;
  }
}
.car-temp-rate {
  width: 659px;
  flex: auto;
  margin-right: 24px;
  height: 100%;
  .card-header {
    background-image: url('@/assets/card-title-long-bg.png');
  }
  .card-body {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 14px 0;
    dl {
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 50%;
      padding: 0 15px;
      margin: 0;
      dt {
        background-image: url('@/assets/battery/icon-arrow.svg');
        background-position: left center;
        background-repeat: no-repeat;
        padding-left: 32px;
      }
      dd {
        flex: 1;
        margin: 0;
        padding: 4px 0 16px;
      }
    }
  }
}
.car-working-show {
  width: 365px;
  flex: auto;
  height: 100%;
}
.right-bottom-right-container {
  width: 365px;
}
.right-bottom-right-content {
  height: 455px;
  padding-top: 24px;
  .card {
    margin-top: 0;
  }
}
.car-soh {
  height: 100%;
}
</style>
