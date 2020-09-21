import { getSearch } from '../utils/cache'

const state = {
  // 播放列表,显示
  playList: [],
  // 顺序列表,非显示,如果是随机模式则会利用shuffle函数将顺序列表洗牌,然后赋值给播放列表
  sequenceList: [],
  // 播放状态
  playing: false,
  // 播放索引
  currentIndex: -1,
  // 当前播放模式(循环，单曲，随机)
  currentMode: 0,
  // 搜索历史
  searchHistory: getSearch(),
  // 历史播放列表
  historyList: [],
  // 播放模式选项
  playMode: {
    sequence: 0, // 顺序播放
    loop: 1, // 单曲循环
    random: 2, // 随机播放
  },
}

export default state
