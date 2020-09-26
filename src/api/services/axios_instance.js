import axios from 'axios'
import qs from 'qs'
import router from '../../router'
// 单独引用，此时调用方法为 Message(options)
import { Message } from 'element-ui'

// 在node中，有全局变量process表示的是当前的node进程
// process.env包含着关于系统环境的信息
// 但是process.env中并不存在NODE_ENV这个东西
// NODE_ENV是用户一个自定义的变量，vue-cli帮我们把process.env.NODE_ENV配置好了，我们不需要再自己去配置。
// 在webpack中它的用途是判断生产环境或开发环境的依据的
let api_base_url
if (process.env.NODE_ENV === 'development') {
  api_base_url = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  api_base_url = 'https://nicemusic-api.lxhcool.cn'
}

let request = axios.create({
  timeout: 5000,
  baseURL: api_base_url,
  // 接口文档：跨域请求需要添加这行代码
  withCredentials: true,
})

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    Message.error({ message: '请求超时！' })
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    let data = response.data
    let status = response.status
    if (status === 200) {
      return Promise.resolve(data)
    } else if (status === 301) {
      // 接口文档：301 错误基本都是没登录就调用了需要登录的接口,如果登陆了还是提示 301, 基本都是缓存把数据缓存起来了,解决方法是加时间戳或者等待 2 分钟或者重启服务重新登录后再调用接口,可自行改造缓存方法
      Message.error({
        message: '请先登录！',
      })
      router.replace({
        path: '/login',
      })
      return
    } else {
      return Promise.reject(response)
    }
  },
  function(error) {
    return Promise.reject(error)
  },
)
export { request }
