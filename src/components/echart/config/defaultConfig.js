import { textColors } from './color'

const pure = ''

const xAxis = {
  name: '',
  type: 'category',
  show: true,
  splitLine: {
    show: false,
    lineStyle: {
      type: 'dashed',
      color: 'rgba(126, 137, 164, 0.5)',
      width: 1,
    },
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(126, 137, 164, 0.5)',
      width: 1,
      type: 'solid',
    },
  },
  axisTick: {
    show: true,
    lineStyle: {
      color: '#BAE7FF',
      width: 1,
      type: 'solid',
    },
  },
  axisPointer: {
    show: true,
  },
  axisLabel: {
    show: true,
    color: textColors.light,
    fontSize: 12,
  },
  inverse: false,
}

const yAxis = {
  name: '',
  type: 'value',
  show: true,
  splitLine: {
    show: true,
    lineStyle: {
      color: 'rgba(126, 137, 164, 0.3)',
      type: 'dashed',
      width: 1,
    },
  },
  inverse: false,
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(126, 137, 164, .5)',
      width: 1,
      type: 'solid',
    },
  },
  axisLabel: {
    show: true,
    color: textColors.light,
    fontSize: 12,
  },
  axisTick: { show: false, inside: true },
  position: 'left',
  offset: 0,
}

const legend = {
  show: true,
  textStyle: {
    color: textColors.normal,
    fontSize: 10,
  },
  itemWidth: 10,
  itemHeight: 10,
  right: 0,
  top: 0,
}

const tooltip = {
  show: true,
  trigger: 'axis',
  backgroundColor: 'rgba(0,0,0,.5)',
  borderWidth: 0,
  textStyle: {
    color: '#fff',
    fontSize: 12,
  },
  axisPointer: {
    type: 'shadow',
    label: {
      backgroundColor: '#6a7985',
    },
  },
}

const grid = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60,
}

const dataset = {
  source: [
    { name: '衬衫', value: 823 },
    { name: '羊毛衫', value: 235 },
    { name: '雪纺衫', value: 1042 },
    { name: '裤子', value: 988 },
    {
      name: '高跟鞋',
      value: 988,
    },
    {
      name: '袜子',
      value: 920,
    },
  ],
}

const barSeries = {
  type: 'bar',
  barWidth: 9,
}

const lineSeries = {
  name: '',
  type: 'line',
  yAxisIndex: 0,
  smooth: true,
  symbol: 'none',
  lineStyle: {
    width: 3,
  },
}

const lineNoAreaSeries = {
  name: '',
  type: 'line',
  yAxisIndex: 0,
  smooth: false,
  showSymbol: true,
  symbol: 'circle',
  symbolSize: 6,
  lineStyle: {
    width: 2,
  },
  itemStyle: {
    color: 'rgba(31, 69, 99, 1)',
    borderWidth: 2,
  },
}

const gaugeSeries = {
  name: '',
  type: 'gauge',
  data: [
    {
      name: '',
      value: 0,
      itemStyle: {
        color: '#5a6fc0',
      },
      title: {
        show: false,
        color: '#fff',
        fontSize: 30,
        offsetCenter: [0, '-40%'],
      },
      detail: {
        show: false,
        color: '#5a6fc0',
        fontSize: 30,
        offsetCenter: [0, '-28%'],
        valueAnimation: true,
      },
    },
  ],
  startAngle: 225,
  endAngle: -45,
  progress: {
    show: false,
    overlap: false,
    roundCap: true,
  },
  pointer: {
    show: true,
    itemStyle: {
      color: '#ffffff',
    },
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#fff',
    },
  },
  axisTick: {
    show: true,
    lineStyle: {
      color: '#fff',
    },
  },
  axisLabel: {
    show: true,
    color: '#fff',
    distance: 15,
    fontSize: 26,
  },
  detail: {
    show: true,
  },
  axisLine: {
    show: true,
    lineStyle: {
      width: 10,
      color: [[1, '#E6EBF8']],
    },
  },
}

const pieSeries = {
  radius: ['29%', '52%'],
  center: ['50%', '50%'],
  minAngle: 10,
  type: 'pie',
  label: {
    width: 120,
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    distanceToLabelLine: 2,
    formatter: (params) => {
      return params.percent + '%'
    },
  },
  labelLine: {
    show: true,
    length: 4,
    length2: 5,
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.4)',
    },
  },
}

const scatterSeries = {
  type: 'scatter',
  showSymbol: true,
  symbol: 'circle',
  symbolSize: 12,
}

const backgroundColor = pure

const animationDuration = 1200

const seriesOpt = {
  bar: barSeries,
  line: lineSeries,
  pie: pieSeries,
  gauge: gaugeSeries,
  lineNoArea: lineNoAreaSeries,
  scatter: scatterSeries,
}
export {
  xAxis,
  yAxis,
  legend,
  tooltip,
  grid,
  dataset,
  backgroundColor,
  animationDuration,
  seriesOpt,
}
