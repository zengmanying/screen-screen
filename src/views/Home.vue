<script setup>
import { CountTo } from 'vue3-count-to'
import Line from '@/components/echart/Line.vue'
// import WordCloud from '../components/echart/WordCloud.vue'
import Gauge from '../components/echart/Gauge.vue'
import Map from '../components/echart/Map.vue'
import Bar from '../components/echart/Bar.vue'
// import scrollTagsClond from '@/assets/js/fesucai.js'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import {} from '@/mock/home'
import {
  getCarModelTotal,
  getCarNumTotal,
  getCarActiveNumTotal,
  getActualSales,
  getSalesTop5,
  getSalesNewTop5,
  getCarVehicleArea,
  getCarMileageDistribute,
  getWarningMarketTotal,
  getWarningDailyProcess,
  getWarningDailyCharge,
  getWarnAlgoTotal,
  getTagscloud,
  getAddaccumRate,
  getAccuRate,
} from '@/api/home'
import {
  updateDataInBeforeDawn,
  updateDataByHalfHour,
  UpdateDataByFiveMinu,
} from '@/utils'

import { Carousel } from 'ant-design-vue'
import '../assets/ant-carousel.css'
import { CAROUSELSPEED, RANDOMUPDATETIME } from '@/constant'

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
    // const { total, A, B, C } = resp.data.activeTypes
    // activeTypes.total = total
    // activeTypes.A = A
    // activeTypes.B = B
    // activeTypes.C = C
    updateActiveCarNum(resp.data.activeTypes, RANDOMUPDATETIME)
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
const saleTop1 = ref(0)
const getSalesTop5Data = async () => {
  const resp = await getSalesTop5()
  if (resp.resultCode === '200') {
    saleTopData.value = resp.data
    const saleTopValueArr = saleTopData.value.map((item) => item.value)
    saleTop1.value = saleTopValueArr.reduce((prev, next) => {
      return Math.max(prev, next)
    })
  }
}

let currentTopRank = ref(0)
const handleTopRankCarouselChange = (from, to) => {
  currentTopRank.value = to
  to === 0 ? getSalesTop5Data : getSalesNewTop5Data()
}

// 新车型销售Top5
const saleTopNewData = ref([])
const saleTopNew1 = ref(0)
const getSalesNewTop5Data = async () => {
  const resp = await getSalesNewTop5()
  if (resp.resultCode === '200') {
    saleTopNewData.value = resp.data
    const saleTopNewValueArr = saleTopNewData.value.map((item) => item.value)
    saleTopNew1.value = saleTopNewValueArr.reduce((prev, next) => {
      return Math.max(prev, next)
    })
  }
}

// 车辆区域分布
const hotData = ref([])
const getCarVehicleAreaData = async (segmentation = 1) => {
  const resp = await getCarVehicleArea(segmentation)
  if (resp.resultCode === '200') {
    hotData.value = resp.data
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
    // dailyProcess.value = (resp.data.dailyProcess / 100000000).toFixed(2)
    updateDailyProcess(
      Math.ceil(resp.data.dailyProcess * 0.5),
      resp.data.dailyProcess,
      RANDOMUPDATETIME
    )
  }
}

const updateDailyProcess = (starData, endData, intervalTime) => {
  const updateObj = new UpdateDataByFiveMinu(
    starData,
    endData,
    8,
    18,
    intervalTime,
    100
  )
  dailyProcess.value = (updateObj.initFn() / 100000000).toFixed(2)
  // 每隔五分钟更新数据
  let intervalVehicle = null
  if (intervalVehicle) {
    clearInterval(intervalVehicle)
  }
  intervalVehicle = setInterval(() => {
    const currentData = updateObj.updateFn()
    dailyProcess.value = (currentData.currentEndVal / 100000000).toFixed(2)
  }, intervalTime)
}

const getWarningDailyChargeData = async () => {
  const resp = await getWarningDailyCharge()
  if (resp.resultCode === '200') {
    updateDailyVehicle(
      Math.ceil(resp.data.dailyVehicle * 0.5),
      resp.data.dailyVehicle,
      RANDOMUPDATETIME
    )
  }
}
const updateDailyVehicle = (starData, endData, intervalTime) => {
  const updateObj = new UpdateDataByFiveMinu(
    starData,
    endData,
    8,
    18,
    intervalTime,
    5
  )
  dailyVehicle.value = updateObj.initFn()
  // 每隔五分钟更新数据
  let intervalVehicle = null
  if (intervalVehicle) {
    clearInterval(intervalVehicle)
  }
  intervalVehicle = setInterval(() => {
    const currentData = updateObj.updateFn()
    dailyVehicle.value = currentData.currentEndVal
  }, intervalTime)
}

// 算法应用
const algoTotal = ref(0)
const getWarnAlgoTotalData = async () => {
  const resp = await getWarnAlgoTotal()
  if (resp.resultCode === '200') {
    algoTotal.value = resp.data.total
  }
}

const tagscloudData = reactive({
  MECHANISM: [],
  MONITOR: [],
  OPERATE: [],
  HEALTH: [],
})

