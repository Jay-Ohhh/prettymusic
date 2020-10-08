<template>
  <div class="layout">
    <!-- 顶部导航 -->
    <pretty-header></pretty-header>
    <!-- 主体区域 -->
    <div class="main">
      <!-- 需要考虑哪些路由keep-alive对于用户体验比较好 -->
      <keep-alive include="singerDetail,playListDetail,personal">
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

<style lang="scss" scoped>
.layout {
  width: 100%;
  min-width: 970px;
  .main {
    min-height: 1000px;
    margin-top: 70px;
    padding: 20px 0;
  }
}
</style>