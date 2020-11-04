<P align="center"><img width="100" src="http://jay_ohhh.gitee.io/imagehosting/prettymusic/logo-icon.png" alt="prettymusic logo">
</p>
<h3 align="center" style="margin:-20px 0 0;">prettymusic</h3>
<h4 align="center" style="margin:5px 0 0;">一个基于Vue全家桶的音乐/视频播放平台</h4>
<p align="center">
    <img src="https://img.shields.io/github/languages/top/Jay-Ohhh/vue-prettymusic" alt="languages">&ensp;
    <img src="https://img.shields.io/badge/license-GPL%202.0-brightgreen" alt="开源许可证GPL2.0">&ensp;
    <img src="https://img.shields.io/github/issues/Jay-Ohhh/vue-prettymusic" alt="github issues">&ensp;
    <img src="https://img.shields.io/badge/dist-950%20KB-blue" alt="dist">&ensp;
    <img src="https://img.shields.io/github/stars/Jay-Ohhh/vue-prettymusic?label=github%20stars">&ensp;
    <img src="https://gitee.com/Jay_Ohhh/prettrymusic/badge/star.svg?theme=dark">
</p>

### 演示地址

<a href="http://jay_ohhh.gitee.io/prettrymusic" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">prettymusic</a>（GiteePages）

Tips：如果遇在演示网站遇到视频页面没数据、不能发表评论、不能收藏歌单、不能关注歌手等现象是因为服务器接口的问题。如果本地开发用的是 `NeteaseCloudMusicApi` ，那么正常使用对应的接口就会返回数据。音乐不能播放的问题：需要VIP、付费或暂无版权。

### 前言

- 此项目仅供个人学习
- 如果你觉得这个项目对你有帮助，<span style="color:#1240AB;font-weight:600;">Give me a star ღ </span>，希望大家多多支持，感谢！
- 开源不易，请保留Web页面底部的署名，转载标明出处
- 推荐Wtach项目，获取项目第一时间更新和动态
- QQ学习交流（个人）：1598353326

### 感谢

<a href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_blank" rel="noopener noreferrer" style="text-decoration:none;"> Binaryify / NeteaseCloudMusicApi </a>（网易云音乐 NodeJS 版 API）

<a href="https://gitee.com/lxhcool/desktop-nicemusic?_from=gitee_search" target="_blank" rel="noopener noreferrer" style="text-decoration:none;"> One / desktop-nicemusic </a>（仿网易云音乐，UI 好好看 )

本项目是基于destop-nicemusic进行了重写和优化，新增播放器歌单功能，修复调节进度条超出范围后鼠标异常bug等。Above all，优化播放器播放逻辑，优化路由跳转交互效果，优化HTML和CSS布局。

---

### Library

| project                                  | version                                                      | description             |
| ---------------------------------------- | ------------------------------------------------------------ | ----------------------- |
| [vue](https://github.com/vuejs/vue)      | ![version2.6.11](https://img.shields.io/badge/npm-v2.6.11-blue) | 渐进式 JavaScript 框架  |
| [vue-router](https://github.com/vuejs/vue-router)                 | ![version3.4.3](https://img.shields.io/badge/npm-v3.4.3-blue) | 单页面应用路由器        |
| [vuex](https://github.com/vuejs/vuex)                             | ![version3.5.1](https://img.shields.io/badge/npm-v3.5.1-blue) | 状态管理                |
| [axios](https://github.com/axios/axios)                           | ![version0.20.0](https://img.shields.io/badge/npm-v0.20.0-blue) | 用、简洁且高效的http库  |
| [element-ui](https://github.com/ElemeFE/element)                 | ![version2.13.2](https://img.shields.io/badge/npm-v2.13.2-blue) | 基于vue的桌面端组件库   |
| [vue-kinesis](https://github.com/Aminerman/vue-kinesis)               | ![version1.1.5](https://img.shields.io/badge/npm-v1.1.5-blue) | 基于vue的交互式动画组件 |
| [swiper](https://github.com/nolimits4web/swiper)                         | ![version5.4.5](https://img.shields.io/badge/npm-v5.4.5-blue) | 页面滑动插件（轮播图）  |
| [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper) | ![version4.1.1](https://img.shields.io/badge/npm-v4.1.1-blue) | 基于vue的swiper组件     |
| [better-scroll](https://github.com/ustbhuangyi/better-scroll)           | ![version2.0.3](https://img.shields.io/badge/npm-v2.0.3-blue) | 页面滚动插件            |
| [lyric-parser](https://github.com/ustbhuangyi/lyric-parser)             | ![version1.0.1](https://img.shields.io/badge/npm-v1.0.1-blue) | 歌词解析插件            |
| [sass](https://github.com/sass/sass)                             | ![最新版本](https://img.shields.io/badge/npm-latest-blue)    | CSS预处理器语言         |


### License

[GPL 2.0]( https://opensource.org/licenses/GPL-2.0 )

Copyright © 2020 - present , Jay_Ohhh

---

###  安装和运行

#### NeteaseCloudMusicApi

```javascript
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
$ npm install
$ node app.js
```

#### prettymusic

```Javascript
$ git clone https://gitee.com/Jay_Ohhh/prettrymusic.git
$ npm install
// 开发环境：编译和热更新
$ npm run serve
// 生产环境：编译并压缩（生产环境建议克隆 production 分支）
$ npm run build
// 生产环境：编译并压缩，且会在dist文件下生成report.html，会根据构建统计生成报告
$ npm run report 
```

### 页面（共15个）

#### 首页

![home](http://jay_ohhh.gitee.io/imagehosting/prettymusic/home.png)

#### 登录

![login](http://jay_ohhh.gitee.io/imagehosting/prettymusic/login.png)

#### 排行榜

![rank](http://jay_ohhh.gitee.io/imagehosting/prettymusic/rank.png)

#### 歌单

![song-sheet](http://jay_ohhh.gitee.io/imagehosting/prettymusic/SongSheet.png)

#### 歌手

![singer](http://jay_ohhh.gitee.io/imagehosting/prettymusic/singer.png)

#### 视频

![video](http://jay_ohhh.gitee.io/imagehosting/prettymusic/video.png)

#### mv

![video](http://jay_ohhh.gitee.io/imagehosting/prettymusic/mv.png)

#### 用户

[![personal](http://jay_ohhh.gitee.io/imagehosting/prettymusic/personal.png)](http://jay_ohhh.gitee.io/imagehosting/prettymusic/personal.png)

#### 歌单详情

![sheet-detail](http://jay_ohhh.gitee.io/imagehosting/prettymusic/SheetDetail.png)

#### 专辑详情

![album-detail](http://jay_ohhh.gitee.io/imagehosting/prettymusic/AlbumDetail.png)

#### 歌手详情

[![singer-detail](http://jay_ohhh.gitee.io/imagehosting/prettymusic/SingerDetail.png)](http://jay_ohhh.gitee.io/imagehosting/prettymusic/SingerDetail.png)

#### 视频详情

![video-detail](http://jay_ohhh.gitee.io/imagehosting/prettymusic/VideoDetail.png)

#### mv详情

![mv-detail](http://jay_ohhh.gitee.io/imagehosting/prettymusic/MvDetail.png)

#### 搜索

![search](http://jay_ohhh.gitee.io/imagehosting/prettymusic/search.png)

#### 404

![404](http://jay_ohhh.gitee.io/imagehosting/prettymusic/404.png)