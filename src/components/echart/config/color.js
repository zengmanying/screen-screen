export class Linear {
  type = 'linear'
  x = 0
  y = 0
  x2 = 0
  y2 = 0
  colorStops = [
    {
      offset: 0,
      color: '#073059', // 0% 处的颜色
    },
    {
      offset: 1,
      color: '#17b8ee', // 100% 处的颜色
    },
  ]
  global = false // 缺省为 false
  constructor(color0, color1, categoryY = true) {
    color0 && (this.colorStops[0].color = color0)
    color1 && (this.colorStops[1].color = color1)
    categoryY ? (this.y = 1) : (this.x = 1)
  }
}

export class Radial {
  type = 'radial'
  x = 0.5
  y = 0.5
  r = 0.5
  colorStops = [
    {
      offset: 0,
      color: '#073059', // 0% 处的颜色
    },
    {
      offset: 1,
      color: '#17b8ee', // 100% 处的颜色
    },
  ]
  global = false // 缺省为 false
  constructor(color0, color1) {
    color0 && (this.colorStops[0].color = color0)
    color1 && (this.colorStops[1].color = color1)
  }
}

export const textColors = {
  dark: 'rgba(255, 255, 255, 1)',
  normal: 'rgba(255,255,255, .85)',
  light: 'rgba(126, 137, 164, 1)',
}

const defaultChartColors = [
  ['rgba(24, 127, 233, .35)', 'rgba(24, 127, 233, 1)'],
  ['rgba(30, 231, 231, .35)', 'rgba(30, 231, 231, 1)'],
  ['rgba(120, 101, 241, .35)', 'rgba(120, 101, 241, 1)'],
  ['rgba(186, 231, 255, .35)', 'rgba(186, 231, 255, 1)'],
  ['rgba(254, 219, 150, .35)', 'rgba(254, 219, 150, 1)'],
  ['rgba(30, 189, 137, .35)', 'rgba(30, 189, 137, 1)'],
  ['rgba(233, 131, 227, .35)', 'rgba(233, 131, 227, 1)'],
]

export class ChartThemeColor {
  static pureColors
  static colors = []
  constructor(opt) {
    if (Array.isArray(opt[0])) {
      ChartThemeColor.pureColors = opt.map((item) => item[1])
      ChartThemeColor.colors = opt.map((item) => new Linear(item[0], item[1]))
    } else {
      ChartThemeColor.pureColors = opt
      ChartThemeColor.colors = opt
    }
    console.log(ChartThemeColor.colors)
  }
}

const createChartThemeColor = (opt = defaultChartColors) => {
  new ChartThemeColor(opt)
}

export default createChartThemeColor
