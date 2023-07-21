<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { CountTo } from 'vue3-count-to'
import { updateDataInBeforeDawn } from '@/utils'
import {
  getCarAttribute,
  getMileageTotal,
  getMileageDaily,
  getTimeDaily,
  getKcMcRate,
  getKcMcCount,
  getChargeTemp,
  getChargeSoc,
} from '@/api/af.js'
import HChart from '../components/echart/HChart.vue'
import { Carousel } from 'ant-design-vue'
import '../assets/ant-carousel.css'
import { CAROUSELSPEED } from '@/constant'
import { useRoute } from 'vue-router'
const route = useRoute()

const getServiceData = () => {
  getCarAttributeData()
  getMileageTotalData()
  getMileageDailyData()
  getTimeDailyData()
  getKcMcRateData()
  getKcMcCountData()
  getChargeTempData()
  getChargeSocData()
}
onMounted(() => {
  // 初始调用所有接口数据
  getServiceData()
  // 每天凌晨更新数据
  updateDataInBeforeDawn(() => {
    getServiceData()
  })
})

watch(
  () => route.name,
  () => {
    // 初始调用所有接口数据
    getServiceData()
    // 每天凌晨更新数据
    updateDataInBeforeDawn(() => {
      getServiceData()
    })
  }
)

// 车辆属性
const carAttributeData = ref([])
const carAttributeTotal = ref(0)
const getCarAttributeData = async () => {
  const resp = await getCarAttribute(route.name)
  if (resp.resultCode === '200') {
    carAttributeData.value = resp.data
    carAttributeTotal.value = carAttributeData.value.reduce(
      (prev, next) => prev.VALUE + next.VALUE
    )
  }
}
const roseOptions = ref({
  color: [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#0D52AA', // 0% 处的颜色
        },
        {
          offset: 0.6,
          color: '#0D52AA', // 100% 处的颜色
        },
        {
          offset: 1,
          color: '#02A8FD', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    '#00FEFF',
  ],
  legend: {
    show: false,
  },
  series: [
    {
      name: '总数',
      serieType: 'pie',
      center: ['45%', '50%'],
      radius: ['63%', '85%'],
      roseType: true,
      startAngle: 25,
      label: {
        position: 'center',
        formatter: () => {
          return [`{a|${carAttributeTotal.value}}`, '{b|总数}'].join('\n')
        },
        rich: {
          a: {
            color: '#fff',
            fontSize: 12,
            lineHeight: 24,
            fontWeight: 600,
          },
          b: {
            color: '#7E89A4',
            fontSize: 10,
          },
        },
      },
      emphasis: {
        disabled: true,
      },
    },
  ],
})

// 总里程分布
const getPictorialBarOpt = (xUnit, yUnit, symbol) => {
  return {
    grid: {
      left: 50,
      right: 110,
      top: 30,
      bottom: 20,
    },
    legend: {
      show: false,
    },
    yAxis: {
      name: yUnit,
      show: true,
      splitLine: {
        lineStyle: {
          color: 'rgba(126, 137, 164, 0.1)',
        },
      },
    },
    xAxis: {
      name: xUnit,
      show: true,
      axisLabel: {
        interval: 0,
      },
    },
    series: [
      {
        serieType: 'bar',
        name: 'bg',
        barGap: '-100%',
        barWidth: '60%',
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
                color: 'rgba(195, 226, 255, .1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(195, 226, 255, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        serieType: 'pictorialBar',
        symbol: symbol,
        symbolPosition: 'center',
        symbolSize: [16, '100%'],
        symbolOffset: [0, 2],
        barMinHeight: 8,
        zlevel: 3,
        label: {
          show: true,
          fontSize: 12,
          color: '#fff',
          position: 'top',
          fontWeight: 600,
        },
      },
    ],
  }
}
const mileageTotalData = ref([])
const getMileageTotalData = async () => {
  const resp = await getMileageTotal()
  if (resp.resultCode === '200') {
    mileageTotalData.value = resp.data
  }
}

const mileageDailyData = ref([])
const getMileageDailyData = async () => {
  const resp = await getMileageDaily()
  if (resp.resultCode === '200') {
    mileageDailyData.value = resp.data
  }
}

