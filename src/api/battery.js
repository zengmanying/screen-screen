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
      DATA_YEAR: item.DATA_YEAR,
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
      DATA_YEAR: item.DATA_YEAR,
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
  const resp = await http.get(url, {
    cache: {
      key: `api-cache-getOverTemplate-${sqlRef}-${project}`, // 缓存的键名，用于唯一标识缓存数据
      forceUpdate: false, // 是否强制刷新缓存，默认为 false
      shouldCache: (cacheData) => {
        // 自定义缓存策略的回调函数，返回 true 表示使用缓存，返回 false 表示忽略缓存
        return cacheData && cacheData.data.length > 0
      },
    },
  })
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

// 工况预警展示
export const getWorkingWarning = async (project) => {
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_009_01&project=${project}`
    : '/working-warning-show'
  const resp = await http.get(url, {
    cache: {
      key: `api-cache-getWorkingWarning-${project}`, // 缓存的键名，用于唯一标识缓存数据
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
  resp.percent = JSON.parse(resp.data[0].CONCAT_VALUE2)
  resp.scatterData = JSON.parse(resp.data[0].CONCAT_VALUE)
  return resp
}

// 工况预警展示项目号
export const getWorkingWarningProject = async () => {
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_009_02`
    : '/working-warning-project'
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
  const resp = await http.get(url, {
    cache: {
      key: `api-cache-getSoh-${carModel}`, // 缓存的键名，用于唯一标识缓存数据
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
  resp.data = JSON.parse(resp.data[0].CONCAT_VALUE)
  return resp
}
