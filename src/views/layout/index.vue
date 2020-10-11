<template>
  <!-- 布局组件，用于页面的布局（登录页面除外） -->
  <!-- 由于视频页面的整体高度较小，因此需要用一个类名单独设置 -->
  <div class="layout" :class="$route.path==='/video'?'layout-video':''">
    <!-- 顶部导航 -->
    <pretty-header></pretty-header>
    <!-- 主体区域 -->
    <div class="main">
      <!-- 需要考虑哪些路由keep-alive对于用户体验比较好 -->
      <keep-alive include="singerDetail,playListDetail,rank,personal,singer">
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </div>
    <!-- 底部播放组件 -->
    <play-bar></play-bar>
    <!-- 页脚 -->
    <pretty-footer></pretty-footer>
    <!-- 返回顶部按钮 -->
    <back-top></back-top>
    <!-- 漂浮圆圈背景 -->
    <bg-fly-circle></bg-fly-circle>
  </div>
</template>

<script>
import prettyHeader from '../../components/content/header/index'
import playBar from '../../components/common/playerBar/playerBar'
import prettyFooter from '../../components/common/Footer'
import bgFlyCircle from '../../components/common/Bg_Fly_Circle'
import backTop from '../../components/common/BackTop'
export default {
  name: 'layout',
  components: {
    prettyHeader,
    playBar,
    prettyFooter,
    bgFlyCircle,
    backTop
  }
}
</script>

<style lang="scss">
.layout {
  width: 100%;
  .main {
    // 设置最小高度是为了刷新页面时对空白部分进行占位，让页脚出现在上方
    min-height: 970px;
    margin-top: 70px;
    padding: 20px 0;
  }
}
.layout.layout-video {
  .main {
    min-height: 600px;
  }
}
</style>