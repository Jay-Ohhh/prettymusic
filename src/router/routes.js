const layout = () => import('../views/layout/index.vue')
const home = () => import('../views/home/index.vue')
const playListDetail = () => import('../views/playlistdetail/index.vue')
const singerDetail = () => import('../views/singerdetail/index.vue')
const login = () => import('../components/common/login/index.vue')
const error = () => import('../views/error/404.vue')
const playList = () => import('../views/playlist/PlayList.vue')

const loginRouter = {
  path: '/login',
  name: 'login',
  component: login,
  meta: {
    title: '登录',
    isLogin: true,
  },
}

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
          keepAlive: false,
        },
      },
      {
        path: '/playlistdetail',
        name: 'playlistdetail',
        component: playListDetail,
        meta: {
          title: '歌曲列表',
          keepAlive: true,
        },
      },
      {
        path: '/singerdetail',
        name: 'singerdetail',
        component: singerDetail,
        meta: {
          title: '歌手详情',
          keepAlive: true,
        },
      },
      {
        path: '/playlist',
        name: 'playlist',
        component: playList,
        meta: {
          title: '歌单列表',
          keepAlive: true,
        },
      },
    ],
  },
]

export const routes = [loginRouter, pageError, ...appRoutes]