const timeDailyData = ref([])
const getTimeDailyData = async () => {
  const resp = await getTimeDaily()
  if (resp.resultCode === '200') {
    timeDailyData.value = resp.data
  }
}

// 快充慢充占比分布
const kcMcRateData = ref([])
const kcMcTopVal = ref(1500)
const getKcMcRateData = async () => {
  const resp = await getKcMcRate()
  if (resp.resultCode === '200') {
    kcMcRateData.value = resp.data
    const valArr = []
    kcMcRateData.value.forEach((item) => {
      valArr.push(item.KVALUE, item.MVALUE)
    })
    kcMcTopVal.value = valArr.reduce((prev, next) => Math.max(prev, next))
  }
}

// 充电频次分布
const kcMcCountOpt = {
  grid: {
    left: 50,
    right: 60,
    top: 40,
    bottom: 50,
  },
  legend: {
    show: true,
    top: 'auto',
    bottom: 6,
    left: 'center',
    itemWidth: 14,
    itemHeight: 4,
    data: [
      {
        name: '快充',
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(23, 222, 198, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 36, 101, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: '慢充',
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 162, 23, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(52, 223, 223, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: '总和',
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(23, 144, 255, 0.95)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(23, 144, 255, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  },
  yAxis: {
    name: '数量(辆)',
    show: true,
    splitLine: {
      lineStyle: {
        color: 'rgba(126, 137, 164, 0.1)',
      },
    },
  },
  xAxis: {
    name: '次数(次)',
    show: true,
    axisLabel: {
      interval: 0,
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(195, 226, 255, .1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(195, 226, 255, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          'rgba(250,250,250,0)',
        ],
      },
    },
  },
  series: [
    {
      type: 'bar',
      name: '快充',
      smooth: true,
      barGap: '200%',
      barWidth: 4,
      label: {
        show: true,
        fontSize: 12,
        color: '#fff',
        position: 'top',
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
              color: 'rgba(23, 222, 198, 0)', // 0% 处的颜色
            },
            {
              offset: 0.1,
              color: 'rgba(23, 222, 198, 0.69)', // 100% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0, 36, 101, 0)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    {
      type: 'pictorialBar',
      name: '快充头',
      symbol: 'image://kc-dot.png',
      symbolOffset: ['-75%', '-50%'],
      symbolSize: [16, 16],
      symbolPosition: 'end',
      zlevel: 2,
    },
    {
      type: 'bar',
      name: '慢充',
      smooth: true,
      barWidth: 4,
      label: {
        show: true,
        fontSize: 12,
        color: '#fff',
        position: 'top',
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
              color: 'rgba(255, 162, 23, 0.01)', // 0% 处的颜色
            },
            {
              offset: 0.1,
              color: 'rgba(245, 165, 33, 0.95)', // 100% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(52, 223, 223, 0)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    {
      type: 'pictorialBar',
      name: '慢充头',
      symbol: 'image://mc-dot.png',
      symbolPosition: 'end',
      symbolOffset: ['-5%', '-50%'],
      symbolSize: [16, 16],
      zlevel: 2,
    },
    {
      type: 'bar',
      name: '总和',
      smooth: true,
      barWidth: 4,
      label: {
        show: true,
        fontSize: 12,
        color: '#fff',
        position: 'top',
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
              color: 'rgba(23, 144, 255, 0.01)', // 0% 处的颜色
            },
            {
              offset: 0.1,
              color: 'rgba(23, 144, 255, 0.95)', // 100% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(23, 144, 255, 0)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    {
      type: 'pictorialBar',
      name: '总和头',
      symbol: 'image://zh-dot.png',
      symbolPosition: 'end',
      symbolOffset: ['75%', '-50%'],
      symbolSize: [16, 16],
      zlevel: 2,
    },
  ],
}
const kcMcCountData = ref([])
const getKcMcCountData = async () => {
  const resp = await getKcMcCount()
  if (resp.resultCode === '200') {
    kcMcCountData.value = resp.data
  }
}

// 充电过程温度分布情况
const chargeTempTabs = computed(() => [
  {
    name: '最高温度分布',
    value: route.name === 'AF' ? 'RESULT_BS03_007_01' : 'RESULT_BS04_007_01',
  },
  {
    name: '最低温度分布',
    value: route.name === 'AF' ? 'RESULT_BS03_007_02' : 'RESULT_BS04_007_02',
  },
  {
    name: '最大温差分布',
    value: route.name === 'AF' ? 'RESULT_BS03_007_03' : 'RESULT_BS04_007_03',
  },
  {
    name: '温升分布',
    value: route.name === 'AF' ? 'RESULT_BS03_008' : 'RESULT_BS04_008',
  },
])
const chargeTempData = reactive({
  xAxis: [],
  kvalue: [],
  mvalue: [],
  kLinesValue: [],
  mLinesValue: [],
})
const chargeTempOpt = computed(() => {
  return {
    grid: {
      left: 50,
      right: 100,
      top: 50,
      bottom: 55,
    },
    legend: {
      show: true,
      top: 'auto',
      bottom: 10,
      left: 'center',
      itemWidth: 14,
      itemHeight: 4,
    },
    yAxis: {
      name: '数量(辆)',
      show: true,
      splitLine: {
        lineStyle: {
          color: 'rgba(126, 137, 164, 0.1)',
        },
      },
    },
    xAxis: {
      type: '',
      name: '温度(摄氏度)',
      min: 1,
      interval: 1,
      show: true,
      boundaryGap: false,
      axisLabel: {
        formatter: (params) => {
          return chargeTempData.xAxis[params - 1]
        },
      },
    },
    series: [
      {
        name: '快充',
        serieType: 'line',
        smooth: false,
        symbol: 'image://zh-dot.png',
        symbolSize: 16,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(145, 162, 255, 1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(71, 41, 254, 1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(204, 3, 184, 1)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 4, 200, 0.4)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(11, 35, 249, 0.46)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(14, 226, 255, 0.28)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: chargeTempData.kvalue,
      },
      {
        name: '慢充',
        serieType: 'line',
        smooth: false,
        symbol: 'image://zh-dot.png',
        symbolSize: 16,
        showSymbol: false,
        label: {
          show: true,
          fontSize: 12,
          color: '#fff',
          position: 'top',
        },
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(225, 68, 0, 1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(236, 252, 55, 1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(148, 255, 203, 1)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(128, 255, 224, 0)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(0, 255, 148, 0.4)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255, 17, 17, 0.4)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: chargeTempData.mvalue,
      },
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
          symbolSize: 5,
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
                color: '#91A3FF', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#AA3FFF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#596EFD', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          width: 0,
          opacity: 0,
          curveness: 0,
        },
        animation: false,
        data: chargeTempData.kLinesValue,
      },
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
          symbolSize: 5,
        },
        lineStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#5ef4e0', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#5cfee7', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#91fdd7', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          width: 0,
          opacity: 0,
          curveness: 0,
        },
        animation: false,
        data: chargeTempData.mLinesValue,
      },
    ],
  }
})

const currentChargeTempTab = ref(chargeTempTabs.value[0].value)
const getChargeTempData = async (No = chargeTempTabs.value[0].value) => {
  const resp = await getChargeTemp(No)
  if (resp.resultCode === '200') {
    const { xAxis, kvalue, mvalue, kLinesValue, mLinesValue } = resp.data
    chargeTempData.xAxis = xAxis
    chargeTempData.kvalue = kvalue
    chargeTempData.mvalue = mvalue
    chargeTempData.kLinesValue = kLinesValue
    chargeTempData.mLinesValue = mLinesValue
  }
}

const handleChargeTempCarouselChange = (from, to) => {
  currentChargeTempTab.value = chargeTempTabs.value[to].value
  getChargeTempData(currentChargeTempTab.value)
}

// 充电过程SOC分布
const chargeSocTabs = computed(() => [
  {
    name: '充电开始SOC分布',
    value: route.name === 'AF' ? 'RESULT_BS03_009_01' : 'RESULT_BS04_009_01',
  },
  {
    name: '充电结束SOC分布',
    value: route.name === 'AF' ? 'RESULT_BS03_009_02' : 'RESULT_BS04_009_02',
  },
  {
    name: '充电SOC差值分布',
    value: route.name === 'AF' ? 'RESULT_BS03_009_03' : 'RESULT_BS04_009_03',
  },
])
const currentChargeSocTab = ref(chargeSocTabs.value[0].value)
const chargeSocOpt = {
  grid: {
    left: 50,
    right: 100,
    top: 50,
    bottom: 55,
  },
  legend: {
    show: true,
    top: 'auto',
    bottom: 10,
    left: 'center',
    data: [
      {
        name: '快充',
        icon: 'rect',
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(22, 120, 245, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(159, 247, 109, 1)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: '慢充',
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(60, 56, 250, 1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(133, 113, 255, 1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(80, 171, 255, 1)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  },
  yAxis: {
    name: '数量(辆)',
    show: true,
  },
  xAxis: {
    name: '占比(百分比)',
    show: true,
  },
  series: [
    {
      serieType: 'pictorialBar',
      name: 'bg',
      barGap: '-100%',
      barWidth: 28,
      symbolOffset: ['-25%', 0],
      symbol: 'image://rect-green-bar-bg.png',
    },
    {
      serieType: 'pictorialBar',
      name: '快充',
      barWidth: 18,
      label: {
        show: true,
        fontSize: 12,
        color: '#fff',
        position: 'top',
      },
      symbol: 'image://rect-green-bar.png',
    },
    {
      serieType: 'bar',
      smooth: true,
      barWidth: 4,
      zlevel: 1,
      label: {
        show: true,
        fontSize: 12,
        color: '#fff',
        position: 'top',
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
              color: 'rgba(30, 221, 224, 0.36)', // 0% 处的颜色
            },
            {
              offset: 0.3,
              color: 'rgba(226, 238, 84, 0.17)', // 100% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(252, 252, 252, 0)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    {
      serieType: 'line',
      name: '慢充',
      zlevel: 2,
      smooth: true,
      itemStyle: {
        color: 'rgba(29, 206, 219, .8)',
        borderWidth: 6,
        borderColor: 'rgba(29, 206, 219, .4)',
      },
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#3C38FA', // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: '#8571FF', // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#50ABFF', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  ],
}
const chargeSocData = ref([])
const getChargeSocData = async (No = chargeSocTabs.value[0].value) => {
  const resp = await getChargeSoc(No)
  if (resp.resultCode === '200') {
    chargeSocData.value = resp.data
  }
}
const handleChargeSocCarouselChange = (from, to) => {
  currentChargeSocTab.value = chargeSocTabs.value[to].value
  getChargeSocData(currentChargeSocTab.value)
}
</script>
<template>
  <div class="af-content">
    <aside class="left-sidelayer">
      <div class="card car-attribute">
        <div class="card-header">
          <span class="card-title">车辆属性</span>
        </div>
        <div class="card-body">
          <div v-if="carAttributeData.length > 0" class="car-attribute-content">
            <dl>
              <dt>运营车辆数</dt>
              <dd>
                <count-to
                  class="count"
                  :start-val="0"
                  :end-val="carAttributeData[0].VALUE"
                  :duration="3000"
                  separator=""
                ></count-to>
                <span class="car-attribute-rate"
                  >{{
                    (carAttributeData[0].VALUE / carAttributeTotal).toFixed(2) *
                    100
                  }}%</span
                >
              </dd>
            </dl>
            <div class="car-attr-pie">
              <HChart
                :options="roseOptions"
                :dataset="{ source: carAttributeData }"
              ></HChart>
            </div>
            <dl>
              <dt>非运营车辆数</dt>
              <dd>
                <count-to
                  class="count"
                  :start-val="0"
                  :end-val="carAttributeData[1].VALUE"
                  :duration="3000"
                  separator=""
                ></count-to>
                <span class="car-attribute-rate"
                  >{{
                    100 -
                    (carAttributeData[0].VALUE / carAttributeTotal).toFixed(2) *
                      100
                  }}%</span
                >
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="card car-mileage-total">
        <div class="card-header">
          <span class="card-title">总里程分布</span>
        </div>
        <div class="card-body">
          <HChart
            :options="
              getPictorialBarOpt(
                '里程(万公里)',
                '数量(辆)',
                'image://react-bar-blue.png'
              )
            "
            :dataset="{ source: mileageTotalData }"
          ></HChart>
        </div>
      </div>
      <div class="card car-mileage-total">
        <div class="card-header">
          <span class="card-title">日均行驶里程分布</span>
        </div>
        <div class="card-body">
          <HChart
            :options="
              getPictorialBarOpt(
                '里程(公里)',
                '数量(辆)',
                'image://cirle-purple-bar.png'
              )
            "
            :dataset="{ source: mileageDailyData }"
          ></HChart>
        </div>
      </div>
      <div class="card car-mileage-total">
        <div class="card-header">
          <span class="card-title">日均行驶时长分布</span>
        </div>
        <div class="card-body">
          <HChart
            :options="
              getPictorialBarOpt(
                '时间(小时)',
                '数量(辆)',
                'image://trengle-bar.png'
              )
            "
            :dataset="{ source: timeDailyData }"
          ></HChart>
        </div>
      </div>
    </aside>
    <div class="right-layer">
      <div class="right-layer-top">
        <div class="card card-kc-mc-rate">
          <div class="card-header">
            <span class="card-title">快充慢充占比分布</span>
          </div>
          <div class="card-body">
            <ul class="kc-mc-list">
              <li
                v-for="item in kcMcRateData"
                :key="item.NAME"
                class="kc-mc-item"
              >
                <div class="progress-item progress-item-left">
                  <div class="progress-title">
                    {{ item.KVALUE }}<span class="unit">辆</span>
                  </div>
                  <div class="progress-outer">
                    <div class="progress progress--blue">
                      <div
                        class="progress__bar"
                        :style="{
                          width: `${(item.KVALUE / kcMcTopVal) * 100}%`,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
                <span class="progress-text">{{ item.NAME }}</span>
                <div class="progress-item progress-item-right">
                  <div class="progress-outer">
                    <div class="progress progress--blue">
                      <div
                        class="progress__bar"
                        :style="{
                          width: `${(item.MVALUE / kcMcTopVal) * 100}%`,
                        }"
                      ></div>
                    </div>
                  </div>
                  <div class="progress-title">
                    {{ item.MVALUE }}<span class="unit">辆</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="card card-kc-mc-count">
          <div class="card-header">充电频次分布</div>
          <div class="card-body">
            <HChart
              :options="kcMcCountOpt"
              :dataset="{
                source: kcMcCountData,
              }"
            ></HChart>
          </div>
        </div>
      </div>
      <div class="card card-charge-temp">
        <div class="card-header">
          充电过程温度分布情况
          <ul class="chart-tab">
            <li
              v-for="item in chargeTempTabs"
              :key="`chargeTemp${item.value}`"
              :class="[
                'chart-tab-item',
                { active: currentChargeTempTab === item.value },
              ]"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="card-body">
          <Carousel
            autoplay
            :autoplay-speed="CAROUSELSPEED"
            :before-change="handleChargeTempCarouselChange"
          >
            <HChart
              v-for="item in chargeTempTabs"
              :key="item.value"
              :options="chargeTempOpt"
            ></HChart>
          </Carousel>
        </div>
      </div>
      <div class="card card-charge-soc">
        <div class="card-header">
          充电过程SOC分布
          <ul class="chart-tab">
            <li
              v-for="item in chargeSocTabs"
              :key="`chargeTemp${item.value}`"
              :class="[
                'chart-tab-item',
                { active: currentChargeSocTab === item.value },
              ]"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="card-body">
          <Carousel
            autoplay
            :autoplay-speed="CAROUSELSPEED"
            :before-change="handleChargeSocCarouselChange"
          >
            <HChart
              v-for="item in chargeSocTabs"
              :key="item.value"
              :options="chargeSocOpt"
              :dataset="{ source: chargeSocData }"
            ></HChart>
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.af-content {
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
  width: 600px;
  flex-shrink: 0;
  &::before,
  &::after {
    position: absolute;
    left: 611px;
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
  .card {
    &-header {
      background-image: url('../assets/af/card-header-bg-600.png');
    }
  }
}

.car-attribute {
  .card-body {
    padding: 12px 0;
  }
  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 110;
    padding: 0 38px;
    background: url('../assets/af/car-attr-bg.png') no-repeat;
    background-size: cover;
  }
  dl {
    margin: 0;
    dt {
      color: #eaf8ff;
    }
    dd {
      margin: 2px 0 0 0;
    }
    span {
      font-weight: 600;
      color: #fff;
      font-size: 24px;
      &.count {
        margin-right: 20px;
      }
    }
  }
  .car-attr-pie {
    width: 136px;
    height: 110px;
    background: url('../assets/af/car-attr-rose-bg.png') no-repeat;
    background-size: contain;
  }
}

.car-mileage-total {
  height: 238px;
}

.right-layer {
  padding: 0 0 0 40px;
  overflow: hidden;
  flex: 1;
}
.right-layer-top {
  display: flex;
  justify-content: space-around;
}
.card-kc-mc-rate {
  flex: 1;
  margin-right: 16px;
  height: 303px;
  .card-header {
    background-image: url('../assets/af/card-header-bg-613.png');
  }
  .card-body {
    background: url('../assets/af/kc-mc-bg.png') no-repeat;
    background-size: contain;
    background-position: center;
  }
  .kc-mc-list {
    padding: 40px 16px 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .kc-mc-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .progress-item {
      display: flex;
      flex: 1;
      margin-bottom: 0;
      .progress-title {
        width: 60px;
        flex-shrink: 0;
        text-align: right;
        color: #fff;
        .unit {
          color: #7e89a4;
          margin-left: 2px;
        }
      }
      .progress__bar {
        height: 12px;
      }
      &-left {
        padding-right: 20px;
        .progress-title {
          padding-right: 6px;
        }
        .progress-outer .progress {
          display: flex;
          justify-content: flex-end;
          background: url('../assets/af/kc-progress-bg.png') no-repeat;
          background-size: contain;
        }
        .progress__bar {
          background: linear-gradient(270deg, #1678f5ff 0%, #9ff76dff 100%);
        }
      }
      &-right {
        padding-left: 20px;
        .progress-title {
          padding-left: 6px;
        }
        .progress-outer .progress {
          background: url('../assets/af/mc-progress-bg.png') no-repeat;
          background-size: contain;
        }
        .progress__bar {
          background: linear-gradient(270deg, #db5433ff 0%, #efd764ff 100%);
        }
      }
    }
    .progress-text {
      width: 50px;
      height: 22px;
      border-radius: 30px;
      flex-shrink: 0;
      border: 1px solid #0f6ae4ff;
      background: #063e71ff;
      text-align: center;
      font-size: 12px;
    }
  }
}

.card-kc-mc-count {
  flex: 1;
  height: 303px;
  .card-header {
    background-image: url('../assets/af/card-header-bg-613.png');
  }
  .card-body {
    padding: 0;
  }
}

.chart-tab {
  display: flex;
  align-items: center;
  height: 100%;
  list-style: none;
  &-item {
    width: 150px;
    margin-right: 24px;
    text-align: center;
    background: url('../assets/af/tag150.png') no-repeat;
    background-size: contain;
    color: rgba(234, 248, 255, 0.85);
    font-weight: 600;
    &.active {
      color: #fff;
      background-image: url('../assets/af/tag150-active.png');
    }
  }
}

.card-charge-temp,
.card-charge-soc {
  width: 100%;
  height: 298px;
  .card-header {
    display: flex;
    align-items: center;
    background-image: url('../assets/af/card-header-bg-1242.png');
  }
  .card-body {
    padding: 0;
  }
}

.card-charge-soc .chart-tab {
  &-item {
    width: 190px;
    background-image: url('../assets/af/tag190.png');
    &.active {
      background-image: url('../assets/af/tag190-active.png');
    }
  }
}

::v-deep .ant-carousel {
  width: 100%;
  height: 100%;
  div {
    height: 100%;
  }
  .slick-dots-bottom {
    display: none !important;
  }
}
</style>
