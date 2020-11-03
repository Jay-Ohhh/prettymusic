// 工具函数和vue全局过滤器
import Vue from 'vue'
/**
 * 数字转整数 如 101000 转为10.1万
 * @param {要转换的数值} val
 * @param {需要保留的小数位数} point
 */
export function transNum(val, point) {
  /**
   * 如果有小数，则取小数点后n位
   * @param {需要转化的数} num
   * @param {被除数} divider
   * @param {需要保留的小数位数} point
   */
  function getDecimal(num, divider, point) {
    num = num / divider
    if (num % 1 === 0) {
      // 如果是整数直接返回
      return num
    } else {
      // 如果有小数点
      // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字，并转换为字符串
      return num.toFixed(point)
    }
  }
  // 大于等于1万小于1亿
  if (val >= 10000 && val < 1e8) {
    let decimal = getDecimal(val, 10000, point)
    return decimal + '万'
  } else if (val >= 1e8) {
    // 大于等于1亿
    let decimal = getDecimal(val, 1e8, point)
    return decimal + '亿'
  } else {
    // 小于1万，直接返回
    return val
  }
}
Vue.filter('transNum', transNum)

/**
 * 左补0补齐多少位
 * @param {数值} val
 * @param {数值要显示的长度} len
 */
export function formatZero(val, len) {
  // 如果数值的长度等于我们规定的长度
  if (String(val).length === len) return val
  // 因为Array(2)的两个元素为空，join是把数组的分隔符逗号变成0，再连接所有元素变成字符串
  // Array(2).join(0) 输出 '0', Array(1).join(0) 输出 ''，因为数组只有一个元素没有逗号
  // slice(start, end) 方法可提取数组字符串的某个部分，并以新的字符串返回被提取的部分
  // 如果start为-1，则代表从最后一个开始取(包括)
  return (Array(len).join(0) + val).slice(-len)
}
Vue.filter('formatZero', formatZero)

// 歌曲详情数据处理
class Song {
  // 这个大括号是将传进来的对象解构赋值
  constructor({
    id,
    singer,
    name,
    album,
    duration,
    picUrl,
    url,
    playCount,
    score,
  }) {
    {
      this.id = id
      this.singer = singer
      this.name = name
      this.album = album
      this.duration = duration
      this.picUrl = picUrl
      this.url = url
      this.playCount = playCount
      this.score = score
    }
  }
}
export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar || musicData.artists),
    name: musicData.name,
    album: musicData.al ? musicData.al.name : musicData.album.name,
    duration: musicData.dt || musicData.duration,
    picUrl: musicData.al
      ? musicData.al.picUrl
      : musicData.album.artist.img1v1Url,
    url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    playCount: musicData.playCount || '',
    score: musicData.score || '',
  })
}

// 从数据中筛选出歌手并组成 张三/李四 这样的格式
function filterSinger(singerArr) {
  // 一首歌可能有多个歌手
  // 如果歌手数组不存在
  if (!singerArr) {
    return ''
  }
  let singers = singerArr.map(item => item.name)
  // eg:张三/李四
  return singers.join('/')
}

/**
 * 将毫秒时间戳转换成 00:00格式 或 00:00:00格式
 * @param {时间戳 毫秒} duration
 */
export function formatTime(duration) {
  // 如果传入的是非数字文本直接返回该文本，不作处理
  if (typeof (duration * 1) !== 'number') return duration
  let m = parseInt(duration / 1000 / 60)
  let s = ((duration / 1000) % 60).toFixed(0)
  m = formatZero(m, 2)
  s = formatZero(s, 2)
  if (m >= 60) {
    let h = parseInt(duration / 1000 / 60 / 60)
    m = parseInt((duration / 1000 / 60) % 60)
    h = formatZero(h, 2)
    m = formatZero(s, 2)
    return h + ':' + m + ':' + s
  }
  return m + ':' + s
}
Vue.filter('formatTime', formatTime)

// 数组随机排序
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = _arr.length - 1; i > 0; i--) {
    // Math.random()返回介于 0（包含） ~ 1（不包含） 之间的一个随机数
    let index = Math.floor(Math.random() * i)
    let temp = _arr[i]
    _arr[i] = _arr[index]
    _arr[index] = temp
  }
  return _arr
}

/**
 * 日期格式转换
 * @param {时间戳(number)，时间字符串(string)} time
 * 时间字符串格式要求：https://www.cnblogs.com/hongll/p/10483856.html
 * @param {日期格式} type
 */
export function formatDate(time, type) {
  // 转换为Date对象
  let date = new Date(time)
  let year = date.getFullYear()
  let month = formatZero(date.getMonth() + 1, 2)
  let day = formatZero(date.getDate(), 2)
  let hour = formatZero(date.getHours(), 2)
  let minute = formatZero(date.getMinutes(), 2)
  let second = formatZero(date.getSeconds(), 2)
  if (type === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`
  } else if (type === 'YYYY-MM-DD HH:MM:SS') {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  } else if (type === 'MM/DD HH:MM:SS') {
    return `${month}/${day} ${hour}:${minute}:${second}`
  }
}
Vue.filter('formatDate', formatDate)

// 时间戳转换为几分钟前，几小时前，几天前，...
export function formatTimeBefore(dateTimeStamp) {
  // 几分钟前，几小时前，几天前，... 的时间划分区间
  let minuteLimit = 60 * 1000
  let hourLimit = minuteLimit * 60
  let dayLimit = hourLimit * 24
  let monthLimit = dayLimit * 30
  let yearLimit = monthLimit * 12
  let now = new Date().getTime()
  let difference = now - dateTimeStamp
  if (difference <= 0 || (difference > 0 && difference < minuteLimit)) {
    // 差值等于0或小于1分钟
    return '刚刚'
  } else if (difference >= minuteLimit && difference < hourLimit) {
    // 大于等于1分钟且小于一小时
    return parseInt(difference / minuteLimit) + '分钟前'
  } else if (difference >= hourLimit && difference < dayLimit) {
    // 大于等于1小时且小于一天
    return parseInt(difference / hourLimit) + '小时前'
  } else if (difference >= dayLimit && difference < monthLimit) {
    // 大于等于1天且小于一个月
    return parseInt(difference / dayLimit) + '天前'
  } else if (difference >= monthLimit && difference < yearLimit) {
    // 大于等于1个月且小于一年
    return parseInt(difference / monthLimit) + '个月前'
  } else if (difference >= yearLimit) {
    // 大于等于1年
    let val = difference / yearLimit
    if (val >= 10) {
      return '10年前'
    }
    return parseInt(val) + '年前'
  }
}
Vue.filter('formatTimeBefore', formatTimeBefore)

// 将时间戳转换为2020年-白羊座的格式
export function getAstro(timestamp) {
  // 将时间戳转换为Date对象
  let date = new Date(timestamp)
  // 转换为这样格式的字符串 2020/10/7，没有左补零，月份是正确的，不用加1
  let birthday = date.toLocaleDateString()
  // split() 方法用于把一个字符串分割成字符串数组
  let birthdayArr = birthday.split('/')
  let year = birthdayArr[0] + '年'
  let month = birthdayArr[1]
  let day = birthdayArr[2]
  // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
  // charAt() 方法用于返回指定索引处的字符
  // true*2=2，false*2=0
  return (
    year +
    '-' +
    '魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(
      month * 2 - (day < '102223444433'.charAt(month - 1) - -19) * 2,
      2,
    ) +
    '座'
  )
}