const getTagscloudData = async () => {
  const resp = await getTagscloud()
  if (resp.resultCode === '200') {
    tagscloudData.MECHANISM = resp.data.MECHANISM
    tagscloudData.MONITOR = resp.data.MONITOR
    tagscloudData.OPERATE = resp.data.OPERATE
    tagscloudData.HEALTH = resp.data.HEALTH
  }
}

// const tagscloudWeekData = ref([])
// const tagscloudMonthData = ref([])
// let tagsCloudWeekTimer = null
// let tagsCloudWeekMonth = null
// const getTagscloudWeekData = async () => {
//   const resp = await getTagscloudWeek()
//   if (resp.resultCode === '200') {
//     tagscloudWeekData.value = resp.data
//     nextTick(() => {
//       const tagsCloudWeekObj = new scrollTagsClond('tagsCloudWeek')
//       tagsCloudWeekTimer = setInterval(() => {
//         tagsCloudWeekObj.update()
//       }, 120)
//     })
//   }
// }

// const getTagscloudMonthData = async () => {
//   const resp = await getTagscloudMonth()
//   if (resp.resultCode === '200') {
//     tagscloudMonthData.value = resp.data
//     nextTick(() => {
//       const tagsCloudMonthObj = new scrollTagsClond('tagsCloudMonth')
//       tagsCloudWeekMonth = setInterval(() => {
//         tagsCloudMonthObj.update()
//       }, 160)
//     })
//   }
// }

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
  getTagscloudData()
  getWarningMarketTotalData()
  getWarningDailyProcessData()
  getWarningDailyChargeData()
  getAddaccumRateData()
  getAccuRateData()
  const startTime = new Date()
  const segmentation = Math.floor(
    (startTime.getHours() * 60 + startTime.getMinutes()) / 30
  )
  getCarVehicleAreaData(segmentation)
}
const activeCarNumStartVal = ref(0)
const activeCarNumEndVal = ref(0)
const updateActiveCarNum = (data, intervalTime) => {
  const { MAXACTIVE, MINACTIVE } = data
  const updateObj = new UpdateDataByFiveMinu(
    MINACTIVE,
    MAXACTIVE,
    8,
    18,
    intervalTime
  )
  activeCarNumEndVal.value = updateObj.initFn()

  activeTypes.B = Math.ceil(activeCarNumEndVal.value * 0.63)
  activeTypes.C = Math.ceil(activeCarNumEndVal.value * 0.3)
  activeTypes.A = activeCarNumEndVal.value - activeTypes.B - activeTypes.C
  let interval = null
  if (interval) {
    clearInterval(interval)
  }
  // 每隔五分钟更新数据
  interval = setInterval(() => {
    const currentData = updateObj.updateFn()
    activeCarNumStartVal.value = currentData.currentStartVal
    activeCarNumEndVal.value = currentData.currentEndVal
    activeTypes.B = Math.ceil(activeCarNumEndVal.value * 0.63)
    activeTypes.C = Math.ceil(activeCarNumEndVal.value * 0.3)
    activeTypes.A = activeCarNumEndVal.value - activeTypes.B - activeTypes.C
  }, intervalTime)
}

onMounted(() => {
  // 初始调用所有接口数据
  getServiceData()
  // 每天凌晨更新数据
  updateDataInBeforeDawn(() => {
    getCarModelTotalData()
    getCarNumTotalData()
    getCarActiveNumTotalData()
    getActualSalesData()
    getSalesTop5Data()
    getCarMileageDistributeData()
    getWarnAlgoTotalData()
    getTagscloudData()
    getWarningMarketTotalData()
    getWarningDailyProcessData()
    getWarningDailyChargeData()
    getAddaccumRateData()
    getAccuRateData()
  })
  // 30分钟更新数据
  updateDataByHalfHour((segmentation) => {
    getCarVehicleAreaData(segmentation)
  })
})

