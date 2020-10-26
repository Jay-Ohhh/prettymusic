// 将顶部导航的页面打包在同个异步块 (chunk) 中
const layout = () =>
  import(/* webpackChunkName: "group-navgation" */ '../views/layout/index.vue')
const home = () =>
  import(/* webpackChunkName: "group-navgation" */ '../views/home/index.vue')
const rank = () =>
  import(/* webpackChunkName: "group-navgation" */ '../views/rank/index.vue')
const playList = () =>
  import(
    /* webpackChunkName: "group-navgation" */ '../views/playlist/PlayList.vue'
  )
const singer = () =>
  import(/* webpackChunkName: "group-navgation" */ '../views/singer/index.vue')
const video = () =>
  import(/* webpackChunkName: "group-navgation" */ '../views/video/index.vue')
const mv = () =>
  import(/* webpackChunkName: "group-navgation" */ '../views/mv/index.vue')
const playListDetail = () => import('../views/playlistdetail/index.vue')
const singerDetail = () => import('../views/singerdetail/index.vue')
const albumDetail = () => import('../views/albumdetail/AlbumDetail.vue')
const videoDetail = () => import('../views/video-detail/VideoDetail.vue')
const mvDetail = () => import('../views/mv-detail/MvDetail.vue')
const login = () => import('../components/common/login/index.vue')
const personal = () => import('../views/personal/Personal.vue')
const error = () => import('../views/error/404.vue')

const loginRouter = {
  path: '/login',
  name: 'login',
  component: login,
  meta: {
    title: '登录',
    // 是否登录页面
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
        path: '/rank',
        name: 'rank',
        component: rank,
        meta: {
          title: '排行榜',
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
      {
        path: '/singer',
        name: 'singer',
        component: singer,
        meta: {
          title: '歌手列表',
          keepAlive: true,
        },
      },
      {
        path: '/video',
        name: 'video',
        component: video,
        meta: {
          title: '视频列表',
          keepAlive: false,
        },
      },
      {
        path: '/mv',
        name: 'mv',
        component: mv,
        meta: {
          title: 'mv列表',
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
        path: '/videodetail',
        name: 'videodetail',
        component: videoDetail,
        meta: {
          title: '视频详情',
          keepAlive: true,
        },
      },
      {
        path: '/mvdetail',
        name: 'mvdetail',
        component: mvDetail,
        meta: {
          title: 'MV详情',
          keepAlive: true,
        },
      },
      {
        path: '/albumdetail',
        name: 'albumdetail',
        component: albumDetail,
        meta: {
          title: '专辑详情',
          keepAlive: true,
        },
      },
      {
        path: '/personal',
        name: 'personal',
        component: personal,
        meta: {
          title: '用户',
          keepAlive: true,
        },
      },
    ],
  },
]

export const routes = [loginRouter, pageError, ...appRoutes]
