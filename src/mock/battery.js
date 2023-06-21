export const getAlgorithmTotal = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: {
      totalCount: 51,
    },
  }
}

export const getRecognitionRate = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '1月',
        newCar: 823,
        historyCar: 1000,
        totalRate: 0.5,
        newRate: 0.8,
      },
      {
        name: '2月',
        newCar: 823,
        historyCar: 1200,
        totalRate: 0.6,
        newRate: 0.8,
      },
      {
        name: '3月',
        newCar: 2200,
        historyCar: 1800,
        totalRate: 0.7,
        newRate: 0.8,
      },
      {
        name: '4月',
        newCar: 823,
        historyCar: 1400,
        totalRate: 0.9,
        newRate: 0.5,
      },
      {
        name: '5月',
        newCar: 1500,
        historyCar: 1600,
        totalRate: 0.8,
        newRate: 0.6,
      },
    ],
  }
}

export const getAccuracyRate = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '1月',
        waringRepairCar: 823,
        totalCar: 1000,
        underRepairCar: 400,
        detectionRate: 0.5,
        accuracyRate: 0.8,
      },
      {
        name: '2月',
        waringRepairCar: 823,
        totalCar: 1200,
        underRepairCar: 800,
        detectionRate: 0.6,
        accuracyRate: 0.8,
      },
      {
        name: '3月',
        waringRepairCar: 2200,
        totalCar: 1800,
        underRepairCar: 900,
        detectionRate: 0.7,
        accuracyRate: 0.8,
      },
      {
        name: '4月',
        waringRepairCar: 823,
        totalCar: 1400,
        underRepairCar: 1000,
        detectionRate: 0.9,
        accuracyRate: 0.5,
      },
      {
        name: '5月',
        waringRepairCar: 1500,
        totalCar: 1600,
        underRepairCar: 1200,
        detectionRate: 0.8,
        accuracyRate: 0.6,
      },
    ],
  }
}

export const getRiskLevel = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '低风险',
        value: 323,
      },
      {
        name: '中风险',
        value: 723,
      },
      {
        name: '高风险',
        value: 523,
      },
    ],
  }
}

export const getWarnCarNum = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '项目001',
        value: 823,
        symbol: 823,
      },
      {
        name: '项目002',
        value: 723,
        symbol: 723,
      },
      {
        name: '项目003',
        value: 523,
        symbol: 523,
      },
      {
        name: '项目004',
        value: 823,
        symbol: 823,
      },
      {
        name: '项目005',
        value: 723,
        symbol: 723,
      },
      {
        name: '项目006',
        value: 523,
        symbol: 523,
      },
      {
        name: '项目007',
        value: 823,
        symbol: 823,
      },
      {
        name: '项目008',
        value: 723,
        symbol: 723,
      },
      {
        name: '项目009',
        value: 523,
        symbol: 523,
      },
      {
        name: '项目010',
        value: 823,
        symbol: 823,
      },
      {
        name: '项目011',
        value: 723,
        symbol: 723,
      },
      {
        name: '项目012',
        value: 523,
        symbol: 523,
      },
      {
        name: '项目013',
        value: 823,
        symbol: 823,
      },
      {
        name: '项目014',
        value: 723,
        symbol: 723,
      },
      {
        name: '项目015',
        value: 523,
        symbol: 523,
      },
      {
        name: '项目016',
        value: 823,
        symbol: 823,
      },
      {
        name: '项目017',
        value: 723,
        symbol: 723,
      },
      {
        name: '项目018',
        value: 523,
        symbol: 523,
      },
    ],
  }
}

