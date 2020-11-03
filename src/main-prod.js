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

// 事件总线
Vue.prototype.$bus = new Vue()

// 全局自定义指令:防止重复点击按钮，针对于button元素
Vue.directive('preventReclick', {
  // 当被绑定的元素插入到 DOM 中时
  inserted(el, binding) {
    // 不能用onclick，因为onclick只能执行元素绑定click的一个方法
    el.addEventListener('click', () => {
      if (el.disabled === false) {
        el.disabled = true
        // binding.value是指令所绑定的值
        // 更多：https://cn.vuejs.org/v2/guide/custom-directive.html
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  },
})

// 全局自定义指令:聚焦，针对于input、textarea
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