onUnmounted(() => {})
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
          <p
            style="
              font-size: 12px;
              transform: scale(0.8);
              transform-origin: 0 50%;
              margin-top: -8px;
              color: rgba(255, 255, 255, 0.45);
              white-space: nowrap;
            "
          >
            来自于北汽蓝谷新能源科技股份有限公司子公司产销快报
          </p>
        </div>
      </div>
      <!-- 销售Top5车型 -->
      <div class="card card-sale-top">
        <div class="card-header">
          <span class="card-title" :class="{ active: currentTopRank === 0 }"
            >累计销售Top5车型</span
          >
          <span
            class="card-title"
            :class="{ active: currentTopRank === 1 }"
            style="margin-left: auto"
            >新车型销售Top5</span
          >
        </div>
        <div class="card-body">
          <Carousel
            style="width: 100%"
            autoplay
            :autoplay-speed="CAROUSELSPEED"
            :before-change="handleTopRankCarouselChange"
          >
            <ul class="sale-top-rank">
              <li>
                <div
                  v-for="item in saleTopData"
                  :key="item.name"
                  class="progress-item"
                >
                  <div class="progress-title">
                    {{ item.name }}
                    <span class="progress__name">{{ item.value }}辆</span>
                  </div>
                  <div class="progress-outer">
                    <div class="progress progress--blue">
                      <div
                        class="progress__bar"
                        :style="{ width: `${(item.value / saleTop1) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="sale-top-rank">
              <li>
                <div
                  v-for="item in saleTopNewData"
                  :key="item.name"
                  class="progress-item"
                >
                  <div class="progress-title">
                    {{ item.name }}
                    <span class="progress__name">{{ item.value }}辆</span>
                  </div>
                  <div class="progress-outer">
                    <div class="progress progress--blue">
                      <div
                        class="progress__bar"
                        :style="{
                          width: `${(item.value / saleTopNew1) * 100}%`,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </Carousel>
        </div>
      </div>
    </aside>
    <div class="center-content">
      <img src="@/assets/home-page-title.svg" alt="" class="home-page-title" />
      <div class="map-container">
        <Map v-if="hotData.length > 0" :hot-data="hotData"></Map>
      </div>
      <div class="card card-mileage">
        <div class="card-header">
          <span class="card-title">近90天活跃车辆里程分布</span>
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
          <!-- <section>
            <div class="word-cloud-title"><span>按周更新</span></div>
            <div id="tagsCloudWeek" class="tagscloud">
              <a
                v-for="item in tagscloudWeekData"
                :key="item"
                class="tagcloud-item"
                ><span :style="{ color: $randomColor }">{{ item }}</span></a
              >
            </div>
          </section>
          <section>
            <div class="word-cloud-title">
              <span>按半月及月更新</span>
            </div>
            <div id="tagsCloudMonth" class="tagscloud tagsCloudMonth">
              <a
                v-for="item in tagscloudMonthData"
                :key="item"
                class="tagcloud-item"
                ><span :style="{ color: $randomColor }">{{ item }}</span></a
              >
            </div>
          </section> -->
          <Carousel autoplay :autoplay-speed="CAROUSELSPEED">
            <div>
              <dl class="jlmx">
                <dt>机理模型</dt>
                <dd>
                  <span v-for="item in tagscloudData.MECHANISM" :key="item">{{
                    item
                  }}</span>
                </dd>
              </dl>
              <dl style="margin-top: 16px">
                <dt>使用工况模型</dt>
                <dd>
                  <span v-for="item in tagscloudData.OPERATE" :key="item">{{
                    item
                  }}</span>
                </dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>监测模型</dt>
                <dd>
                  <span v-for="item in tagscloudData.MONITOR" :key="item">{{
                    item
                  }}</span>
                </dd>
              </dl>
              <dl style="margin-top: 16px">
                <dt>健康监测模型</dt>
                <dd>
                  <span v-for="item in tagscloudData.HEALTH" :key="item">{{
                    item
                  }}</span>
                </dd>
              </dl>
            </div>
          </Carousel>
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
      letter-spacing: 15px;
      margin-left: 4px;
      width: 215px;
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
    padding: 20px 8px;
  }
}

.card-sale-top {
  min-height: 250px;
  .card-header {
    display: flex;
    align-items: center;
    padding-right: 24px;
    .card-title {
      color: rgba(255, 255, 255, 0.45);
      &.active {
        color: #fff;
      }
    }
  }
  .card-body {
    display: flex;
    padding: 0 20px 8px;
  }
  ::v-deep {
    .slick-dots-bottom {
      display: none !important;
    }
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

  & ::v-deep .ant-carousel {
    .slick-dots-bottom {
      bottom: -24px;
    }
  }

  dl {
    padding: 0 16px;
    margin: 0;
    dt {
      background-image: url('@/assets/battery/icon-arrow.svg');
      background-position: left center;
      background-repeat: no-repeat;
      padding-left: 1.67vw;
      color: #fff;
      font-weight: bold;
    }
    dd {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      span {
        position: relative;
        font-size: 12px;
        font-weight: 500;
        display: block;
        height: 36px;
        // border: 1px solid rgba(26, 98, 179, 0.8);
        background: url('@/assets/alogBg.svg') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 36px;
        min-width: 110px;
        margin-right: 8px;
        margin-top: 8px;
        color: #fff;
        flex: 31%;
        white-space: nowrap;
        &:nth-child(3n),
        &:last-child {
          margin-right: 0;
        }
        // &::after {
        //   position: absolute;
        //   left: 0;
        //   right: 0;
        //   bottom: 0;
        //   height: 2px;
        //   display: block;
        //   content: '';
        //   background-image: url('@/assets/alogBg.svg');
        //   background-size: 140% auto;
        //   background-position: center bottom;
        //   background-repeat: no-repeat;
        // }
      }
    }
    &:nth-child(2) {
      span {
        background-image: url('@/assets/alogBgMiddle.svg');
      }
    }
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
  height: 155px;
  margin-top: 4px;
}

.map-container {
  width: 100%;
  height: 100%;
  margin-top: -40px;
  z-index: 1;
}

.card-mileage {
  height: 250px;
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
