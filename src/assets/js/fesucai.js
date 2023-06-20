var radius = 30
var radiusX = 70
var d = 150
var dtr = Math.PI / 360
var distr = true
var tspeed = 11
var size = 400
var mouseX = 0
var mouseY = 10
var howElliptical = 1
var sa = 0
var ca = 0
var sb = 0
var cb = 0
var sc = 0
var cc = 0

class scrollTagsClond {
  constructor(elId) {
    this.initTagsCloud(elId)
  }
  initTagsCloud(elId) {
    var oTag = null
    this.oDiv = document.getElementById(elId)
    this.aA = this.oDiv.getElementsByTagName('a')
    this.mcList = []
    for (var i = 0; i < this.aA.length; i++) {
      oTag = {}
      this.aA[i].onmouseover = (function (obj) {
        return function () {
          obj.on = true
          this.style.zIndex = 9999
          this.style.color = '#fff'
          this.style.padding = '5px 5px'
          this.style.filter = 'alpha(opacity=100)'
          this.style.opacity = 1
        }
      })(oTag)
      this.aA[i].onmouseout = (function (obj) {
        return function () {
          obj.on = false
          this.style.zIndex = obj.zIndex
          this.style.color = '#fff'
          this.style.padding = '5px'
          this.style.filter = 'alpha(opacity=' + 100 * obj.alpha + ')'
          this.style.opacity = obj.alpha
          this.style.zIndex = obj.zIndex
        }
      })(oTag)
      oTag.offsetWidth = this.aA[i].offsetWidth
      oTag.offsetHeight = this.aA[i].offsetHeight
      this.mcList.push(oTag)
    }
    sineCosine(0, 0, 0)
    this.positionAll()
  }
  update() {
    var a,
      b,
      c = 0
    a = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed
    b = (-Math.min(Math.max(-mouseX, -size), size) / radiusX) * tspeed
    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
      return
    }
    sineCosine(a, b, c)
    for (var i = 0; i < this.mcList.length; i++) {
      if (this.mcList[i].on) {
        continue
      }
      var rx1 = this.mcList[i].cx
      var ry1 = this.mcList[i].cy * ca + this.mcList[i].cz * -sa
      var rz1 = this.mcList[i].cy * sa + this.mcList[i].cz * ca

      var rx2 = rx1 * cb + rz1 * sb
      var ry2 = ry1
      var rz2 = rx1 * -sb + rz1 * cb

      var rx3 = rx2 * cc + ry2 * -sc
      var ry3 = rx2 * sc + ry2 * cc
      var rz3 = rz2

      this.mcList[i].cx = rx3
      this.mcList[i].cy = ry3
      this.mcList[i].cz = rz3

      let per = d / (d + rz3)

      this.mcList[i].x = howElliptical * rx3 * per - howElliptical * 2
      this.mcList[i].y = ry3 * per
      this.mcList[i].scale = per
      var alpha = per
      alpha = (alpha - 0.6) * (10 / 6)
      this.mcList[i].alpha = alpha * alpha * alpha - 0.1
      this.mcList[i].zIndex = Math.ceil(100 - Math.floor(this.mcList[i].cz))
    }
    this.doPosition()
  }
  positionAll() {
    var phi = 0
    var theta = 0
    var max = this.mcList.length
    for (var i = 0; i < max; i++) {
      if (distr) {
        phi = Math.acos(-1 + (2 * (i + 1) - 1) / max)
        theta = Math.sqrt(max * Math.PI) * phi
      } else {
        phi = Math.random() * Math.PI
        theta = Math.random() * (2 * Math.PI)
      }
      //坐标变换
      this.mcList[i].cx = radiusX * Math.cos(theta) * Math.sin(phi) * 2
      this.mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi)
      this.mcList[i].cz = radius * Math.cos(phi)
      console.log(this.mcList[i].cy)
      if (!this.aA[i]) return
      console.log(this.oDiv.offsetHeight)
      this.aA[i].style.left =
        this.mcList[i].cx +
        this.oDiv.offsetWidth / 2 -
        this.mcList[i].offsetWidth / 2 +
        'px'
      this.aA[i].style.top =
        this.mcList[i].cy +
        this.oDiv.offsetHeight / 2 -
        this.mcList[i].offsetHeight / 2 +
        'px'
    }
  }
  doPosition() {
    var l = this.oDiv.offsetWidth / 2
    var t = this.oDiv.offsetHeight / 2
    for (var i = 0; i < this.mcList.length; i++) {
      if (this.mcList[i].on) {
        continue
      }
      if (!this.aA[i]) return
      var aAs = this.aA[i].style
      if (this.mcList[i].alpha > 0.1) {
        if (aAs.display != '') aAs.display = ''
      } else {
        if (aAs.display != 'none') aAs.display = 'none'
        continue
      }
      aAs.left = this.mcList[i].cx + l - this.mcList[i].offsetWidth / 2 + 'px'
      aAs.top = this.mcList[i].cy + t - this.mcList[i].offsetHeight / 2 + 'px'
      //aAs.fontSize=Math.ceil(12*this.mcList[i].scale/2)+8+'px';
      //aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*this.mcList[i].alpha+")";
      aAs.filter = 'alpha(opacity=' + 100 * this.mcList[i].alpha + ')'
      aAs.zIndex = this.mcList[i].zIndex
      aAs.opacity = this.mcList[i].alpha
    }
  }
}

function sineCosine(a, b, c) {
  sa = Math.sin(a * dtr)
  ca = Math.cos(a * dtr)
  sb = Math.sin(b * dtr)
  cb = Math.cos(b * dtr)
  sc = Math.sin(c * dtr)
  cc = Math.cos(c * dtr)
}
//素材家园（www.sucaijiayuan.com）
export default scrollTagsClond
