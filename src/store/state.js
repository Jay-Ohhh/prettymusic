const state = {
  // 播放列表,非显示,用来给audio播放
  playList: [],
  // 顺序列表,非显示
  // 该列表是用来接收历史播放列表或歌单列表，如果是随机模式则会利用shuffle函数将顺序列表洗牌,然后赋值给playList
  // sequenceList: [],
  // 播放状态
  playing: false,
  // 播放索引
  currentIndex: -1,
  // 当前播放模式(循环，单曲，随机)
  currentMode: 0,
  // 搜索历史
  searchHistory: JSON.parse(sessionStorage.getItem('search')) || [],
  // 历史播放列表（最近播放），该列表用来显示为播放列表
  historyList: [],
  // 歌单里的歌曲列表，该列表用来显示为当前歌单
  songSheet: [],
  // 歌手对象信息
  singer: {},
  // 播放模式选项
  playMode: {
    sequence: 0, // 顺序播放
    loop: 1, // 单曲循环
    random: 2, // 随机播放
  },
  // 用户详情
  userInfo: {},
  // 是否登录
  loginStatus: false,
  // 去往登录页面之前的页面,用于登录后返回
  backPath: null,
}

export default state
