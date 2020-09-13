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

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
