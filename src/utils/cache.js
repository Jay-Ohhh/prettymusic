// 历史搜索数组最大长度
const SEARCH_MAX = 15
// 最近播放数组最大长度
const HISTORY_MAX_LENGTH = 50

/**
 * 插入元素，用于搜索关键词的插入，重复搜索的关键词保持在最前面
 * @param {数组} arr
 * @param {插入的元素} val
 * @param {findIndex方法的条件函数} compare
 * @param {数组的最大长度} maxLen
 */
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  // 如果这个元素已存在且是数组的第一个
  if (index === 0) return
  // 删除自身
  if (index > 0) arr.splice(index, 1)
  // unshift在数组前面添加这个元素
  arr.unshift(val)
  // pop删除数组最后一个元素
  // 如果关键词个数超过历史搜索数组的最大长度，则删除历史搜索数组最后一个
  if (maxLen && arr.length > maxLen) arr.pop()
}

/**
 * 添加元素，用于最近播放列表的添加，如果最近播放列表已存在这首歌，则return，否则添加在列表最前面
 * @param {数组} arr
 * @param {插入的元素} val
 * @param {findIndex方法的条件函数} compare
 * @param {数组的最大长度} maxLen
 */
function addToArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  // 如果这个元素已存在
  if (index !== -1) return
  arr.unshift(val)
  // pop删除数组最后一个元素
  // 如果关键词个数超过历史搜索数组的最大长度，则删除历史搜索数组最后一个
  if (maxLen && arr.length > maxLen) arr.pop()
}

// 删除数组中符合条件的某个元素
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index !== -1) arr.splice(index, 1)
}

// 历史搜索数组中添加搜索关键词（单个）
export function saveSearch(query) {
  let searches = JSON.parse(sessionStorage.getItem('search')) || []
  insertArray(searches, query, item => item === query, SEARCH_MAX)
  sessionStorage.setItem('search', JSON.stringify(searches))
  return searches
}

// 读取历史搜索数据
export function getSearch() {
  return JSON.parse(sessionStorage.getItem('search')) || []
}

// 删除单个搜索历史
export function deleteSearch(query) {
  let searches = JSON.parse(sessionStorage.getItem('search')) || []
  deleteFromArray(searches, item => item === query)
  sessionStorage.setItem('search', JSON.stringify(searches))
  return searches
}

// 清空搜索历史
export function clearSearch() {
  sessionStorage.removeItem('search')
  return []
}

// 添加到最近播放列表
export function saveHistory(song) {
  let songs = JSON.parse(sessionStorage.getItem('history')) || []
  addToArray(songs, song, item => item.id === song.id, HISTORY_MAX_LENGTH)
  sessionStorage.setItem('history', JSON.stringify(songs))
  return songs
}

// 从最近播放列表移除
export function deleteHistory(song) {
  let songs = JSON.parse(sessionStorage.getItem('history')) || []
  deleteFromArray(songs, item => song.id === item.id)
  sessionStorage.setItem('history', JSON.stringify(songs))
  return songs
}

// 清空最近播放列表
export function clearHistory() {
  sessionStorage.removeItem('history')
  return []
}
