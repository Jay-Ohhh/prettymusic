import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  // 与keepAlive结合，离开时保存停留的位置
  scrollBehavior(to, from, savedPosition) {
    if (from.meta.keepAlive) {
      // 在from.meta新建属性savedPosition保存离开时的位置
      from.meta.savedPosition = document.body.scrollTop
    }
    return { x: 0, y: to.meta.savedPosition || 0 }
  },
})

export default router
