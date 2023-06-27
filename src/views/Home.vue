<script setup>
import { CountTo } from 'vue3-count-to'
import Line from '@/components/echart/Line.vue'
// import WordCloud from '../components/echart/WordCloud.vue'
import Gauge from '../components/echart/Gauge.vue'
import Map from '../components/echart/Map.vue'
import Bar from '../components/echart/Bar.vue'
import scrollTagsClond from '@/assets/js/fesucai.js'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import {
  getWarningMarketTotal,
  getWarningDailyProcess,
  getWarningDailyCharge,
  // getCarModelTotal,
  // getCarNumTotal,
  // getCarActiveNumTotal,
  getCarVehicleArea,
  getCarMileageDistribute,
  getWarnAlgoTotal,
  getAddaccumRate,
  getAccuRate,
  getActualSales,
  getSalesTop5,
} from '@/mock/home'
import {
  getCarModelTotal,
  getCarNumTotal,
  getCarActiveNumTotal,
} from '@/api/home'
import { updateDataInBeforeDawn, updateDataByHalfHour } from '@/utils'

// 车辆基本信息
const carModelTotal = ref(0)
let totalTypes = reactive({
  total: 0,
  A: 0,
  B: 0,
  C: 0,
})
let activeTypes = reactive({
  total: 0,
  A: 0,
  B: 0,
  C: 0,
})

const getCarModelTotalData = async () => {
  const resp = await getCarModelTotal()
  if (resp.resultCode === '200') {
    carModelTotal.value = resp.data.typesCount
  }
}

const getCarNumTotalData = async () => {
  const resp = await getCarNumTotal()
  if (resp.resultCode === '200') {
    const { total, A, B, C } = resp.data.totalTypes
    totalTypes.total = total
    totalTypes.A = A
    totalTypes.B = B
    totalTypes.C = C
  }
}

const getCarActiveNumTotalData = async () => {
  const resp = await getCarActiveNumTotal()
  if (resp.resultCode === '200') {
    const { total, A, B, C } = resp.data.activeTypes
    activeTypes.total = total
    activeTypes.A = A
    activeTypes.B = B
    activeTypes.C = C
    updateActiveCarNum(activeTypes.total, 5)
  }
}

// 近6个月实销车辆统计
let lineData = ref([])
const getActualSalesData = async () => {
  const resp = await getActualSales()
  if (resp.resultCode === '200') {
    lineData.value = resp.data
  }
}

// 销售Top5车型
const saleTopData = ref([])
const getSalesTop5Data = async () => {
  const resp = await getSalesTop5()
  if (resp.resultCode === '200') {
    saleTopData.value = resp.data
  }
}

// 车辆区域分布
const linesData = ref({})
const hotData = ref([])
const getCarVehicleAreaData = async () => {
  const resp = await getCarVehicleArea()
  if (resp.resultCode === '200') {
    linesData.value = resp.data.linesData
    hotData.value = resp.data.hotData
  }
}

// 所有车辆里程分布情况
const mileageData = ref([])
const getCarMileageDistributeData = async () => {
  const resp = await getCarMileageDistribute()
  if (resp.resultCode === '200') {
    mileageData.value = resp.data
  }
}

// 预警集市
const overall = ref(0)
const dailyProcess = ref(0)
const dailyVehicle = ref(0)
const getWarningMarketTotalData = async () => {
  const resp = await getWarningMarketTotal()
  if (resp.resultCode === '200') {
    overall.value = resp.data.overall
  }
}
const getWarningDailyProcessData = async () => {
  const resp = await getWarningDailyProcess()
  if (resp.resultCode === '200') {
    dailyProcess.value = resp.data.dailyProcess
  }
}
const getWarningDailyChargeData = async () => {
  const resp = await getWarningDailyCharge()
  if (resp.resultCode === '200') {
    dailyVehicle.value = resp.data.dailyVehicle
  }
}

