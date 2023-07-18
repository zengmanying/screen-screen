import http from '@/api/http'
import { smoothLine } from '@/utils'

const loadEnv = () => {
  return import.meta.env
}

const isProd = loadEnv().MODE === 'production'

// 车辆属性
export const getCarAttribute = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_001'
    : '/car-attribute'
  const resp = await http.get(url)
  return resp
}

// 总里程分布
export const getMileageTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_002'
    : '/MileageTotal'
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
  const url = isProd
    ? 'service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_003'
    : '/MileageDaily'
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
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_004'
    : '/TimeDaily'
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
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_005'
    : '/KcMcRate'
  const resp = await http.get(url)
  return resp
}

// 充电频次分布
export const getKcMcCount = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_006'
    : '/KcMcCount'
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
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=${No}`
    : '/ChargeTemp'
  const resp = await http.get(url)
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
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=${No}`
    : '/ChargeSoc'
  const resp = await http.get(url)
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
