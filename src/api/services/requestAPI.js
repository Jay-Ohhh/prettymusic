import { request } from './axios_instance'
// request执行后会返回一个promise对象，调用request的函数要return request返回Promise.resolve()或Promise.reject()
// 本项目同时支持 GET/POST 请按实际需求使用，POST请求url必须添加时间戳timestamp,使每次请求url不一样,不然请求会被缓存
// 时间戳加在url的位置无要求
// 隐私数据用post请求
// 由于接口做了缓存处理 ( 缓存 2 分钟,不缓存数据极容易引起网易服务器高频ip错误), 相同的 url 会在两分钟内只向网易服务器发一次请求 , 如果遇到不需要缓存结果的接口 , 可在请求 url 后面加一个时间戳参数使 url 不同
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
 * @method 获取歌词
 * @params {音乐id} id
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
    timestamp: new Date().getTime(),
  })
}
/**
 * 获取用户详情
 * @param {用户id} uid
 */
export function getUserDetail(uid) {
  let timestamp = new Date().getTime()
  return request.get(`/user/detail?uid=${uid}&timestamp=${timestamp}`)
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

/**
 * 获取所有榜单内容
 */
export function getRank() {
  return request.get('/toplist/detail')
}

/**
 * 获取被分类的歌手列表
 * @param {请求参数对象} params
 */
export function getSingers(params) {
  return request.get('/artist/list', { params })
}

/**
 * 获取视频分类列表
 */
export function getVideoCategory() {
  return request.get('/video/category/list')
}

/**
 * 获取视频标签列表
 */
export function getVideoTag() {
  return request.get('/video/group/list')
}

/**
 * 获取全部视频列表
 * @param {分页参数偏移量,接口限定了每请求一次只返回8个视频数据,offset加1等于偏移8个元素} offset
 */
export function getVideoAll(offset) {
  return request.get(`/video/timeline/all?offset=${offset}`)
}

/**
 *
 * @param {标签/分类的id} id
 * @param {分页参数偏移量，接口限定了每请求一次只返回8个视频数据,offset加1等于偏移8个元素} offset
 */
export function getVideoOther(id, offset) {
  return request.get(`/video/group?id=${id}&offset=${offset}`)
}

/**
 * 获取全部mv
 * @param {请求参数对象} params
 */
export function getMvAll(params) {
  return request.get('/mv/all', { params })
}

/**
 * 获取歌手部分信息和热门歌曲
 * @param {歌手id(非用户id)} id
 */
export function getArtists(id) {
  let timestamp = new Date().getTime()
  return request.get(`/artists?id=${id}&timestamp=${timestamp}`)
}

/**
 * 获取歌手专辑
 * @param {请求参数对象} params
 */
export function getArtistAlbum(params) {
  return request.get('/artist/album', { params })
}

/**
 * 获取歌手MV
 * @param {歌手id(非用户id)} id
 */
export function getArtistMv(id) {
  return request.get(`/artist/mv?id=${id}`)
}

/**
 * 获取歌手描述
 * @param {歌手id(非用户id)} id
 */
export function getArtistDesc(id) {
  return request.get(`/artist/desc?id=${id}`)
}

/**
 * 获取相似歌手
 * @param {歌手id(非用户id)} id
 */
export function getArtistSimi(id) {
  return request.get(`/simi/artist?id=${id}`)
}

/**
 * 收藏/取消收藏歌手
 * @param {歌手id(非用户id)} id
 * @param {1为收藏,其他为取消收藏} t
 */
export function followSinger(id, t) {
  return request.post('/artist/sub', { id, t, timestamp: new Date().getTime() })
}

/**
 * 获取专辑内容
 * @param {专辑id} id
 */
export function getAlbumData(id) {
  return request.get(`/album?id=${id}`)
}

/**
 * 获取专辑评论
 * @param {请求参数对象} params
 */
export function getAlbumComment(params) {
  return request.get('/comment/album', { params })
}

/**
 * 发送评论
 * @param {请求参数对象} params
 */
export function commentSubmit(params) {
  return request.post('/comment', params)
}

/**
 * 删除评论
 * @param {请求参数对象} params
 */
export function commentDelete(params) {
  return request.post('/comment', params)
}

/**
 * 资源点赞（MV，电台，视频）
 * @param {请求参数对象} params
 */
export function likeResource(params) {
  return request.post('/resource/like', params)
}

/**
 * 获取视频播放地址
 * @param {视频id} id
 */
export function getVideoUrl(id) {
  return request.get(`/video/url?id=${id}`)
}

/**
 * 获取视频详情
 * @param {视频id} id
 */
export function getVideoDetail(id) {
  return request.get(`/video/detail?id=${id}`)
}

/**
 * 获取视频的点赞、转发、评论数
 * @param {请求参数对象} params
 */
export function getVideoDetailInfo(params) {
  return request.get('/video/detail/info', { params })
}

/**
 * 获取视频评论
 * @param {请求参数对象} params
 */
export function getVideoComments(params) {
  return request.get('/comment/video', { params })
}
/**
 * 评论点赞/取消点赞
 * @param {请求参数对象} params
 */
export function commentLike(params) {
  return request.post('/comment/like', params)
}

/**
 * 获取相关视频
 * @param {视频id} id
 */
export function getVideoRelated(id) {
  return request.get(`/related/allvideo?id=${id}`)
}

/**
 * 获取mv播放地址
 * @param {mv的id} id
 */
export function getMvUrl(id) {
  return request.get(`/mv/url?id=${id}`)
}

/**
 * 获取mv数据
 * @param {mv的id} mvid
 */
export function getMvDetail(mvid) {
  return request.get(`/mv/detail?mvid=${mvid}`)
}

/**
 * 获取mv的点赞、转发、评论数
 * @param {请求参数对象} params
 */
export function getMvDetailInfo(params) {
  return request.get('/mv/detail/info', { params })
}

/**
 * 获取mv评论
 * @param {请求参数对象} params
 */
export function getMvComments(params) {
  return request.get('/comment/mv', { params })
}

/**
 * 获取相似mv
 * @param {mv的id} mvid
 */
export function getMvRelated(mvid) {
  return request.get(`/simi/mv?mvid=${mvid}`)
}

/**
 * 搜索建议
 * @param {关键词} keywords
 */
export function searchSuggest(keywords) {
  return request.get(`/search/suggest?keywords=${keywords}`)
}

/**
 * 搜索，调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开
 * @param {请求参数对象} params
 */
export function search(params) {
  return request.get('/cloudsearch', { params })
}
