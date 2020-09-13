<template>
  <div class="layout">
    <!-- 顶部导航 -->
    <pretty-header></pretty-header>
    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import prettyHeader from '../../components/content/header/index'
export default {
  components: {
    prettyHeader
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