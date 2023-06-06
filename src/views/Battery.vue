<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import HChart from '../components/echart/HChart.vue'
import CreateChartThemeColor from '../components/echart/config/color'
onBeforeMount(() => {
  CreateChartThemeColor()
})
const barAndLineOptions = {
  legend: {
    bottom: '10%',
    itemWidth: 10,
    itemHeight: 10,
    padding: [0, 20, 0, 0],
  },
  grid: {
    top: 30,
    right: 60,
    bottom: 100,
    left: 60,
  },
  yAxis: [
    {
      name: '',
      type: 'value',
      show: true,
      gridIndex: 0,
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(126, 137, 164, 0.3)',
          type: 'dashed',
          width: 1,
        },
      },
      inverse: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(126, 137, 164, .5)',
          width: 1,
          type: 'solid',
        },
      },
      axisLabel: {
        show: true,
        color: 'rgba(126, 137, 164, 1)',
        fontSize: 12,
        fontWeight: 'bolder',
      },
      axisTick: { show: false, inside: true },
      position: 'left',
      offset: 0,
    },
    {
      name: '',
      type: 'value',
      show: true,
      gridIndex: 0,
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(126, 137, 164, 0.3)',
          type: 'dashed',
          width: 1,
        },
      },
      inverse: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(126, 137, 164, .5)',
          width: 1,
          type: 'solid',
        },
      },
      axisLabel: {
        show: true,
        color: 'rgba(126, 137, 164, 1)',
        fontSize: 12,
        fontWeight: 'bolder',
        formatter: function (value) {
          return value * 100 + '%'
        },
      },
      axisTick: { show: false, inside: true },
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
      name: '2023W01',
      newCar: 823,
      historyCar: 1000,
      totalRadio: 0.5,
      newRadio: 0.8,
    },
    {
      name: '2023W02',
      newCar: 823,
      historyCar: 1200,
      totalRadio: 0.4,
      newRadio: 0.9,
    },
    {
      name: '2023W03',
      newCar: 2200,
      historyCar: 1800,
      totalRadio: 0.7,
      newRadio: 0.8,
    },
    {
      name: '2023W04',
      newCar: 823,
      historyCar: 1400,
      totalRadio: 0.9,
      newRadio: 0.5,
    },
    {
      name: '2023W05',
      newCar: 1500,
      historyCar: 1600,
      totalRadio: 0.8,
      newRadio: 0.6,
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
    barWidth: 6,
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
    barWidth: 6,
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
      name: '2023W01',
      newCar: 823,
      historyCar: 1000,
      underRepair: 400,
      totalRadio: 0.5,
      newRadio: 0.8,
    },
    {
      name: '2023W02',
      newCar: 823,
      historyCar: 1200,
      underRepair: 800,
      totalRadio: 0.4,
      newRadio: 0.9,
    },
    {
      name: '2023W03',
      newCar: 2200,
      historyCar: 1800,
      underRepair: 900,
      totalRadio: 0.7,
      newRadio: 0.8,
    },
    {
      name: '2023W04',
      newCar: 823,
      historyCar: 1400,
      underRepair: 1000,
      totalRadio: 0.9,
      newRadio: 0.5,
    },
    {
      name: '2023W05',
      newCar: 1500,
      historyCar: 1600,
      underRepair: 1200,
      totalRadio: 0.8,
      newRadio: 0.6,
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
    top: '75%',
    itemWidth: 10,
    itemHeight: 10,
    width: 200,
  },
  roseType: 'radius',
  series: [
    {
      name: '风险等级',
      serieType: 'pie',
      center: ['50%', '40%'],
    },
  ],
})

const riskLevelDataset = ref({
  source: [
    {
      name: '低风险',
      value: 823,
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
      name: '温度跳变预警',
      value: 723,
      symbol: 723,
    },
    {
      name: '温差离散预警',
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
      name: '压差一致性预',
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
            车型数量<span class="car-num-count">51</span>个
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
              <HChart
                :options="getCarNumOptions()"
                :dataset="carNumDataset"
              ></HChart>
            </div>
          </div>
          <div class="card car-algorithm-spread">
            <div class="card-header">
              <span class="card-title">各算法预警车辆数量分布</span>
            </div>
            <div class="card-body">
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
    background-size: contain;
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
  padding: 0 40px;
}
.right-top-content {
  display: flex;
  align-items: center;
}
.car-risk-level {
  width: 270px;
  height: 344px;
}
.roseChart {
  background: url('../assets/battery/rose-chart-bg.png') no-repeat;
  background-size: 60% auto;
  background-position: 50% 29.5%;
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
</style>
