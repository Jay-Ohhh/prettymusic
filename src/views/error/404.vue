<template>
  <!-- 404页面 -->
  <div>
    <!-- 顶部导航 -->
    <pretty-header></pretty-header>
    <div class="error-wrap container">
      <div class="content-error flex-column">
        <img src="../../assets/images/404.png" alt="">
        <h1>404</h1>
        <h4>哎呀！您访问的页面不存在~</h4>
      </div>
    </div>
    <!-- 页脚 -->
    <pretty-footer></pretty-footer>
  </div>
</template>

<script>
import prettyHeader from '../../components/content/header/index'
import prettyFooter from '../../components/common/Footer'
export default {
  components: {
    prettyHeader,
    prettyFooter
  }
}
</script>

<style lang="scss" scoped>
.error-wrap {
  padding-top: 70px;
  height: calc(100vh - 259px);
  .content-error {
    flex: 1;
    margin-top: 30px;
    img {
      margin-bottom: 20px;
    }
    h1 {
      line-height: 1.2;
      font-size: 84px;
      font-weight: 300;
    }
    h4 {
      font-size: 20px;
    }
  }
}
</style>