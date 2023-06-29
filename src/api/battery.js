import http from '@/api/http'

const loadEnv = () => {
  return import.meta.env
}

const isProd = loadEnv().MODE === 'production'

// 预警算法应用总数
export const getAlgorithmTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=PREWARNING&SQL_REF=RESULT_PREWARNING_ALGORITHM_TOTAL'
    : '/warning-algorithm-total'
  const resp = await http.get(url)
  resp.data.totalCount = resp.data[0].TOTALCOUNT
  return resp
}

// 市场车辆识别率
export const getRecognitionRate = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=PREWARNING&SQL_REF=RESULT_PREWARNING_ADDACCUM5_RATE'
    : '/market-recognition-rate'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: `${item.NAME.split('-')[1]}月`,
      NEWCAR: item.NEWCAR,
      HISTORYCAR: item.HISTORYCAR,
      TOTALRATE: (item.TOTALRATE / 100).toFixed(2),
      NEWRATE: (item.NEWRATE / 100).toFixed(2),
    }
  })
  return resp
}

// 预警车辆检出率/准确率统计
export const getAccuracyRate = async () => {
  const url = isProd
    ? 'service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=PREWARNING&SQL_REF=RESULT_PREWARNING_DETECTION_ACCURATE5M'
    : '/detection-accuracy-statistics'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: `${item.NAME.split('-')[1]}月`,
      TOTALCAR: item.TOTALCAR,
      UNDERREPAIRCAR: item.UNDERREPAIRCAR,
      WARINGREPAIRCAR: item.WARINGREPAIRCAR,
      DETECTIONRATE: (item.DETECTIONRATE / 100).toFixed(2),
      ACCURACYRATE: (item.ACCURACYRATE / 100).toFixed(2),
    }
  })
  return resp
}

// 预警车辆风险等级分布
export const getRiskLevel = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=PREWARNING&SQL_REF=RESULT_PREWARNING_RISK_RATIO'
    : '/risk-level'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      value: item.VALUE,
    }
  })
  return resp
}

// 各项目预警车辆数量分布
export const getWarnCarNum = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=PREWARNING&SQL_REF=RESULT_PREWARNING_CARCNT_DISTRIBUTION'
    : '/project-warning-car-num'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      value: item.VALUE,
    }
  })
  return resp
}

// 各算法预警车辆数量分布
export const getAlgorithmCarNum = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=PREWARNING&SQL_REF=RESULT_PREWARNING_HIT_SITUATION'
    : '/algorithm-warning-car-num'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      value: item.VALUE,
    }
  })
  return resp
}

// 预警车辆里程分布
export const getCarMileage = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=PREWARNING&SQL_REF=RESULT_PREWARNING_ODOSCOPE_DISTRIBUTION'
    : '/waring-car-mileage'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      value: item.VALUE,
    }
  })
  return resp
}