export const getAlgorithmCarNum = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '40℃过温时长',
        value: 823,
        symbol: 823,
      },
      {
        name: '45℃过温时长',
        value: 723,
        symbol: 723,
      },
      {
        name: '电池温度过高',
        value: 823,
        symbol: 823,
      },
      {
        name: '温度跳变',
        value: 723,
        symbol: 723,
      },
      {
        name: '温差离散',
        value: 523,
        symbol: 523,
      },
      {
        name: '压差预警',
        value: 823,
        symbol: 823,
      },
      {
        name: 'ΔSOC绝对值',
        value: 723,
        symbol: 723,
      },
      {
        name: 'ΔSOC变化率',
        value: 523,
        symbol: 523,
      },
      {
        name: '压差一致性',
        value: 523,
        symbol: 523,
      },
      {
        name: '40℃过温时长',
        value: 823,
        symbol: 823,
      },
      {
        name: '45℃过温时长',
        value: 723,
        symbol: 723,
      },
      {
        name: '电池温度过高',
        value: 823,
        symbol: 823,
      },
      {
        name: '温度跳变',
        value: 723,
        symbol: 723,
      },
      {
        name: '温差离散',
        value: 523,
        symbol: 523,
      },
      {
        name: '压差预警',
        value: 823,
        symbol: 823,
      },
      {
        name: 'ΔSOC绝对值',
        value: 723,
        symbol: 723,
      },
      {
        name: 'ΔSOC变化率',
        value: 523,
        symbol: 523,
      },
      {
        name: '压差一致性',
        value: 523,
        symbol: 523,
      },
    ],
  }
}

export const getCarMileage = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '[0-5]',
        value: 823,
      },
      {
        name: '(5-10]',
        value: 723,
      },
      {
        name: '(10-15]',
        value: 523,
      },
      {
        name: '(15-20]',
        value: 823,
      },
      {
        name: '(20-30]',
        value: 723,
      },
      {
        name: '30以上',
        value: 523,
      },
    ],
  }
}

export const getOverTemplate = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      {
        name: '[0,20)',
        count: 100,
        status: 0,
      },
      {
        name: '[20,40)',
        count: 50,
        status: 0,
      },
      {
        name: '[40,60)',
        count: 100,
        status: 0,
      },
      {
        name: '[60,80)',
        count: 140,
        status: 0,
      },
      {
        name: '[80,100)',
        count: 105,
        status: 0,
      },
      {
        name: '[100,120)',
        count: 150,
        status: 1,
      },
      {
        name: '[120,140)',
        count: 220,
        status: 1,
      },
      {
        name: '[140,160)',
        count: 150,
        status: 1,
      },
      {
        name: '[160,180)',
        count: 80,
        status: 1,
      },
      {
        name: '[180,200)',
        count: 100,
        status: 2,
      },
      {
        name: '[200,220)',
        count: 160,
        status: 2,
      },
      {
        name: '[220,240)',
        count: 180,
        status: 2,
      },
      {
        name: '[240,260)',
        count: 120,
        status: 3,
      },
      {
        name: '[260,280)',
        count: 100,
        status: 3,
      },
      {
        name: '[280,∞)',
        count: 100,
        status: 3,
      },
    ],
  }
}

export const getWorkingWarning = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      [0, -11, 0.5, 0],
      [-10, 0, 0.5, 1],
      [-20, 10, 0.2, 2],
      [4, 20, 0.6, 0],
      [4, 10, 1, 0],
      [-1, 0, 0.5, 0],
      [-18, 10, 0.5, 1],
      [10, 9, 0.1, 2],
      [5, -11, 0.5, 2],
      [-10, 5, 0.5, 2],
      [-20, 10, 0.2, 1],
      [4, 10, 0.6, 1],
      [4, 6, 0.3, 0],
      [-1, 3, 0.5, 0],
      [-18, 1, 0.5, 0],
      [10, 2, 0.1, 0],
    ],
  }
}

export const getSoh = () => {
  return {
    state: 'OK',
    resultCode: '200',
    resultMessage: '成功',
    data: [
      [5, 323],
      [5, 167],
      [5, 284],
      [10, 413],
      [13, 217],
      [20, 587],
      [35, 487],
      [50, 287],
    ],
  }
}
