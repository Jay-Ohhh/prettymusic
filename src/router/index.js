import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from '../store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  // 与keepAlive结合，离开时保存停留的位置
  scrollBehavior(to, from, savedPosition) {
    if (from.meta.keepAlive) {
      // 在from.meta新建属性savedPosition保存离开时的位置
      // 滚动距离的兼容性
      from.meta.savedPosition =
        document.documentElement.scrollTop || document.body.scrollTop
    }
    return { x: 0, y: to.meta.savedPosition || 0 }
  },
})

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' && from.path !== '/') {
    // 首页的地址是'/home'
    // 登录页面刷新：from.path是'/'，即登录页面刷新不会进行以下操作
    // 这里用vuex和sessionStorage保存登录之前的页面
    store.commit('setBackPath', from.fullPath)
    sessionStorage.setItem('backPath', JSON.stringify(from.fullPath))
  }
  next()
})

export default router
