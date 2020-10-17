import { shuffle } from '../utils/untils'
import {
  saveSearch,
  deleteSearch,
  clearSearch,
  saveHistory,
  deleteHistory,
  clearHistory,
} from '../utils/cache'

function findIndex(list, song) {
  return list.findIndex(item => item.id === song.id)
}

export default {
  // 点击播放，用于最近列表、当前歌单的歌曲前面的播放按钮
  // 第二个参数是解构赋值的形式，对payload进行解构
  selectPlay(context, { list, index }) {
    // context.commit('setSequenceList', list)
    // 随机模式则将数组的元素顺序洗牌
    if (context.state.currentMode === context.state.playMode.random) {
      let song = list[index]
      list = shuffle(list)
      // 当前播放歌曲在随机列表中的索引
      index = findIndex(list, song)
    }
    context.commit('setPlayList', list)
    context.commit('setCurrentIndex', index)
    // state.playList[state.currentIndex]就是当前播放歌曲，在getters中
    context.commit('setPlaying', true)
  },
  // 点击播放，用于首页歌曲列表歌曲前面的播放按钮
  addHistoryAndPlay(context, song) {
    let list = null
    if (context.state.currentMode === context.state.playMode.random) {
      list = shuffle(saveHistory(song))
    } else {
      list = saveHistory(song)
    }
    let index = list.findIndex(item => item.id === song.id)
    context.commit('setHistoryList', saveHistory(song))
    context.commit('setPlayList', list)
    context.commit('setCurrentIndex', index)
    context.commit('setPlaying', true)
  },
  // 播放全部
  playAll(context, { list }) {
    if (context.state.currentMode === context.state.playMode.random) {
      list = shuffle(list)
    }
    context.commit('setCurrentIndex', 0)
    context.commit('setPlayList', list)
    context.commit('setPlaying', true)
  },
  // 暂停播放
  pausePlay(context) {
    context.commit('setPlaying', false)
  },
  // 移除播放
  stopPlay(context) {
    context.commit('setPlaying', false)
    context.commit('setPlayList', [])
    // context.commit('setSequenceList', [])
    context.commit('setCurrentIndex', -1)
  },
  // 保存单个搜索关键词到搜索历史
  saveSearchKey(context, query) {
    context.commit('setSearchHistory', saveSearch(query))
  },
  // 删除单个搜索关键词
  deleteSearchKey(context, query) {
    context.commit('setSearchHistory', deleteSearch(query))
  },
  // 移除全部搜索历史
  clearSearchHistory(context) {
    // 为什么第二个参数不直接传入空数组？
    // 因为还需要通过clearSearch()清空sessionStorage的搜索历史数组
    context.commit('setSearchHistory', clearSearch())
  },
  // 添加到最近播放列表
  saveHistoryList(context, song) {
    context.commit('setHistoryList', saveHistory(song))
  },
  // 从最近播放列表删除
  deleteOneHistory(context, song) {
    context.commit('setHistoryList', deleteHistory(song))
  },
  // 移除全部最近播放
  clearHistoryList(context, currentSong) {
    context.commit('setHistoryList', clearHistory())
    // 清理播放列表，但要保持当前播放的歌曲，以防播放组件隐藏掉或没有歌曲信息可显示
    context.commit('setPlayList', [currentSong])
  },
  // 将当前歌单清空
  clearSongSheet(context) {
    context.commit('setSongSheet', [])
  },
}
