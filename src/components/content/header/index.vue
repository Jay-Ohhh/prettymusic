<template>
  <!-- 顶部导航组件 -->
  <div class="header shadow">
    <div class="container flex-row">
      <!-- logo -->
      <div class="logo">
        <img src="../../../assets/images/logo-icon.png" alt="">
        <h1 class="title">prettymusic</h1>
        <router-link :to="{path:'/home'}" tag="a"></router-link>
      </div>
      <!-- 导航标签 -->
      <ul class="nav flex-row">
        <li>
          <router-link to='/home' tag="a">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/rank" tag="a">排行榜</router-link>
        </li>
        <li>
          <router-link to="/playlist" tag="a">歌单</router-link>
        </li>
        <li>
          <router-link to="/singer" tag="a">歌手</router-link>
        </li>
        <li>
          <router-link to="/video" tag="a">视频</router-link>
        </li>
        <li>
          <router-link to="/mv" tag="a">MV</router-link>
        </li>
      </ul>
      <!-- 搜索栏 -->
      <div class="search">
        <i class="iconfont nicesearch-o"></i>
      </div>
      <!-- 登录 -->
      <div class="login flex-row">
        <router-link to="/login" tag="a">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import url('https://fonts.font.im/css?family=Patua+One');
/* font-family: 'Patua One', cursive; */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 999;
  .container {
    height: 100%;
    .logo {
      position: relative;
      width: 200px;
      img {
        width: 30px;
        height: 30px;
      }
      h1 {
        display: inline;
        margin-left: 10px;
        font-family: 'Patua One', cursive;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1px;
      }
      a {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.nav {
  flex: 1;
  li {
    position: relative;
    font-size: 14px;
    padding: 0 15px;
    cursor: pointer;
    & .router-link-active::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -12px;
      width: 4px;
      height: 4px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #fa2800;
    }
  }
}
.search {
  i {
    padding: 0 15px;
    border-right: 1px solid #ccc;
    cursor: pointer;
    font-size: 20px;
    font-weight: 500;
  }
}
.login {
  padding-left: 20px;
  cursor: pointer;
  & a {
    transition: color 0.3s;
  }
  & a:hover {
    color: #fa2800;
  }
}
// 激活路由
.router-link-active {
  color: #fa2800;
}
</style>