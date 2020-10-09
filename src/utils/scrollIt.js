/**
 * jQuery animate 动画效果曲线
 * 曲线图解 https://www.jb51.net/article/86785.htm
 * @param {距离顶部的目距离} destination
 * @param {动画持续时间} duration
 * @param {动画效果曲线} easing
 * @param {返回顶部后的回调函数} callback
 */
export function scrollIt(
  destination = 0,
  duration = 200,
  easing = 'linear',
  callback,
) {
  let easings = {
    // no easing, no acceleration
    linear(t) {
      return t
    },
    // accelerating from zero velocity

    easeInQuad(t) {
      return t * t
    },
    // decelerating to zero velocity
    easeOutQuad(t) {
      return t * (2 - t)
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    // accelerating from zero velocity
    easeInCubic(t) {
      return t * t * t
    },
    // decelerating to zero velocity
    easeOutCubic(t) {
      return --t * t * t + 1
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    // accelerating from zero velocity
    easeInQuart(t) {
      return t * t * t * t
    },
    // decelerating to zero velocity
    easeOutQuart(t) {
      return 1 - --t * t * t * t
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
    },
    // accelerating from zero velocity
    easeInQuint(t) {
      return t * t * t * t * t
    },
    // decelerating to zero velocity
    easeOutQuint(t) {
      return 1 + --t * t * t * t * t
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
    },
  }
  // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘(刷新)之前执行
  // 与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。
  // 换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
  // requestAnimationFrame()的兼容性封装：先判断是否原生支持各种带前缀的
  // 不行的话就采用延时的方案
  ;(function() {
    let lastTime = 0
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
          let currentTime = new Date().getTime()
          // 16.7ms是1000/60,每一帧需要的毫秒数
          // currentTime - lastTime是两次window.requestAnimationFrame执行的间隔时间
          // 16.7 - (currentTime - lastTime)估计是想让setTimeoutm每执行完回调函数callback刚好到达16.7ms
          // 即在完成callback后刚好一帧结束
          let timeToCall = Math.max(0, 16.7 - (currentTime - lastTime))
          let timer = window.setTimeout(function() {
            callback(currentTime + timeTocall)
          }, timeToCall)
          lastTime = currentTime + timeToCall
          return timer
        }
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame =
        window.webkitCancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        function(id) {
          window.clearTimeout(id)
        }
    }
  })()

  let element = checkElement()
  let start = element.scrollTop // 当前y轴滚动距离
  // Date.now()和new Date().getTime()一样，获取毫秒级时间戳
  let startTime = Date.now() // 当前时间

  function scroll() {
    let nowTime = Date.now()
    let time = Math.min(1, (nowTime - startTime) / duration)
    let timeFunction = easings[easing](time)
    element.scrollTop = timeFunction * (destination - start) + start
    if (element.scrollTop === destination) {
      callback // 回调函数
      return
    }
    window.requestAnimationFrame(scroll)
  }
  scroll()
}

function checkElement() {
  // chrome,safari及一些浏览器对于documentElement的计算标准化
  // 旧版本的chrome,safari及一些浏览器documentElement.scrollTop为undefined
  // 新版本的的chrome,safari的documentElement.scrollTop是有效的，而document.body.scrollTop是固定值0
  let element = document.documentElement.scrollTop
    ? document.documentElement
    : document.body
  return element
}
