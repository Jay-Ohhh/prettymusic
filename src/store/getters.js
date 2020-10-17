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
  getPlayMode(state) {
    return state.playMode
  },
  // // 获取顺序列表,即显示的歌曲排列
  // getSequenceList(state) {
  //   return state.sequenceList
  // },
  // 获取历史播放列表（最近播放）
  getHistoryList(state) {
    return state.historyList
  },
  // 获取搜索历史
  getSearchHistory(state) {
    return state.searchHistory
  },
  // 获取登录状态
  getLoginStatus(state) {
    return state.loginStatus
  },
  // 获取用户详情
  getUserInfo(state) {
    return state.userInfo
  },
}
