import { request } from './axios_instance'
// request执行后会返回一个promise对象，调用request的函数要return request返回Promise.resolve()或Promise.reject()
// 本项目同时支持 GET/POST 请按实际需求使用，POST请求url必须添加时间戳timestamp,使每次请求url不一样,不然请求会被缓存
// 时间戳加在url的位置无要求
// 隐私数据用post请求
/**
 * @method 获取轮播图
 */
export function getBanner() {
  return request.get('/banner')
}

/**
 * @method 获取推荐歌单
 * @params limit 取出数量默认为 30
 */
export function getRecSongs(limit) {
  return request.get(`/personalized?limit=${limit}`)
}

/**
 * @method 获取推荐歌单
 * @params limit 取出数量默认为 30
 */
export function getNewSongs() {
  return request.get('/personalized/newsong')
}

/**
 * @method 获取歌曲详情
 * @params ids(支持多个 id, 用 , 隔开, eg:ids='347230,347231')
 */
export const getSongDetail = ids =>
  request.get('/song/detail', { params: { ids } })

/**
 * @method 获取歌曲详情
 * @params ids(支持多个 id, 用 , 隔开, eg:'347230,347231')
 */
export const getLyric = id => request.get(`/lyric?id=${id}`)

/**
 * @method 获取热门歌手
 */
export function getHotSinger() {
  return request.get('/top/artists?offset=0&limit=30')
}

/**
 * 手机登录
 * @param {手机号} phone
 * @param {密码} password
 */
export function login(phone, password) {
  return request.post('/login/cellphone', {
    phone,
    password,
    timestamp: Date.now(),
  })
}
/**
 * 获取用户详情
 * @param {用户id} uid
 */
export function getUserDetail(uid) {
  return request.get(`/user/detail?uid=${uid}`)
}

/**
 * 获取热搜列表(简略)
 */
export function getSearchHot() {
  return request.get('/search/hot')
}

/**
 * 获取用户播放记录
 * @param {用户id} id
 * @param {type=1 时只返回 最近一周的播放记录, type=0 时返回 所有时间的播放记录} type
 */
export function getUserRecord(id, type) {
  return request.get(`/user/record?uid=${id}&type=${type}`)
}

/**
 * 获取歌单分类
 */
export function getCateList() {
  return request.get('/playlist/catlist')
}

/**
 * 获取热门歌单分类
 */
export function getHotList() {
  return request.get('/playlist/hot')
}

/**
 * 获取歌单（网友精选碟）
 * @param {请求参数对象} params
 */
export function getSheetList(params) {
  return request.get('/top/playlist', { params })
}

/**
 * 获取歌单详情
 * @param {歌单id} id
 * @param {歌单最近的 s 个收藏者,默认为8} s
 */
export function getPlayListDetail(id, s) {
  return request.get('/playlist/detail', { params: { id, s } })
}

/**
 * 获取相关歌单推荐
 * @param {歌单id}} id
 */
export function getRelatedPlayList(id) {
  return request.get(`/related/playlist?id=${id}`)
}

/**
 * 获取歌单收藏者
 * @param {请求参数对象} params
 */
export function getSubscribers(params) {
  return request.get('/playlist/subscribers', { params })
}

/**
 * 获取歌单评论
 * @param {请求参数对象} params
 */
export function getSheetComment(params) {
  return request.get('/comment/playlist', { params })
}

/**
 * 收藏/取消收藏歌单
 * @param {类型,1:收藏,2:取消收藏 } t
 * @param {歌单 id} id
 */
export function collectArtist(t, id) {
  return request.post(`/playlist/subscribe`, {
    t,
    id,
    timestamp: new Date().getTime(),
  })
}

/**
 * 签到
 */
export function signIn() {
  // type=1是web和PC端签到
  return request.get(`/daily_signin?type=1`)
}

/**
 * 获取用户歌单
 * @param {请求参数对象} params
 */
export function getUserArtist(params) {
  return request.get('/user/playlist', {
    params,
  })
}

/**
 * 获取用户关注列表
 * @param {我的id} uid
 * @param {返回数量} limit
 */
export function getFollows(uid, limit) {
  return request.post('/user/follows', {
    uid,
    limit,
    timestamp: new Date().getTime(),
  })
}

/**
 * 关注/取消关注用户
 * @param {所关注用户的id} id
 * @param {1为关注,其他为取消关注} t
 */
export function followUser(id, t) {
  return request.post('/follow', { id, t, timestamp: new Date().getTime() })
}

export function getRank() {
  return request.get('/toplist/detail')
}
