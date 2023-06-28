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
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_TOTAL_DATA'
    : '/warning'
  const resp = await http.get(url)
  resp.data.overall = resp.data[0].OVERALL
  return resp
}

// 预警集市每日处理
export const getWarningDailyProcess = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_DAILY_PROCESS'
    : '/warning2'
  const resp = await http.get(url)
  resp.data.dailyProcess = resp.data[0].DAILYPROCESS
  return resp
}

// 预警集市每日充电次数
export const getWarningDailyCharge = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_DAY_CHARGE'
    : '/warning3'
  const resp = await http.get(url)
  resp.data.dailyVehicle = resp.data[0].DAILYVEHICLE
  return resp
}

// 车型数量
export const getCarModelTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_CARMODEL_TOTAL'
    : '/carModelNum'
  const resp = await http.get(url)
  resp.data.typesCount = resp.data[0].TYPESCOUNT
  return resp
}

// 车辆总数
export const getCarNumTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_CARNUM_TOTA'
    : '/carTotalNum'
  const resp = await http.get(url)
  resp.data.totalTypes = resp.data[0]
  resp.data.totalTypes.total = resp.data.totalTypes.TOTAL
  return resp
}

// 活跃车辆总数
export const getCarActiveNumTotal = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_HYCAR_TOTALNUM'
    : '/carActiveNum'
  const resp = await http.get(url)
  resp.data.activeTypes = resp.data[0]
  resp.data.activeTypes.total = resp.data.activeTypes.TOTAL
  return resp
}

// 车辆区域分布
export const getCarVehicleArea = async (segmentation) => {
  const url = isProd
    ? `/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_VEHICLE_AREA&segmentation=${segmentation}`
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
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_MILEAGE_DISTRIBUTE'
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
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_TOTAL_WARNALGO'
    : '/tagscloud'
  const resp = await http.get(url)
  resp.data.total = resp.data[0].TOTAL
  return resp
}

export const getTagscloudWeek = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_DISPLAY_WEEKLY'
    : '/tagscloudWeek'
  const resp = await http.get(url)
  resp.data = eval('(' + resp.data[0].WEEKLY + ')')
  return resp
}

export const getTagscloudMonth = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_DISPLAY_MONTHLY'
    : '/tagscloudMonth'
  const resp = await http.get(url)
  resp.data = eval('(' + resp.data[0].MONTHLY + ')')
  return resp
}

// 预警指标-识别率
export const getAddaccumRate = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_ADDACCUM_RATE'
    : '/warning-gauge'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: item.NAME, value: item.VALUE / 100 }
  })
  return resp
}

// 预警指标-检出率-准确率
export const getAccuRate = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_DETECTION_ACCURATE'
    : '/warning-gauge2'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: item.NAME, value: item.VALUE / 100 }
  })
  return resp
}

// 近6月实销车辆统计图表
export const getActualSales = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_ACTUAL_SALES'
    : '/six-month-sale-statistics'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: `${item.NAME.split('-')[1]}月`, value: item.VALUE }
  })
  return resp
}

// top5
export const getSalesTop5 = async () => {
  const url = isProd
    ? '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_SALES_TOP5'
    : '/top-5'
  const resp = await http.get(url)
  resp.data = resp.data.map((item) => {
    return { name: item.NAME, value: item.VALUE }
  })
  return resp
}
