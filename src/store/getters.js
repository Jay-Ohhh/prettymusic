export default {
  // 获取当前索引
  getCurrentIndex(state) {
    return state.currentIndex
  },
  // 获取当前播放歌曲
  getCurrentSong(state) {
    return state.playList[state.currentIndex] || {}
  },
  // 获取播放列表
  getPlayList(state) {
    return state.playList
  },
  // 获取播放状态
  getPlaying(state) {
    return state.playing
  },
  // 获取当前播放模式
  getCurrentMode(state) {
    return state.currentMode
  },
  // 获取顺序列表,即显示的歌曲排列
  getSequenceList(state) {
    return state.sequenceList
  },
  // 获取搜索历史
  getHistoryList(state) {
    return state.historyList
  },
}
