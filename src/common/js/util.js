export function throttle(fn, wait, mustRun) {
  let timeout
  let startTime = new Date()
  return function tt() {
    let context = this
    let args = arguments
    let curTime = new Date()

    clearTimeout(timeout)
    // 如果达到了规定的触发时间间隔，触发 handler
    if (curTime - startTime >= mustRun) {
        fn.apply(context, args)
        startTime = curTime
        // 没达到触发间隔，重新设定定时器
    } else {
        timeout = setTimeout(fn, wait)
    }
  }
}

export function share2Weibo(url, reply, imgsrc, appkey, callback){
  callback = callback || (function () {})
  javascript:void((function (s, d, e) {
      var f = 'http://v.t.sina.com.cn/share/share.php?'
      var p = ['&url=' + e(url), '&appkey=' + appkey, '&title=', e(reply)].join('')

      if (imgsrc !== false) {
          p += '&pic=' + imgsrc
      }
      function a() {
          if (!window.open([f, p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (s.width - 620) / 2, ',top=', (s.height - 450) / 2].join(''))) {
          }
      }
      if (/Firefox/.test(navigator.userAgent)) {
          setTimeout(a, 0)
      } else {
          a()
      }
      callback()
  })(screen, document, encodeURIComponent))
}