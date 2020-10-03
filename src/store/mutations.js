export default {
  // 保存播放索引
  setCurrentIndex(state, index) {
    state.currentIndex = index
  },
  // 保存播放状态
  setPlaying(state, flag) {
    state.playing = flag
  },
  // 保存播放列表
  setPlayList(state, list) {
    state.playList = list
  },
  // 保存顺序列表
  setSequenceList(state, list) {
    state.sequenceList = list
  },
  // 保存歌单歌曲列表
  setSongSheet(state, list) {
    state.songSheet = list
  },
  // 保存播放模式
  setCurrentMode(state, mode) {
    state.currentMode = mode
  },
  // 保存历史播放列表
  setHistoryList(state, list) {
    state.historyList = list
  },
  // 保存歌手对象信息
  setSinger(state, singer) {
    state.singer = singer
  },
  // 保存用户详情
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  // 保存登录状态
  setLoginStatus(state, status) {
    state.loginStatus = status
  },
  // 保存去往登录页面之前的页面
  setBackPath(state, path) {
    state.backPath = path
  },
  // 保存历史搜索
  setSearchHistory(state, arr) {
    state.searchHistory = arr
  },
}
