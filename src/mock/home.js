// 预警集市总数
export const getWarningMarketTotal = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      overall: 300,
    },
  }
}

// 预警集市每日处理
export const getWarningDailyProcess = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      dailyProcess: 20,
    },
  }
}

// 预警集市每日充电次数
export const getWarningDailyCharge = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      dailyVehicle: 100,
    },
  }
}

// 车型数量
export const getCarModelTotal = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      typesCount: 51,
    },
  }
}

// 车辆总数
export const getCarNumTotal = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      totalTypes: {
        total: 88341,
        A: 5342,
        B: 5341,
        C: 5341,
      },
    },
  }
}

// 活跃车辆总数
export const getCarActiveNumTotal = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      activeTypes: {
        total: 88341,
        A: 5341,
        B: 5342,
        C: 5341,
      },
    },
  }
}

// 车辆区域分布
export const getCarVehicleArea = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      linesData: {
        name: '北京',
        value: [
          [
            {
              name: '北京',
            },
            {
              name: '北京',
              value: 200,
            },
          ],
          [
            {
              name: '北京',
            },
            {
              name: '青岛',
              value: 200,
            },
          ],
          [
            {
              name: '北京',
            },
            {
              name: '广州',
              value: 90,
            },
          ],
          [
            {
              name: '北京',
            },
            {
              name: '昆明',
              value: 90,
            },
          ],
          [
            {
              name: '北京',
            },
            {
              name: '南京',
              value: 90,
            },
          ],
          [
            {
              name: '北京',
            },
            {
              name: '石家庄',
              value: 90,
            },
          ],
          [
            {
              name: '北京',
            },
            {
              name: '成都',
              value: 90,
            },
          ],
          [
            {
              name: '北京',
            },
            {
              name: '合肥',
              value: 90,
            },
          ],
          [
            {
              name: '北京',
            },
            {
              name: '西安',
              value: 90,
            },
          ],
        ],
      },
      hotData: [
        { name: '台湾', value: 45 },
        { name: '新疆', value: 76 },
        { name: '宁夏', value: 75 },
        { name: '青海', value: 18 },
        { name: '甘肃', value: 124 },
        { name: '陕西', value: 245 },
        { name: '西藏', value: 1 },
        { name: '云南', value: 174 },
        { name: '贵州', value: 146 },
        { name: '四川', value: 539 },
        { name: '重庆', value: 576 },
        { name: '海南', value: 168 },
        { name: '广西', value: 5252 },
        { name: '广东', value: 1352 },
        { name: '湖南', value: 4018 },
        { name: '湖北', value: 7743 },
        { name: '河南', value: 1272 },
        { name: '山东', value: 758 },
        { name: '江西', value: 935 },
        { name: '福建', value: 296 },
        { name: '安徽', value: 990 },
        { name: '浙江', value: 1215 },
        { name: '江苏', value: 631 },
        { name: '上海', value: 342 },
        { name: '黑龙江', value: 4481 },
        { name: '吉林', value: 93 },
        { name: '辽宁', value: 125 },
        { name: '内蒙古', value: 5675 },
        { name: '山西', value: 133 },
        { name: '河北', value: 318 },
        { name: '天津', value: 136 },
        { name: '北京', value: 428 },
      ],
    },
  }
}

// 里程分布
export const getCarMileageDistribute = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '0-5',
        value: 521,
      },
      {
        name: '5-10',
        value: 895,
      },
      {
        name: '10-15',
        value: 623,
      },
      {
        name: '15-20',
        value: 1435,
      },
      {
        name: '20-25',
        value: 1386,
      },
      {
        name: '25-30',
        value: 712,
      },
      {
        name: '30-35',
        value: 521,
      },
      {
        name: '35-40',
        value: 895,
      },
      {
        name: '40-45',
        value: 623,
      },
      {
        name: '45-50',
        value: 1435,
      },
      {
        name: '50-55',
        value: 1386,
      },
      {
        name: '55-60',
        value: 712,
      },
      {
        name: '60~∞',
        value: 498,
      },
    ],
  }
}

// 算法应用总数
export const getWarnAlgoTotal = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      total: 23,
    },
  }
}

// 预警指标-识别率
export const getAddaccumRate = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '新增识别率',
        value: 42.03,
      },
      {
        name: '累计识别率',
        value: 42.03,
      },
    ],
  }
}

// 预警指标-检出率-准确率
export const getAccuRate = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '检出率',
        value: 42.03,
      },
      {
        name: '准确率',
        value: 42.03,
      },
    ],
  }
}

// 近6月实销车辆统计图表
export const getActualSales = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '1月',
        value: 521,
      },
      {
        name: '2月',
        value: 623,
      },
      {
        name: '3月',
        value: 712,
      },
      {
        name: '4月',
        value: 895,
      },
      {
        name: '5月',
        value: 930,
      },
      {
        name: '6月',
        value: 1000,
      },
    ],
  }
}

// top5
export const getSalesTop5 = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: 'EU300',
        value: 5529,
      },
      {
        name: 'EC180',
        value: 5154,
      },
      {
        name: 'EX3',
        value: 3864,
      },
      {
        name: 'EU5',
        value: 2169,
      },
      {
        name: 'LITE',
        value: 1087,
      },
    ],
  }
}