// 算法应用
const algoTotal = ref(0)
const getWarnAlgoTotalData = async () => {
  const resp = await getWarnAlgoTotal()
  if (resp.resultCode === '200') {
    algoTotal.value = resp.data.total
  }
}
let tagsCloudWeekTimer = null
let tagsCloudWeekMonth = null
const tagscloudData = [
  '容量衰减预警',
  '40℃过温时长预警',
  '绝缘离散预警',
  '遗传算法SOH预警',
  '内阻一致性预',
  '动态自放电预警',
  '容量衰减预警',
  '40℃过温时长预警',
  '绝缘离散预警',
  '遗传算法SOH预警',
  '内阻一致性预',
  '动态自放电预警',
]

const tagscloudUpdate = () => {
  const tagsCloudWeekObj = new scrollTagsClond('tagsCloudWeek')
  const tagsCloudMonthObj = new scrollTagsClond('tagsCloudMonth')
  tagsCloudWeekTimer = setInterval(() => {
    tagsCloudWeekObj.update()
  }, 120)
  tagsCloudWeekMonth = setInterval(() => {
    tagsCloudMonthObj.update()
  }, 160)
}

// 预警指标
const recognitionNewRate = ref([])
const recognitionTotalRate = ref([])
const detectionRate = ref([])
const accuracyRate = ref([])
const getAddaccumRateData = async () => {
  const resp = await getAddaccumRate()
  if (resp.resultCode === '200') {
    recognitionNewRate.value = [resp.data[0]]
    recognitionTotalRate.value = [resp.data[1]]
  }
}
const getAccuRateData = async () => {
  const resp = await getAccuRate()
  if (resp.resultCode === '200') {
    detectionRate.value = [resp.data[0]]
    accuracyRate.value = [resp.data[1]]
  }
}

const getServiceData = () => {
  getCarModelTotalData()
  getCarNumTotalData()
  getCarActiveNumTotalData()
  getActualSalesData()
  getSalesTop5Data()
  getCarMileageDistributeData()
  getWarnAlgoTotalData()
  tagscloudUpdate()
  getWarningMarketTotalData()
  getWarningDailyProcessData()
  getWarningDailyChargeData()
  getAddaccumRateData()
  getAccuRateData()
  getCarVehicleAreaData()
}
const activeCarNumStartVal = ref(0)
const activeCarNumEndVal = ref(0)
const updateActiveCarNum = (end_value, intervalTime) => {
  const copies = (24 * 60) / intervalTime
  const maxIncrement = Math.floor(end_value / copies)
  const minIncrement = maxIncrement - 100
  // 获取当前时间
  const startTime = new Date()
  let endTime = new Date(startTime)
  endTime.setHours(23)
  endTime.setMinutes(59)
  activeCarNumEndVal.value = Math.floor(
    ((startTime.getHours() * 60 + startTime.getMinutes()) / 5) * maxIncrement
  )

  // 每隔五分钟更新数据
  const interval = setInterval(() => {
    if (startTime < endTime && activeCarNumStartVal.value < end_value) {
      // 生成随机数并添加到起始值上
      const random =
        Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) +
        minIncrement
      activeCarNumStartVal.value = activeCarNumEndVal.value
      activeCarNumEndVal.value += random

      // 打印当前时间和起始值
      // 更新时间
      startTime.setMinutes(startTime.getMinutes() + 5)
    } else {
      // 终止循环
      clearInterval(interval)
      // 最后将起始值设为结束值
      activeCarNumEndVal.value = end_value
    }
  }, intervalTime * 60 * 1000) // 五分钟为单位，转换为毫秒
}

onMounted(() => {
  // 初始调用所有接口数据
  getServiceData()
  // 每天凌晨更新数据
  updateDataInBeforeDawn(() => {
    getServiceData()
    getCarModelTotalData()
    getCarNumTotalData()
    getCarActiveNumTotalData()
    getActualSalesData()
    getSalesTop5Data()
    getCarMileageDistributeData()
    getWarnAlgoTotalData()
    tagscloudUpdate()
    getWarningMarketTotalData()
    getWarningDailyProcessData()
    getWarningDailyChargeData()
    getAddaccumRateData()
    getAccuRateData()
  })
  // 30分钟更新数据
  updateDataByHalfHour(() => {
    getCarVehicleAreaData()
  })
})

