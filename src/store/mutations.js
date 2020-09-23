export default {
  // 改变播放索引
  setCurrentIndex(state, index) {
    state.currentIndex = index
  },
  // 改变播放状态
  setPlaying(state, flag) {
    state.playing = flag
  },
  // 改变播放列表
  setPlayList(state, list) {
    state.playList = list
  },
  // 改变顺序列表
  setSequenceList(state, list) {
    state.sequenceList = list
  },
  // 改变歌单歌曲列表
  setSongSheet(state, list) {
    state.songSheet = list
  },
  // 改变播放模式
  setCurrentMode(state, mode) {
    state.currentMode = mode
  },
  // 改变历史播放列表
  setHistoryList(state, list) {
    state.historyList = list
  },
}
