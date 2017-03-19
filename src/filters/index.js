export function filterCategory(str) {
  switch(str){
    case 'ask':
      return '问答'
    case 'share':
      return '分享'
    case 'job':
      return '工作'
    case 'good':
      return '精华'
    default:
      return ''
  }
}

export function formatDate (str) {
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime()
    if (time < 0) {
        return ''
    } else if ((time / 1000 < 30)) {
        return '刚刚'
    } else if (time / 1000 < 60) {
        return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前'
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
}

/**
 * 配置生产和开发环境静态资源路径
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function assets(path) {
  return process.env.NODE_ENV === 'production' ? `/vue2-cnode/static/${path}`: `/static/${path}`
}
