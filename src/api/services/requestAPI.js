import { request } from './axios_instance'
// request执行后会返回一个promise对象，调用request的函数要return request返回的promise对象
// 本项目同时支持 GET/POST 请按实际需求使用，POST请求url必须添加时间戳timestamp,使每次请求url不一样,不然请求会被缓存
// 时间戳加的位置无要求
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
 * @params ids(支持多个 id, 用 , 隔开, eg:'347230,347231')
 */
export const getSongDetail = ids =>
  request.get(`/song/detail`, { params: { ids } })
// /**
//  * @method 获取歌曲详情
//  * @params ids(支持多个 id, 用 , 隔开)
//  */
// export const getSongDetail = ids =>
//   api.get(`/song/detail?timestamp=${time}`, {params:{ids}})
