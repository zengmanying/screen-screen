/**
 *判断对象是否是一个纯粹的对象
 */
export function isPlainObject(obj) {
  return (
    typeof obj === 'object' &&
    Object.prototype.toString.call(obj) === '[object Object]'
  )
}

export function changeTo2dArray(arr, per) {
  const slideNum = Math.ceil(arr.length / per)
  const twoDArray = []
  for (let i = 0; i < slideNum; i++) {
    const tempArr = arr.slice(i * per, (i + 1) * per)
    twoDArray.push(tempArr)
  }
  return twoDArray
}

/**
 *深度合并多个对象的方法
 */
export function deepAssign() {
  let len = arguments.length,
    target = arguments[0]
  if (!isPlainObject(target)) {
    target = {}
  }
  for (let i = 1; i < len; i++) {
    let source = arguments[i]
    if (isPlainObject(source)) {
      for (let s in source) {
        if (s === '__proto__' || target === source[s]) {
          continue
        }
        if (isPlainObject(source[s])) {
          target[s] = deepAssign(target[s], source[s])
        } else {
          target[s] = source[s]
        }
      }
    }
  }
  return target
}

/**
 * 图表增加采样
 */

// 二次贝塞尔曲线
function bezier2(p0, p1, p2, t) {
  const t2 = t * t
  const m = 1 - t
  const m2 = m * (1 - t)
  return p0 * m2 + 2 * p1 * t * m + p2 * t2
}

// 三次贝塞尔曲线
function bezier3(p0, p1, p2, p3, t) {
  const t2 = t * t
  const t3 = t * t2
  const m = 1 - t
  const m2 = m * (1 - t)
  const m3 = m2 * (1 - t)
  return p0 * m3 + 3 * p1 * t * m2 + 3 * p2 * t2 * m + p3 * t3
}

function getMidPoint(p0, p1) {
  const x0 = p0[0]
  const y0 = p0[1]
  const x1 = p1[0]
  const y1 = p1[1]
  return [(x0 + x1) / 2, (y0 + y1) / 2]
}

function movePoint(p, v) {
  const px = p[0]
  const py = p[1]
  const vx = v[0]
  const vy = v[1]
  return [px + vx, py + vy]
}

function getVector(p0, p1) {
  const x0 = p0[0]
  const y0 = p0[1]
  const x1 = p1[0]
  const y1 = p1[1]
  return [x1 - x0, y1 - y0]
}

export function smoothLine(points, smooth = 50) {
  const len = points.length
  if (len < 3) {
    return points
  }
  const newPoints = []
  const controls = []
  for (let i = 0; i < len - 2; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const p2 = points[i + 2]
    const m1 = getMidPoint(p0, p1)
    const m2 = getMidPoint(p1, p2)
    const m = getMidPoint(m1, m2)
    const v = getVector(m, p1)
    const _m1 = movePoint(m1, v)
    const _m2 = movePoint(m2, v)
    // 起点
    if (i === 0) {
      for (let j = 0; j < smooth; j++) {
        const x = bezier2(p0[0], _m1[0], p1[0], j / smooth)
        const y = bezier2(p0[1], _m1[1], p1[1], j / smooth)
        newPoints.push([x, y, ...p0])
      }
      controls.push(_m1)
      controls.push(_m2)
    } else {
      for (let j = 0; j < smooth; j++) {
        const prev = controls[controls.length - 1]
        const x = bezier3(p0[0], prev[0], _m1[0], p1[0], j / smooth)
        let y = bezier3(p0[1], prev[1], _m1[1], p1[1], j / smooth)
        if (y < 0) {
          y = 0
        }
        newPoints.push([x, y, ...p0])
      }
      controls.push(_m1)
      controls.push(_m2)
      // 结束
      if (i === len - 3) {
        for (let j = 0; j <= smooth; j++) {
          const x = bezier2(p1[0], _m2[0], p2[0], j / smooth)
          const y = bezier2(p1[1], _m2[1], p2[1], j / smooth)
          newPoints.push([x, y, ...p0])
        }
      }
    }
  }
  return newPoints
}

// 每天凌晨更新接口数据
export const updateDataInBeforeDawn = (cb) => {
  var now = new Date()
  var tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  )
  var timeToMidnight = tomorrow - now
  let interval = null
  // 终止循环
  clearInterval(interval)
  interval = setTimeout(function () {
    cb() // 执行更新数据的操作
    updateDataInBeforeDawn(cb) // 启动下一个定时器
  }, timeToMidnight)
}

// 半小时更新接口数据
export const updateDataByHalfHour = (cb) => {
  let interval = null
  // 终止循环
  clearInterval(interval)
  const startTime = new Date()
  let segmentation = Math.floor(
    (startTime.getHours() * 60 + startTime.getMinutes()) / 30
  )
  interval = setInterval(() => {
    segmentation++
    cb(segmentation)
  }, 30 * 60 * 1000)
}

export class UpdateDataByFiveMinu {
  currentEndVal = 0
  currentStartVal = 0
  maxIncrement = 0
  minIncrement = 0
  startTime = new Date()
  endTime = new Date(this.startTime)
  constructor(end_value, intervalTime, randomRange = 200) {
    this.end_value = end_value
    const copies = (24 * 60 * 60 * 1000) / intervalTime
    this.maxIncrement = Math.floor(end_value / copies)
    this.minIncrement = this.maxIncrement - randomRange
    this.endTime.setHours(23)
    this.endTime.setMinutes(59)
    this.intervalTime = intervalTime
  }

  initFn = () => {
    this.currentEndVal = Math.floor(
      ((this.startTime.getHours() * 60 * 60 * 1000 +
        this.startTime.getMinutes() * 60 * 1000 +
        this.startTime.getSeconds() * 1000) /
        this.intervalTime) *
        this.maxIncrement
    )
    return this.currentEndVal
  }

  updateFn = () => {
    this.startTime = new Date()
    if (this.startTime < this.endTime && this.currentEndVal < this.end_value) {
      // 生成随机数并添加到起始值上
      const random =
        Math.floor(
          Math.random() * (this.maxIncrement - this.minIncrement + 1)
        ) + this.minIncrement
      this.currentStartVal = this.currentEndVal
      this.currentEndVal += random
    } else {
      // 最后将起始值设为结束值
      this.currentEndVal = this.end_value
    }
    return {
      currentStartVal: this.currentStartVal,
      currentEndVal: this.currentEndVal,
    }
  }
}
