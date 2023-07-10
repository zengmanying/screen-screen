<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { xAxis, yAxis, legend } from '../components/echart/config/defaultConfig'
import HChart from '../components/echart/HChart.vue'
import CreateChartThemeColor from '../components/echart/config/color'
import VChart from 'vue-echarts'
import { Carousel } from 'ant-design-vue'
import '../assets/ant-carousel.css'
import { smoothLine, changeTo2dArray } from '@/utils'
import { getWorkingWarning } from '@/mock/battery'
import {
  getAlgorithmTotal,
  getRecognitionRate,
  getAccuracyRate,
  getRiskLevel,
  getWarnCarNum,
  getAlgorithmCarNum,
  getCarMileage,
  getOverTemplate,
  getOverTemplateProject,
  getSoh,
  getSohProject,
} from '@/api/battery'
import { updateDataInBeforeDawn } from '@/utils'
import { CAROUSELSPEED } from '@/constant'
onBeforeMount(() => {
  CreateChartThemeColor()
})
const getServiceData = () => {
  getAlgorithmTotalData()
  getRecognitionRateData()
  getAccuracyRateData()
  getRiskLevelData()
  getWarnCarNumData()
  getAlgorithmCarNumData()
  getCarMileageData()
  getOverTemplateProjectData()
  getWorkingWarningData()
  getSohProjectListData()
}
onMounted(() => {
  // 初始调用所有接口数据
  getServiceData()
  // 每天凌晨更新数据
  updateDataInBeforeDawn(() => {
    getServiceData()
  })
})
// 预警算法应用总数
const totalCount = ref(0)
const getAlgorithmTotalData = async () => {
  const resp = await getAlgorithmTotal()
  if (resp.resultCode === '200') {
    totalCount.value = resp.data.totalCount
  }
}
const barAndLineOptions = {
  title: {
    show: true,
    text: '2023年',
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
    left: 0,
    top: 0,
  },
  legend: {
    top: 'auto',
    bottom: 6,
    left: 'center',
    textStyle: {
      width: 100,
      backgroundColor: 'transparent',
    },
  },
  grid: {
    top: 60,
    right: 50,
    bottom: 80,
    left: 50,
  },
  yAxis: [
    {
      name: '数量(辆)',
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
          return value + '%'
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
    barGap: '65%',
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
  source: [],
})

const getRecognitionRateData = async () => {
  const resp = await getRecognitionRate()
  if (resp.resultCode === '200') {
    recognitionRateDataset.value.source = resp.data
  }
}

// 预警车辆检出率/准确率统计
const accuracyRateSeries = [
  {
    name: '预警车辆总数',
    serieType: 'bar',
    yAxisIndex: 0,
    barWidth: 6,
    barGap: '70%',
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
            color: '#41FFDD', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(65, 255, 221, 0.35)', // 100% 处的颜色
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
            color: '#2B59FF', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(43, 89, 255, 0.35)', // 100% 处的颜色
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
            color: '#9180FF', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(145, 128, 255, 0.35)', // 100% 处的颜色
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
const accuracyRateOpt = computed(() => {
  return {
    ...barAndLineOptions,
    ...{
      legend: {
        top: 'auto',
        bottom: 6,
        left: 'center',
        textStyle: {
          width: 80,
          backgroundColor: 'transparent',
        },
      },
    },
    ...{ series: accuracyRateSeries },
  }
})

const accuracyRateDataset = ref({
  source: [],
})

const getAccuracyRateData = async () => {
  const resp = await getAccuracyRate()
  if (resp.resultCode === '200') {
    accuracyRateDataset.value.source = resp.data
  }
}

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

const mileageRoseOptions = ref({
  legend: {
    icon: 'circle',
    bottom: '5%',
    top: 'auto',
    left: 'center',
  },
  series: [
    {
      name: '风险等级',
      serieType: 'pie',
      center: ['50%', '40%'],
      radius: ['25%', '48%'],
      roseType: 'radius',
    },
  ],
})

const riskLevelDataset = ref({
  source: [],
})

const getRiskLevelData = async () => {
  const resp = await getRiskLevel()
  if (resp.resultCode === '200') {
    riskLevelDataset.value.source = resp.data
  }
}

// 各项目预警车辆数量分布
const getCarNumOptions = (
  barColor1 = 'rgba(24, 130, 255, 1)',
  barColor2 = 'rgba(24, 144, 255, 0.35)',
  scatterColor = '#187FE9',
  len = 10
) => {
  return {
    grid: {
      containLabel: true,
      top: 20,
      left: 20,
      right: 40,
      bottom: 18 * (10 - len) + 35,
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
      axisLabel: {
        align: 'left',
      },
      offset: 70,
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

const carNumData = ref([])

const getWarnCarNumData = async () => {
  const resp = await getWarnCarNum()
  if (resp.resultCode === '200') {
    carNumData.value = changeTo2dArray(resp.data, 10)
  }
}

// 各算法预警车辆数量分布
const carAlgorithmData = ref([])

const getAlgorithmCarNumData = async () => {
  const resp = await getAlgorithmCarNum()
  if (resp.resultCode === '200') {
    // const len = resp.data.length
    // const fillLenth = 10 - (len % 10)
    // const fillArr = []
    // for (let i = 0; i < fillLenth; i++) {
    //   fillArr.push({
    //     name: 'fill' + i,
    //     value: 0,
    //   })
    // }
    // const data = resp.data.concat(fillArr)
    carAlgorithmData.value = changeTo2dArray(resp.data, 10)
    console.log('carAlgorithmData.value--------------', carAlgorithmData.value)
  }
}

//预警车辆里程分布
const carMileageDataset = ref({
  source: [],
})

const getCarMileageData = async () => {
  const resp = await getCarMileage()
  if (resp.resultCode === '200') {
    carMileageDataset.value.source = resp.data
  }
}

// 超40℃时长预警车辆数量分布
// let overTemplate40NumSeries = ref([])
// let overTemplate40NumCoordsData = ref([
//   {
//     coords: [],
//   },
// ])
// let overTemplate40NumLineArrData = ref([])
// const getOverTemplate40Data = async (project) => {
//   const resp = await getOverTemplate('RESULT_PERWARNING_OVERTEMP_40', project)
//   if (resp.resultCode === '200') {
//     overTemplate40NumLineArrData.value = resp.data.map((item, idx) => [
//       idx + 1,
//       Object.values(item)[1],
//       Object.values(item)[0],
//       Object.values(item)[2],
//     ])
//     const smoothLineData = smoothLine(overTemplate40NumLineArrData.value)
//     overTemplate40NumSeries.value = getSegmentLineAreaSeries(smoothLineData)
//     overTemplate40NumCoordsData.value[0].coords = smoothLineData.map((item) => [
//       item[0],
//       item[1],
//     ])
//   }
// }

// // 超40℃时长占比预警车辆数量分布
// let overTemplate40RateSeries = ref([])
// let overTemplate40RateCoordsData = ref([
//   {
//     coords: [],
//   },
// ])
// let overTemplate40RateLineArrData = ref([])
// const getOverTemplate40Rate = async (project) => {
//   const resp = await getOverTemplate(
//     'RESULT_PERWARNING_OVERTEMP_40PRO',
//     project
//   )
//   if (resp.resultCode === '200') {
//     overTemplate40RateLineArrData.value = resp.data.map((item, idx) => [
//       idx + 1,
//       Object.values(item)[1],
//       Object.values(item)[0],
//       Object.values(item)[2],
//     ])
//     const smoothLineData = smoothLine(overTemplate40RateLineArrData.value)
//     overTemplate40RateSeries.value = getSegmentLineAreaSeries(smoothLineData)
//     overTemplate40RateCoordsData.value[0].coords = smoothLineData.map(
//       (item) => [item[0], item[1]]
//     )
//   }
// }

// 超45℃时长预警车辆数量分布
let overTemplate45NumSeries = ref([])
let overTemplate45NumCoordsData = ref([
  {
    coords: [],
  },
])
let overTemplate45NumLineArrData = ref([])
const getOverTemplate45Data = async (project) => {
  overTemplate45NumSeries.value = []
  overTemplate45NumCoordsData.value = [
    {
      coords: [],
    },
  ]
  overTemplate45NumLineArrData.value = []
  const resp = await getOverTemplate('RESULT_BS02_008_01', project)
  if (resp.resultCode === '200') {
    overTemplate45NumLineArrData.value = resp.data.map((item, idx) => [
      idx + 1,
      Object.values(item)[1],
      Object.values(item)[0],
      Object.values(item)[2],
    ])
    const smoothLineData = smoothLine(overTemplate45NumLineArrData.value)
    overTemplate45NumSeries.value = getSegmentLineAreaSeries(smoothLineData)
    overTemplate45NumCoordsData.value[0].coords = smoothLineData.map((item) => [
      item[0],
      item[1],
    ])
  }
}

// 超45℃时长占比预警车辆数量分布
let overTemplate45RateSeries = ref([])
let overTemplate45RateCoordsData = ref([
  {
    coords: [],
  },
])
let overTemplate45RateLineArrData = ref([])
const getOverTemplate45Rate = async (project) => {
  overTemplate45RateSeries.value = []
  overTemplate45RateCoordsData.value = [
    {
      coords: [],
    },
  ]
  overTemplate45RateLineArrData.value = []
  const resp = await getOverTemplate('RESULT_BS02_008_02', project)
  if (resp.resultCode === '200') {
    overTemplate45RateLineArrData.value = resp.data.map((item, idx) => [
      idx + 1,
      Object.values(item)[1],
      Object.values(item)[0],
      Object.values(item)[2],
    ])
    const smoothLineData = smoothLine(overTemplate45RateLineArrData.value)
    overTemplate45RateSeries.value = getSegmentLineAreaSeries(smoothLineData)
    overTemplate45RateCoordsData.value[0].coords = smoothLineData.map(
      (item) => [item[0], item[1]]
    )
  }
}

const getLineAreaOptions = (
  lineArrData,
  coordsData,
  effectDTOSeries,
  xUnit
) => {
  return {
    grid: {
      top: 27,
      bottom: 40,
      left: 32,
      right: 58,
    },
    xAxis: {
      type: 'value',
      name: xUnit,
      min: 1,
      interval: 1,
      axisTick: {
        show: false,
      },
      axisLabel: {
        rotate: 35,
        formatter: (params) => {
          return lineArrData[params - 1] ? lineArrData[params - 1][2] : ''
        },
      },
      position: 'bottom',
    },
    yAxis: {
      name: '数量(辆)',
    },
    series: [
      ...effectDTOSeries,
      {
        name: '',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        zlevel: 4,
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
          width: 0,
          opacity: 0,
          curveness: 0,
        },
        animation: false,
        data: coordsData,
      },
    ],
  }
}

const getSegmentLineAreaSeries = (httpData) => {
  let series = []
  let data = []
  let seriesItem
  var st = httpData[0][5]
  let stArr = [st]
  for (var i = 0; i < httpData.length; i++) {
    data.push([httpData[i][0], httpData[i][1]])
    if (!stArr.includes(httpData[i][5]) || i == httpData.length - 1) {
      stArr.push(httpData[i][5])
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
          lineColor = 'rgba(30, 231, 231, 0.55)'
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
          lineColor = 'rgba(220, 209, 151, 0.55)'
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
          lineColor = 'rgba(245, 163, 88, 0.55)'
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
          lineColor = 'rgba(241, 98, 88, 0.55)'
      }
      seriesItem = {
        name: '',
        serieType: 'line',
        data: data,
        smooth: false,
        areaStyle: {
          color: areaColor,
          opacity: 1,
        },
        lineStyle: {
          width: 2,
          color: lineColor,
        },
      }
      series.push(seriesItem)
      data = [[httpData[i][0], httpData[i][1]]]
      st = httpData[i][5]
    }
  }
  return series
}

const overTemplateProject = ref([])
const getOverTemplateProjectData = async () => {
  const resp = await getOverTemplateProject()
  if (resp.resultCode === '200') {
    overTemplateProject.value = resp.data
    // getOverTemplate40Data(overTemplateProject.value[0].PROJECT)
    // getOverTemplate40Rate(overTemplateProject.value[0].PROJECT)
    getOverTemplate45Data(overTemplateProject.value[0].PROJECT)
    getOverTemplate45Rate(overTemplateProject.value[0].PROJECT)
  }
}

const currentTemplateOverIdx = ref(0)
const handleCarouselChange = (from, to) => {
  currentTemplateOverIdx.value = to
  // getOverTemplate40Data(overTemplateProject.value[to].PROJECT)
  // getOverTemplate40Rate(overTemplateProject.value[to].PROJECT)
  getOverTemplate45Data(overTemplateProject.value[to].PROJECT)
  getOverTemplate45Rate(overTemplateProject.value[to].PROJECT)
}
// 工况预警展示
const workingWarningData = ref([])

const getWorkingWarningData = async () => {
  const resp = await getWorkingWarning()
  if (resp.resultCode === '200') {
    workingWarningData.value = resp.data
  }
}
const scatter3dOptions = computed(() => {
  return {
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
      max: 2,
      min: 0,
      type: 'piecewise',
      splitNumber: 3,
      inRange: {
        color: ['#1EE7E7', '#187FE9', '#F16258'],
      },
      dimension: 3,
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
        alpha: 3,
        beta: 35,
      },
    },
    xAxis3D: {
      ...xAxis,
      ...{
        type: 'value',
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
      source: workingWarningData.value,
    },
  }
})

const sohProjectList = ref([])
const getSohProjectListData = async () => {
  const resp = await getSohProject()
  if (resp.resultCode === '200') {
    sohProjectList.value = resp.data
    getSohData(sohProjectList.value[0].CAR_MODEL)
  }
}

const currentSohIdx = ref(0)
const handleSohCarouselChange = (from, to) => {
  currentSohIdx.value = to
  getSohData(sohProjectList.value[to].CAR_MODEL)
}

// SOH分布
const sohDataset = ref({
  encode: {
    x: 2,
    y: 3,
  },
  source: [],
})
const getSohData = async (carModel) => {
  const resp = await getSoh(carModel)
  if (resp.resultCode === '200') {
    sohDataset.value.source = resp.data
  }
}
const scatterOptions = {
  grid: {
    right: 65,
    top: 50,
    bottom: 66,
  },
  legend: {
    top: 'auto',
    bottom: 20,
    left: 'center',
  },
  xAxis: {
    name: '里程表\n(万公里)',
  },
  yAxis: {
    name: 'SOH(%)',
    type: 'value',
  },
  series: [
    {
      name: 'SOH电池容量百分比',
      serieType: 'scatter',
      symbol: 'image://scatter-symbol.svg',
    },
  ],
}
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
            预警算法应用总数<span class="car-num-count">{{ totalCount }}</span
            >个
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
                v-if="riskLevelDataset.source.length > 0"
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
              <Carousel autoplay :autoplay-speed="CAROUSELSPEED">
                <HChart
                  v-for="(item, idx) in carNumData"
                  :key="`carNum${idx}`"
                  :options="getCarNumOptions()"
                  :dataset="{ source: item }"
                ></HChart>
              </Carousel>
            </div>
          </div>
          <div class="card car-algorithm-spread">
            <div class="card-header">
              <span class="card-title">各算法预警车辆数量分布</span>
            </div>
            <div class="card-body">
              <Carousel autoplay :autoplay-speed="CAROUSELSPEED">
                <HChart
                  v-for="(item, idx) in carAlgorithmData"
                  :key="`carAlgorithm${idx}`"
                  :options="
                    getCarNumOptions(
                      'rgba(30, 231, 231, 1)',
                      'rgba(30, 231, 231, 0.35)',
                      '#1EE7E7',
                      item.length
                    )
                  "
                  :dataset="{ source: item.reverse() }"
                ></HChart>
              </Carousel>
            </div>
          </div>
          <div class="card car-mileage-spread">
            <div class="card-header">
              <span class="card-title">预警车辆里程分布</span>
            </div>
            <div class="card-body">
              <div style="width: 100%; height: 100%">
                <HChart
                  :options="mileageRoseOptions"
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
                <span class="card-title"
                  >过温时长及占比({{
                    overTemplateProject[currentTemplateOverIdx] &&
                    overTemplateProject[currentTemplateOverIdx].PROJECT
                  }})</span
                >
              </div>
              <div class="card-body">
                <Carousel
                  style="width: 100%"
                  autoplay
                  :autoplay-speed="CAROUSELSPEED"
                  :before-change="handleCarouselChange"
                >
                  <div
                    v-for="item in overTemplateProject"
                    :key="item.PROJECT"
                    class="temp-rate-item"
                  >
                    <!-- <dl>
                      <dt>超40℃时长预警车辆数量分布</dt>
                      <dd v-if="overTemplate40NumLineArrData.length > 0">
                        <HChart
                          :options="
                            getLineAreaOptions(
                              overTemplate40NumLineArrData,
                              overTemplate40NumCoordsData,
                              overTemplate40NumSeries
                            )
                          "
                        ></HChart>
                      </dd>
                    </dl>
                    <dl>
                      <dt>超40℃时长占比预警车辆数量分布</dt>
                      <dd>
                        <HChart
                          v-if="overTemplate40RateLineArrData.length > 0"
                          :options="
                            getLineAreaOptions(
                              overTemplate40RateLineArrData,
                              overTemplate40RateCoordsData,
                              overTemplate40RateSeries
                            )
                          "
                        ></HChart>
                      </dd>
                    </dl> -->
                    <dl>
                      <dt>超45℃时长预警车辆数量分布</dt>
                      <dd>
                        <HChart
                          v-if="overTemplate45NumLineArrData.length > 0"
                          :options="
                            getLineAreaOptions(
                              overTemplate45NumLineArrData,
                              overTemplate45NumCoordsData,
                              overTemplate45NumSeries,
                              '时长(h)'
                            )
                          "
                        ></HChart>
                      </dd>
                    </dl>
                    <dl>
                      <dt>超45℃时长占比预警车辆数量分布</dt>
                      <dd>
                        <HChart
                          v-if="overTemplate45RateLineArrData.length > 0"
                          :options="
                            getLineAreaOptions(
                              overTemplate45RateLineArrData,
                              overTemplate45RateCoordsData,
                              overTemplate45RateSeries,
                              '占比(%)'
                            )
                          "
                        ></HChart>
                      </dd>
                    </dl>
                  </div>
                </Carousel>
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
                <span class="card-title"
                  >SOH分布({{
                    sohProjectList[currentSohIdx] &&
                    sohProjectList[currentSohIdx].CAR_MODEL
                  }})</span
                >
              </div>
              <div class="card-body">
                <Carousel
                  style="width: 100%"
                  autoplay
                  :autoplay-speed="CAROUSELSPEED"
                  :before-change="handleSohCarouselChange"
                >
                  <HChart
                    v-for="item in sohProjectList"
                    :key="item.CAR_MODEL"
                    :options="scatterOptions"
                    :dataset="sohDataset"
                  ></HChart>
                </Carousel>
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
  .roseChart {
    background-size: 45% auto;
    background-position: 50% 29%;
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
  .card {
    width: 100%;
  }
  .card-header {
    background-image: url('@/assets/card-title-long-bg.png');
  }
  .card-body {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 14px 0 24px;
    .temp-rate-item {
      width: 100%;
      height: 100%;
      display: flex !important;
      flex-wrap: wrap;
    }
    dl {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 48%;
      padding: 0 15px;
      margin: 0;
      dt {
        background-image: url('@/assets/battery/icon-arrow.svg');
        background-position: left center;
        background-repeat: no-repeat;
        padding-left: 32px;
        color: #fff;
      }
      dd {
        flex: 1;
        margin: 0;
        padding: 4px 0 16px;
      }
    }
  }
}
::v-deep .ant-carousel {
  width: 100%;
  height: 100%;
  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide {
    height: 100%;
  }
  .slick-dots-bottom {
    bottom: -5px;
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
