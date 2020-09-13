const layout = () => import('../views/layout/index.vue')
const home = () => import('../views/home/index.vue')
const error = () => import('../views/error/404.vue')

// 404
const pageError = {
  path: '*',
  name: '404',
  component: error,
  meta: {
    title: '404-您访问的页面不存在',
  },
}

// 主路由
const appRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
    ],
  },
]

export const routes = [pageError, ...appRoutes]
