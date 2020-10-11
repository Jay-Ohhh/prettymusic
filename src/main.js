import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getApi from './api/index'
import './libs/element'
import './utils/untils'

// 引入基本样式css
import './assets/css/common.css'
import './assets/css/reset.css'
import './assets/css/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$api = getApi

// 全局自定义指令
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时
  inserted(el) {
    el.focus()
  },
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
