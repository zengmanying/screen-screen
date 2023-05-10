<script setup>
import { CountTo } from 'vue3-count-to'
import Line from '@/components/echart/Line.vue'
// import WordCloud from '../components/echart/WordCloud.vue'
import Gauge from '../components/echart/Gauge.vue'
import Map from '../components/echart/Map.vue'
import Bar from '../components/echart/Bar.vue'
import scrollTagsClond from '@/assets/js/fesucai.js'
import { onMounted } from 'vue'
const saleTopData = [
  {
    name: 'EU3009(BEV)',
    value: 5529,
  },
  {
    name: 'EC180(BEV)',
    value: 5154,
  },
  {
    name: 'EX3(BEV)',
    value: 3864,
  },
  {
    name: 'EU5(BEV)',
    value: 2169,
  },
  {
    name: 'LITE(BEV)',
    value: 1087,
  },
]

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

onMounted(() => {
  const tagsCloudWeekObj = new scrollTagsClond('tagsCloudWeek')
  const tagsCloudMonthObj = new scrollTagsClond('tagsCloudMonth')
  setInterval(() => {
    tagsCloudWeekObj.update()
    tagsCloudMonthObj.update()
  }, 40)
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
              车型数量<span class="car-num-count">51</span>个
            </div>
          </section>
          <section class="car-total">
            <div class="car-total-header">
              <span class="name">车辆总数</span>
              <count-to
                class="count"
                :start-val="0"
                :end-val="88341"
                :duration="3000"
                separator=""
              ></count-to>
              <span class="unit text-muted">辆</span>
            </div>
            <div class="car-total-classify">
              <dl>
                <dt>A品牌车型</dt>
                <dd>5341</dd>
              </dl>
              <dl>
                <dt>B品牌车型</dt>
                <dd>5341</dd>
              </dl>
              <dl>
                <dt>C品牌车型</dt>
                <dd>5341</dd>
              </dl>
            </div>
          </section>
          <section class="car-total car-total-active">
            <div class="car-total-header">
              <span class="name">活跃车辆</span>
              <count-to
                class="count"
                :start-val="0"
                :end-val="88341"
                :duration="3000"
                separator=""
              ></count-to>
              <span class="unit text-muted">辆</span>
            </div>
            <div class="car-total-classify">
              <dl>
                <dt>A品牌车型</dt>
                <dd>5341</dd>
              </dl>
              <dl>
                <dt>B品牌车型</dt>
                <dd>5341</dd>
              </dl>
              <dl>
                <dt>C品牌车型</dt>
                <dd>5341</dd>
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
          <Line></Line>
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
        <Map></Map>
      </div>
      <div class="card card-mileage">
        <div class="card-header">
          <span class="card-title">所有车辆里程分布情况</span>
        </div>
        <div class="card-body">
          <Bar></Bar>
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
            <dd><span class="value">300</span><span class="unit">TB</span></dd>
          </dl>
          <dl>
            <dt>
              <img src="@/assets/icon-warning-2.svg" alt="" />
            </dt>
            <dd>每天处理数据</dd>
            <dd><span class="value">30</span><span class="unit">TB</span></dd>
          </dl>
          <dl>
            <dt>
              <img src="@/assets/icon-warning-3.svg" alt="" />
            </dt>
            <dd>车辆当日充电次数</dd>
            <dd><span class="value">30</span><span class="unit">次</span></dd>
          </dl>
        </div>
      </div>
      <!-- 算法应用总数 -->
      <div class="card card-word-cloud">
        <div class="card-header">
          <span class="card-title">算法应用总数 23</span>
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
            <div id="tagsCloudMonth" class="tagscloud">
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
            <Gauge color="#6975F3"></Gauge>
          </section>
          <section class="gauge-chart">
            <Gauge color="#1A8AEC"></Gauge>
          </section>
          <section class="gauge-chart">
            <Gauge color="#1EDFEE"></Gauge>
          </section>
          <section class="gauge-chart">
            <Gauge color="#1EBD89"></Gauge>
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
      letter-spacing: 21px;
      margin-left: 16px;
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
      }
      &:nth-child(2) {
        position: relative;
        &::before,
        &::after {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: inline-block;
          width: 1px;
          height: 44px;
          content: '';
          background: linear-gradient(
            180deg,
            rgba(24, 127, 233, 0) 0%,
            rgba(163, 204, 240, 0.6) 48.91%,
            rgba(24, 127, 233, 0) 100%
          );
          border-radius: 1px;
        }
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
  }
}
.car-total-active {
  background-image: url('@/assets/car-active-bg.png');
}

.card-line-statistics {
  .card-body {
    padding: 20px;
    height: 180px;
  }
}

.card-sale-top {
  .card-body {
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
  .card-body {
    padding: 20px 28px 0;
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
    height: 121px;
    padding: 12px 0;
  }
}

.card-gauge {
  .card-body {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 8px;
  }
}

.home-page-title {
  position: absolute;
  left: 50%;
  top: 0;
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
}

.card-mileage {
  .card-header {
    background-image: url('@/assets/card-title-long-bg.png');
  }
  .card-body {
    padding: 20px 20px 16px;
    height: 190px;
  }
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.tagscloud {
  position: relative;
  height: 121px;
  padding: 12px 0;
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
    &:nth-child(n) {
      background-color: rgba(155, 81, 224, 1);
    }
    &:nth-child(2n) {
      background-color: rgba(86, 204, 242, 1);
    }
    &:nth-child(3n) {
      background-color: rgba(93, 95, 239, 1);
    }
  }
}
</style>
