import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// vuex 内置的日志插件，能够生成状态快照，对比改变前后不同的值以及执行的方法及其参数
// 不要在发布环境下启用该插件
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 判断生产还是开发环境
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  // 在严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误
  // 这能保证所有的状态变更都能被调试工具跟踪到
  // 严格模式是深度检测状态树，所以不要在发布环境下启用严格模式，否则会造成性能浪费
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export default store
