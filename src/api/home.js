import http from '@/api/http'

const loadEnv = () => {
  return import.meta.env
}

const isProd = loadEnv().MODE === 'production'

// GET 请求
// http
//   .get('/users')
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// POST 请求
// http
//   .post('/users', { name: 'John Doe' })
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// 预警集市总数
export const getWarningMarketTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_008'
    : '/warning'
  const resp = await http.get(url)
  resp.data.overall = resp.data[0].OVERALL
  return resp
}

// 预警集市每日处理
export const getWarningDailyProcess = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=bs01&SQL_REF=RESULT_BS01_009'
    : '/warning2'
  const resp = await http.get(url)
  resp.data.dailyProcess = resp.data[0].DAILYPROCESS
  return resp
}

// 预警集市每日充电次数
export const getWarningDailyCharge = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_010'
    : '/warning3'
  const resp = await http.get(url)
  resp.data.dailyVehicle = resp.data[0].DAILYVEHICLE
  return resp
}

// 车型数量
export const getCarModelTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_001'
    : '/carModelNum'
  const resp = await http.get(url)
  resp.data.typesCount = resp.data[0].TYPESCOUNT
  return resp
}

// 车辆总数
export const getCarNumTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_002'
    : '/carTotalNum'
  const resp = await http.get(url)
  resp.data.totalTypes = resp.data[0]
  resp.data.totalTypes.total = resp.data.totalTypes.TOTAL
  return resp
}

// 活跃车辆总数
export const getCarActiveNumTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_003'
    : '/carActiveNum'
  const resp = await http.get(url)
  resp.data.activeTypes = resp.data[0]
  // resp.data.activeTypes.total = resp.data.activeTypes.TOTAL
  return resp
}

// 车辆区域分布
export const getCarVehicleArea = async (segmentation) => {
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_006&segmentation=${segmentation}`
    : '/map'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: item.NAME,
      value: item.VALUE,
      cityName: item.CITYNAME,
    }
  })
  return resp
}

// 里程分布
export const getCarMileageDistribute = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_007'
    : '/mileage'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: item.NAME, value: item.VALUE }
  })
  return resp
}

// 算法应用总数
export const getWarnAlgoTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_011'
    : '/tagscloud'
  const resp = await http.get(url)
  resp.data.total = resp.data[0].TOTAL
  return resp
}

export const getTagscloudWeek = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_012_WEEKLY'
    : '/tagscloudWeek'
  const resp = await http.get(url)
  resp.data = eval('(' + resp.data[0].WEEKLY + ')')
  return resp
}

export const getTagscloudMonth = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_012_MONTHLY'
    : '/tagscloudMonth'
  const resp = await http.get(url)
  resp.data = eval('(' + resp.data[0].MONTHLY + ')')
  return resp
}

export const getTagscloud = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_012'
    : '/tagscloud1'
  const resp = await http.get(url)
  resp.data.MECHANISM = eval('(' + resp.data[0].MECHANISM + ')')
  resp.data.MONITOR = eval('(' + resp.data[0].MONITOR + ')')
  resp.data.OPERATE = eval('(' + resp.data[0].OPERATE + ')')
  resp.data.HEALTH = eval('(' + resp.data[0].HEALTH + ')')
  return resp
}

// 预警指标-识别率
export const getAddaccumRate = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_013'
    : '/warning-gauge'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: item.NAME, value: item.VALUE / 100, max: item.MAX }
  })
  return resp
}

// 预警指标-检出率-准确率
export const getAccuRate = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_014'
    : '/warning-gauge2'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: item.NAME, value: item.VALUE / 100, max: item.MAX }
  })
  return resp
}

// 近6月实销车辆统计图表
export const getActualSales = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_004'
    : '/six-month-sale-statistics'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return {
      name: `${item.NAME.split('-')[1]}月`,
      value: item.VALUE,
    }
  })
  return resp
}

// top5
export const getSalesTop5 = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_005_01'
    : '/top-5'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: item.NAME, value: item.VALUE }
  })
  return resp
}

// top5-new
export const getSalesNewTop5 = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_005_02'
    : '/top-5'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: item.NAME, value: item.VALUE }
  })
  return resp
}

// 口径说明
export const getTips = async (pageName) => {
  let apiUrl = ''
  switch (pageName) {
    case 'Home':
      apiUrl =
        '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS01&SQL_REF=RESULT_BS01_015'
      break
    case 'AF':
      apiUrl =
        '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS03&SQL_REF=RESULT_BS03_010'
      break
    case 'BF':
      apiUrl =
        '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS04&SQL_REF=RESULT_BS04_010'
      break
    case 'Battery':
      apiUrl =
        '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=BS02&SQL_REF=RESULT_BS02_011'
  }
  const url = isProd ? apiUrl : '/tips'
  const resp = await http.get(url)
  return resp
}
