<template>
  <!-- 页脚 -->
  <div class="footer">
    <!-- container的样式已在common.css中写好 -->
    <div class="container">
      <p class="title">prettymusic</p>
      <p class="desc">愿每个努力生活的人都能被岁月温柔以待，祝好！</p>
      <!-- 两个图标 -->
      <div class="social flex-row">
        <router-link to="/home">
          <i class="iconfont nicewangyiyunyinle"></i>
        </router-link>
        <a href="https://gitee.com/Jay_Ohhh/prettrymusic" target="_blank">
          <i class="iconfont niceicon_githubb"></i>
        </a>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        <p>
          <span>Copyright © 2019-2020</span>
          <a href="https://gitee.com/Jay_Ohhh/prettrymusic" target="_blank">
            prettymusic 演示站. </a>
          <span>Improved by <a href="https://gitee.com/Jay_Ohhh"
              target="_blank">Jay_Ohhh</a> &
            Designed by <a href="https://www.lxhcool.cn/"
              target="_blank">lxhcool.</a></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: #161e27;
  .container {
    padding: 30px 0;
    .title {
      display: flex;
      align-items: center;
      height: 18px;
      padding: 10px;
      margin-bottom: 15px;
      border-left: 3px solid #fa2800;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 1px;
      color: #fff;
    }
    .desc {
      padding: 0 10px;
      font-size: 14px;
      color: #6d7685;
    }
    .social {
      margin-top: 20px;
      padding: 0 10px;
      a {
        position: relative;
        display: inline-block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        margin-right: 10px;
        border-radius: 50%;
        color: #6d7685;
        font-size: 14px;
        text-align: center;
        background-color: #232a31;
        transition: color 0.3s, background-color 0.3s;
        &:hover {
          color: #ccc;
          background-color: #11181f;
        }
      }
    }
  }
  .copyright {
    border-top: 1px solid #232a31;
    color: #6d7685;
    .container {
      padding: 20px 10px;
      a {
        color: #5829a3;
      }
    }
  }
}
</style>