onUnmounted(() => {
  clearInterval(tagsCloudWeekTimer)
  tagsCloudWeekMonth = null
  clearInterval(tagsCloudWeekMonth)
  tagsCloudWeekMonth = null
})
</script>

<template>
  <div class="home-content">
    <aside class="left-sidelayer">
      <!--车辆基本信息统计 -->
      <div class="card car-base-info">
        <div class="card-header">
          <span class="card-title">车辆基本信息统计</span>
        </div>
        <div class="card-body">
          <section class="car-num">
            <div class="car-num-content">
              车型数量<span class="car-num-count">{{ carModelTotal }}</span
              >个
            </div>
          </section>
          <section class="car-total">
            <div class="car-total-header">
              <span class="name">车辆总数</span>
              <count-to
                class="count"
                :start-val="0"
                :end-val="totalTypes.total"
                :duration="3000"
                separator=""
              ></count-to>
              <span class="unit text-muted">辆</span>
            </div>
            <div class="car-total-classify">
              <dl>
                <dt>A品牌车型</dt>
                <dd>
                  {{ totalTypes.A }}<span class="unit text-muted">辆</span>
                </dd>
              </dl>
              <dl>
                <dt>B品牌车型</dt>
                <dd>
                  {{ totalTypes.B }}<span class="unit text-muted">辆</span>
                </dd>
              </dl>
              <dl>
                <dt>C品牌车型</dt>
                <dd>
                  {{ totalTypes.C }}<span class="unit text-muted">辆</span>
                </dd>
              </dl>
            </div>
          </section>
          <section class="car-total car-total-active">
            <div class="car-total-header">
              <span class="name">活跃车辆</span>
              <count-to
                class="count"
                :start-val="activeCarNumStartVal"
                :end-val="activeCarNumEndVal"
                :duration="3000"
                separator=""
              ></count-to>
              <span class="unit text-muted">辆</span>
            </div>
            <div class="car-total-classify">
              <dl>
                <dt>A品牌车型</dt>
                <dd>
                  {{ activeTypes.A }}<span class="unit text-muted">辆</span>
                </dd>
              </dl>
              <dl>
                <dt>B品牌车型</dt>
                <dd>
                  {{ activeTypes.B }}<span class="unit text-muted">辆</span>
                </dd>
              </dl>
              <dl>
                <dt>C品牌车型</dt>
                <dd>
                  {{ activeTypes.C }}<span class="unit text-muted">辆</span>
                </dd>
              </dl>
            </div>
          </section>
        </div>
      </div>
      <!--近6个月实销车辆统计 -->
      <div class="card card-line-statistics">
        <div class="card-header">
          <span class="card-title">近6个月实销车辆统计</span>
        </div>
        <div class="card-body">
          <Line v-if="lineData.length > 0" :data="lineData"></Line>
        </div>
      </div>
      <!-- 销售Top5车型 -->
      <div class="card card-sale-top">
        <div class="card-header">
          <span class="card-title">销售Top5车型</span>
        </div>
        <div class="card-body">
          <ul class="sale-top-rank">
            <li>
              <div
                v-for="item in saleTopData"
                :key="item.name"
                class="progress-item"
              >
                <div class="progress-title">
                  {{ item.name }}
                  <span class="progress__name">{{ item.value }}</span>
                </div>
                <div class="progress-outer">
                  <div class="progress progress--blue">
                    <div
                      class="progress__bar"
                      :style="{ width: `${(item.value / 10000) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="center-content">
      <img src="@/assets/home-page-title.svg" alt="" class="home-page-title" />
      <div class="map-container">
        <Map
          v-if="hotData.length > 0"
          :lines-data="linesData"
          :hot-data="hotData"
        ></Map>
      </div>
      <div class="card card-mileage">
        <div class="card-header">
          <span class="card-title">所有车辆里程分布情况</span>
        </div>
        <div class="card-body">
          <Bar v-if="mileageData.length > 0" :data="mileageData"></Bar>
        </div>
      </div>
    </div>
    <aside class="right-sidelayer">
      <!-- 预警集市数据情况 -->
      <div class="card card-warning">
        <div class="card-header">
          <span class="card-title">预警集市数据情况</span>
        </div>
        <div class="card-body">
          <dl>
            <dt>
              <img src="@/assets/icon-warning-1.svg" alt="" />
            </dt>
            <dd>总体数据规模</dd>
            <dd>
              <span class="value">{{ overall }}</span
              ><span class="unit">TB</span>
            </dd>
          </dl>
          <dl>
            <dt>
              <img src="@/assets/icon-warning-2.svg" alt="" />
            </dt>
            <dd>每天处理数据量</dd>
            <dd>
              <span class="value">{{ dailyProcess }}</span
              ><span class="unit">亿</span>
            </dd>
          </dl>
          <dl>
            <dt>
              <img src="@/assets/icon-warning-3.svg" alt="" />
            </dt>
            <dd>车辆当日充电次数</dd>
            <dd>
              <span class="value">{{ dailyVehicle }}</span
              ><span class="unit">次</span>
            </dd>
          </dl>
        </div>
      </div>
      <!-- 算法应用总数 -->
      <div class="card card-word-cloud">
        <div class="card-header">
          <span class="card-title"
            >算法应用总数 <b>{{ algoTotal }}</b></span
          >
        </div>
        <div class="card-body">
          <section>
            <div class="word-cloud-title"><span>按周更新</span></div>
            <div id="tagsCloudWeek" class="tagscloud">
              <a v-for="item in tagscloudData" :key="item" class="tagcloud-item"
                ><span :style="{ color: $randomColor }">{{ item }}</span></a
              >
            </div>
          </section>
          <section>
            <div class="word-cloud-title">
              <span>按半月及月更新</span>
            </div>
            <div id="tagsCloudMonth" class="tagscloud tagsCloudMonth">
              <a v-for="item in tagscloudData" :key="item" class="tagcloud-item"
                ><span :style="{ color: $randomColor }">{{ item }}</span></a
              >
            </div>
          </section>
        </div>
      </div>
      <!-- 预警指标 -->
      <div class="card card-gauge">
        <div class="card-header">
          <span class="card-title">预警指标</span>
        </div>
        <div class="card-body">
          <section class="gauge-chart">
            <Gauge
              v-if="recognitionNewRate.length > 0"
              color="#6975F3"
              :data="recognitionNewRate"
            ></Gauge>
          </section>
          <section class="gauge-chart">
            <Gauge
              v-if="recognitionTotalRate.length > 0"
              color="#1A8AEC"
              :data="recognitionTotalRate"
            ></Gauge>
          </section>
          <section class="gauge-chart">
            <Gauge
              v-if="detectionRate.length > 0"
              color="#1EDFEE"
              :data="detectionRate"
            ></Gauge>
          </section>
          <section class="gauge-chart">
            <Gauge
              v-if="accuracyRate.length > 0"
              color="#1EBD89"
              :data="accuracyRate"
            ></Gauge>
          </section>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.home-content {
  display: flex;
  width: 100%;
  height: 100%;
  .left-sidelayer,
  .right-sidelayer {
    width: 400px;
    flex-shrink: 0;
  }
  .center-content {
    position: relative;
    margin: 0 20px;
    flex: 1;
  }
}
.car-base-info {
  margin-top: 0;
  .card-body {
    padding: 20px 8px;
  }
}
.car-num {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 102px;
  background: url('@/assets/car-num-bg.png') no-repeat;
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
.car-total {
  width: 100%;
  height: 133px;
  margin-top: 16px;
  background-image: url('@/assets/car-total-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  padding: 0 28px;
  &-header {
    display: flex;
    align-items: center;
    height: 46px;
    .name {
      font-size: 16px;
    }
    .count {
      font-size: 24px;
      background: linear-gradient(180deg, #1790ff -36.59%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-weight: bold;
      letter-spacing: 19px;
      margin-left: 12px;
      width: 200px;
      text-align: right;
    }
  }
  &-classify {
    display: flex;
    align-self: center;
    justify-content: space-between;
    dl {
      margin: 12px 0 0;
      text-align: center;
      flex: 1;
      white-space: nowrap;
      dt {
        font-size: 16px;
        color: var(--color-muted);
      }
      dd {
        margin: 4px 0 0;
        font-size: 20px;
        .unit {
          font-size: 14px;
          margin-left: 4px;
        }
      }
      &:nth-child(2) {
        position: relative;
        // &::before,
        // &::after {
        //   position: absolute;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   display: inline-block;
        //   width: 1px;
        //   height: 44px;
        //   content: '';
        //   background: linear-gradient(
        //     180deg,
        //     rgba(24, 127, 233, 0) 0%,
        //     rgba(163, 204, 240, 0.6) 48.91%,
        //     rgba(24, 127, 233, 0) 100%
        //   );
        //   border-radius: 1px;
        // }
      }
      // &::before {
      //   left: 0;
      // }
      // &::after {
      //   right: 0;
      // }
    }
  }
}
.car-total-active {
  background-image: url('@/assets/car-active-bg.png');
}

.card-line-statistics {
  height: 195px;
  .card-body {
    padding: 20px;
  }
}

.card-sale-top {
  flex: 1;
  .card-body {
    display: flex;
    align-items: center;
    padding: 0 20px 8px;
  }
  .sale-top-rank {
    width: 100%;
    list-style: none;
    background-image: url('@/assets/rank-bg.png');
    background-repeat: no-repeat;
    background-size: 30px auto;
    background-position: 0 4px;
  }
}

.card-warning {
  margin-top: 0;
  height: 209px;
  .card-body {
    display: flex;
    align-items: center;
  }
  dl {
    flex: 1;
    text-align: center;
    white-space: nowrap;
    margin: 8px 0;
  }
  dt {
    margin-bottom: -32px;
    img {
      width: 110px;
    }
  }
  dd {
    margin: 0;
    &:first-child {
      color: var(--color-muted);
    }
    .value {
      font-size: 24px;
    }
    .unit {
      color: #7e89a4;
      margin-left: 2px;
    }
  }
}

.card-word-cloud {
  height: 350px;
  .card-body {
    padding: 20px 0 0;
    display: flex;
    flex-direction: column;
  }
  section {
    flex: 1;
  }
  .word-cloud-title {
    height: 28px;
    background: url('@/assets/word-cloud-title-bj.png');
    background-repeat: no-repeat;
    background-size: contain;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    span {
      position: relative;
      bottom: 8px;
    }
  }
  .word-cloud-chart {
    flex: 1;
    padding: 0;
  }
}

.card-gauge {
  height: 357px;
  .card-body {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 0;
    padding-bottom: 16px;
  }
}

.home-page-title {
  position: absolute;
  left: 50%;
  top: 0;
  z-index: 2;
  transform: translateX(-50%);
}
.gauge-chart {
  width: 140px;
  height: 140px;
  margin-top: 16px;
}

.map-container {
  width: 100%;
  height: 100%;
  margin-top: -40px;
  z-index: 1;
}

.card-mileage {
  height: 244px;
  .card-header {
    background-image: url('@/assets/card-title-long-bg.png');
  }
  .card-body {
    padding: 20px 20px 16px;
  }
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.tagscloud {
  position: relative;
  height: calc(100% - 60px);
  margin: 16px 0;
  text-align: center;
  .tagcloud-item {
    position: absolute;
    top: 0px;
    left: 0px;
    display: inline-block;
    color: #fff;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 100px;
    white-space: nowrap;
    &:nth-child(n) {
      background-color: rgba(96, 98, 194, 1);
    }
    &:nth-child(2n) {
      background-color: rgba(101, 141, 218, 1);
    }
    &:nth-child(3n) {
      background-color: rgba(125, 94, 192, 1);
    }
  }
  &.tagsCloudMonth {
    .tagcloud-item {
      &:nth-child(n) {
        background-color: rgba(65, 109, 169, 1);
      }
      &:nth-child(2n) {
        background-color: rgba(130, 130, 130, 1);
      }
      &:nth-child(3n) {
        background-color: rgba(53, 127, 151, 1);
      }
    }
  }
}
</style>
