<template>
  <div class="layout">
    <!-- 顶部导航 -->
    <pretty-header></pretty-header>
    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 底部播放组件 -->
    <play-bar></play-bar>
  </div>
</template>

<script>
import prettyHeader from '../../components/content/header/index'
import playBar from '../../components/common/playerBar/playerBar'
export default {
  components: {
    prettyHeader,
    playBar
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  min-width: 750px;
  .main {
    margin-top: 70px;
    padding: 20px 0;
  }
}
</style>