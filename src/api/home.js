import http from '@/api/http'

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
export const getWarningMarketTotal = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_TOTAL_DATA'
  )
}

// 预警集市每日处理
export const getWarningDailyProcess = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_DAILY_PROCESS'
  )
}

// 预警集市每日充电次数
export const getWarningDailyCharge = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_DAY_CHARGE'
  )
}

// 车型数量
export const getCarModelTotal = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_CARMODEL_TOTAL'
  )
}

// 车辆总数
export const getCarNumTotal = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_CARNUM_TOTAL'
  )
}

// 活跃车辆总数
export const getCarActiveNumTotal = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_CARNUM_TOTAL'
  )
}

// 车辆区域分布
export const getCarVehicleArea = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_VEHICLE_AREA'
  )
}

// 里程分布
export const getCarMileageDistribute = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_MILEAGE_DISTRIBUTE'
  )
}

// 算法应用总数
export const getWarnAlgoTotal = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_TOTAL_WARNALGO'
  )
}

// 预警指标-识别率
export const getAddaccumRate = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_ADDACCUM_RATE'
  )
}

// 预警指标-检出率-准确率
export const getAccuRate = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_DETECTION_ACCURATE'
  )
}

// 近6月实销车辆统计图表
export const getActualSales = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_ACTUAL_SALES'
  )
}

// top5
export const getSalesTop5 = () => {
  return http.get(
    '/service?X_SERVICE_CODE=AI.SVC.query&TAB_NAME=OVERVIEW&SQL_REF=RESULT_OVERVIEW_SALES_TOP5'
  )
}
