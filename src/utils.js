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

export function formatRounNum(num) {
  let length = num.toString().length
  return Math.ceil(num / Math.pow(10, length - 1)) * Math.pow(10, length - 1)
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

// 每天凌晨更新接口数据
export const updateDataInBeforeDawn = (cb) => {
  var now = new Date()
  var tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    8,
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
  currentTime = new Date()
  end_time = new Date(this.currentTime)
  constructor(
    start_value,
    end_value,
    start_time,
    end_time,
    intervalTime,
    randomRange = 30
  ) {
    this.end_value = end_value
    this.start_value = start_value
    this.start_time = start_time
    this.end_time = end_time
    const copies = ((end_time - start_time) * 60 * 60 * 1000) / intervalTime
    this.maxIncrement = Math.floor((end_value - start_value) / copies)
    this.minIncrement = this.maxIncrement - randomRange
    this.intervalTime = intervalTime
  }

  initFn = () => {
    this.currentEndVal = Math.floor(
      (((this.currentTime.getHours() - this.start_time) * 60 * 60 * 1000 +
        this.currentTime.getMinutes() * 60 * 1000 +
        this.currentTime.getSeconds() * 1000) /
        this.intervalTime) *
        this.maxIncrement +
        this.start_value
    )
    return this.currentEndVal > this.end_value
      ? this.end_value
      : this.currentEndVal
  }

  updateFn = () => {
    this.currentTime = new Date()
    const currentTimeHour = this.currentTime.getHours()
    if (currentTimeHour <= this.start_time) {
      this.currentStartVal = this.start_value
      this.currentEndVal = this.start_value
    } else if (currentTimeHour < this.end_time) {
      // 生成随机数并添加到起始值上
      const random =
        Math.floor(
          Math.random() * (this.maxIncrement - this.minIncrement + 1)
        ) + this.minIncrement
      this.currentStartVal = this.currentEndVal
      this.currentEndVal < this.end_value
        ? (this.currentEndVal += random)
        : (this.currentEndVal = this.end_value)
    } else {
      // 最后将起始值设为结束值
      this.currentStartVal = this.end_value
      this.currentEndVal = this.end_value
    }
    return {
      currentStartVal: this.currentStartVal,
      currentEndVal: this.currentEndVal,
    }
  }
}
