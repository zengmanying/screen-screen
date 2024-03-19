// import http from '@/api/http'

// const loadEnv = () => {
//   return import.meta.env
// }

// const isProd = loadEnv().MODE === 'production'

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

// 充电过程温度分布
// export const getChargeTemp = async (No = 'RESULT_BS03_007_01') => {
//   const url = isProd ? `${interFaceUrl.value.ChargeTemp}${No}` : '/ChargeTemp'
//   const resp = await http.get(url, {
//     cache: {
//       key: `api-cache-getChargeTemp$-${No}`, // 缓存的键名，用于唯一标识缓存数据
//       forceUpdate: false, // 是否强制刷新缓存，默认为 false
//       exclude: {
//         // {Array} List of regular expressions to match against request URLs.
//         methods: ['post', 'patch', 'put', 'delete'],
//       },
//       shouldCache: (cacheData) => {
//         // 自定义缓存策略的回调函数，返回 true 表示使用缓存，返回 false 表示忽略缓存
//         return cacheData && cacheData.data.length > 0
//       },
//     },
//   })
//   const nameArr = resp.data.map((item) => item['BSNAME'])
//   const coordsKcData = [
//     {
//       coords: [],
//     },
//   ]
//   const lineArrKcData = resp.data.map((item, idx) => [idx + 1, item['KVALUE']])
//   const smoothLineKcData = smoothLine(lineArrKcData)
//   coordsKcData[0].coords = smoothLineKcData.map((item) => [item[0], item[1]])

//   const coordsMcData = [
//     {
//       coords: [],
//     },
//   ]
//   const lineArrMcData = resp.data.map((item, idx) => [idx + 1, item['MVALUE']])
//   const smoothLineMcData = smoothLine(lineArrMcData)
//   coordsMcData[0].coords = smoothLineMcData.map((item) => [item[0], item[1]])

//   resp.data = {
//     xAxis: nameArr,
//     kvalue: smoothLineKcData,
//     mvalue: smoothLineMcData,
//     kLinesValue: coordsKcData,
//     mLinesValue: coordsMcData,
//   }
//   return resp
// }
