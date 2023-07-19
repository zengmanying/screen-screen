import http from '@/api/http'
import { smoothLine } from '@/utils'
import { useRoute } from 'vue-router'
const route = useRoute()

const loadEnv = () => {
  return import.meta.env
}

const testInterFaceUrl = {
  CarAttribute: '/car-attribute',
  MileageTotal: '/MileageTotal',
  MileageDaily: '/MileageDaily',
  TimeDaily: '/TimeDaily',
  KcMcRate: '/KcMcRate',
  KcMcCount: '/KcMcCount',
  ChargeTemp: '/ChargeTemp',
  ChargeSoc: '/ChargeSoc',
}

const afInterFaceUrl = {
  CarAttribute:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_001',
  MileageTotal:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_002',
  MileageDaily:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_003',
  TimeDaily:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_004',
  KcMcRate:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_005',
  KcMcCount:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_006',
  ChargeTemp: '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=',
  ChargeSoc: '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=',
}

const bfInterFaceUrl = {
  CarAttribute:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=RESULT_BS04_001',
  MileageTotal:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=RESULT_BS04_002',
  MileageDaily:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=RESULT_BS04_003',
  TimeDaily:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=RESULT_BS04_004',
  KcMcRate:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=RESULT_BS04_005',
  KcMcCount:
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=RESULT_BS04_006',
  ChargeTemp: '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=',
  ChargeSoc: '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=',
}

const isProd = loadEnv().MODE === 'production'

const interFaceUrl = isProd
  ? route?.name === 'AF'
    ? afInterFaceUrl
    : bfInterFaceUrl
  : testInterFaceUrl

// 车辆属性
export const getCarAttribute = async () => {
  const url = interFaceUrl.CarAttribute
  const resp = await http.get(url)
  return resp
}

// 总里程分布
export const getMileageTotal = async () => {
  const url = interFaceUrl.MileageTotal
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      value1: 0,
      value2: item.VALUE,
    }
  })
  return resp
}

// 日均行驶里程分布
export const getMileageDaily = async () => {
  const url = interFaceUrl.MileageDaily
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      value1: 0,
      value2: item.VALUE,
    }
  })
  return resp
}

// 日均行驶时长分布
export const getTimeDaily = async () => {
  const url = interFaceUrl.TimeDaily
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      value1: 0,
      value2: item.VALUE,
    }
  })
  return resp
}

// 快充慢充占比分布
export const getKcMcRate = async () => {
  const url = interFaceUrl.KcMcRate
  const resp = await http.get(url)
  return resp
}

// 充电频次分布
export const getKcMcCount = async () => {
  const url = interFaceUrl.KcMcCount
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      // B: 0,
      K: item.K,
      KSymoble: item.K,
      M: item.M,
      MSymoble: item.M,
      Z: item.Z,
      ZSymoble: item.Z,
    }
  })
  return resp
}

// 充电过程温度分布
export const getChargeTemp = async (No = 'RESULT_BS03_007_01') => {
  const url = isProd ? `${interFaceUrl.ChargeTemp}${No}` : '/ChargeTemp'
  const resp = await http.get(url, {
    cache: {
      key: `api-cache-getChargeTemp$-${No}`, // 缓存的键名，用于唯一标识缓存数据
      forceUpdate: false, // 是否强制刷新缓存，默认为 false
      exclude: {
        // {Array} List of regular expressions to match against request URLs.
        methods: ['post', 'patch', 'put', 'delete'],
      },
      shouldCache: (cacheData) => {
        // 自定义缓存策略的回调函数，返回 true 表示使用缓存，返回 false 表示忽略缓存
        return cacheData && cacheData.data.length > 0
      },
    },
  })
  const nameArr = resp.data.map((item) => item['BSNAME'])
  const coordsKcData = [
    {
      coords: [],
    },
  ]
  const lineArrKcData = resp.data.map((item, idx) => [idx + 1, item['KVALUE']])
  const smoothLineKcData = smoothLine(lineArrKcData)
  coordsKcData[0].coords = smoothLineKcData.map((item) => [item[0], item[1]])

  const coordsMcData = [
    {
      coords: [],
    },
  ]
  const lineArrMcData = resp.data.map((item, idx) => [idx + 1, item['MVALUE']])
  const smoothLineMcData = smoothLine(lineArrMcData)
  coordsMcData[0].coords = smoothLineMcData.map((item) => [item[0], item[1]])

  resp.data = {
    xAxis: nameArr,
    kvalue: smoothLineKcData,
    mvalue: smoothLineMcData,
    kLinesValue: coordsKcData,
    mLinesValue: coordsMcData,
  }
  return resp
}

//充电过程SOC分布
export const getChargeSoc = async (No = 'RESULT_BS03_009_01') => {
  const url = isProd ? `${interFaceUrl.ChargeSoc}${No}` : '/ChargeSoc'
  const resp = await http.get(url, {
    cache: {
      key: `api-cache-getChargeSoc-${No}`, // 缓存的键名，用于唯一标识缓存数据
      forceUpdate: false, // 是否强制刷新缓存，默认为 false
      exclude: {
        // {Array} List of regular expressions to match against request URLs.
        methods: ['post', 'patch', 'put', 'delete'],
      },
      shouldCache: (cacheData) => {
        // 自定义缓存策略的回调函数，返回 true 表示使用缓存，返回 false 表示忽略缓存
        return cacheData && cacheData.data.length > 0
      },
    },
  })
  const valArr = resp.data.map((item) => item.KSVALUE)
  const topVal = valArr.reduce((prev, next) => Math.max(prev, next))
  resp.data = resp.data.map((item) => {
    return {
      name: item.BSNAME,
      KBg: Math.ceil(topVal / 100) * 100 + 100,
      KBar: item.KSVALUE,
      KPBar: item.MSVALUE,
      MLine: item.MSVALUE,
    }
  })
  return resp
}
