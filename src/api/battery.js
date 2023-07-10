import http from '@/api/http'

const loadEnv = () => {
  return import.meta.env
}

const isProd = loadEnv().MODE === 'production'

// 预警算法应用总数
export const getAlgorithmTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_001'
    : '/warning-algorithm-total'
  const resp = await http.get(url)
  resp.data.totalCount = resp.data[0].TOTALCOUNT
  return resp
}

// 市场车辆识别率
export const getRecognitionRate = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_002'
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
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_003'
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
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_004'
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
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_005'
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

// 各算法预警分布
export const getAlgorithmCarNum = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_006'
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
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_007'
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

// 过温时长及占比
export const getOverTemplate = async (sqlRef, project) => {
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=${sqlRef}&project=${project}`
    : '/over-temperature'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      count: +item.COUNT,
      status: item.STATUS,
    }
  })
  return resp
}

// 过温时长及占比项目号
export const getOverTemplateProject = async () => {
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_008_03`
    : '/over-temperature-project'
  const resp = await http.get(url)
  return resp
}

// soh项目号
export const getSohProject = async () => {
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_010_02`
    : '/soh-project'
  const resp = await http.get(url)
  return resp
}

// soh
export const getSoh = async (carModel) => {
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_010_01&car_model=${carModel}`
    : '/soh'
  const resp = await http.get(url)
  resp.data = JSON.parse(resp.data[0].CONCAT_VALUE)
  return resp
}
