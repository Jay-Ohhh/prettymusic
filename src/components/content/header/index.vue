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
        <i class="iconfont nicesearch-o" @click="openSearchInput"></i>
      </div>
      <div class="userbox">
        <!-- 登录 -->
        <div class="login flex-row" v-if="!loginStatus">
          <router-link to="/login" tag="a">登录</router-link>
        </div>
        <!-- 登录后的头像 -->
        <div class="logined flex-row" v-else>
          <el-avatar class="avatar" :src="avatarUrl"></el-avatar>
          <!-- @command点击下拉菜单项触发的事件回调 -->
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- command是handleCommand的参数 -->
              <!-- 只做了个人主页的功能 -->
              <el-dropdown-item icon="el-icon-user" command="personal">个人主页
              </el-dropdown-item>
              <el-dropdown-item divided icon="el-icon-switch-button"
                command="loginOut">退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 搜索框 -->
    <search-input :open-search.sync="openSearch" v-show="openSearch">
    </search-input>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import searchInput from '../SearchInput'
export default {
  data() {
    return {
      openSearch: false,
      loginStatus: JSON.parse(sessionStorage.getItem('loginStatus'))
    }
  },
  computed: {
    ...mapGetters(['getLoginStatus', 'getUserInfo']),
    // 头像图片链接
    avatarUrl() {
      return (
        JSON.parse(sessionStorage.getItem('myInfo')).avatarUrl ||
        this.getUserInfo.avatarUrl
      )
      // 其实也可以通过判断sessionStorage有没有token和cookie,然后在created钩子发送获取用户信息的请求
      // 用一个data的属性保存
      // 不过上面的本地缓存方法会方便些，不需要发送请求
    },
    // 我的昵称
    nickname() {
      return (
        JSON.parse(sessionStorage.getItem('myInfo')).nickname ||
        this.getUserInfo.nickname
      )
    }
  },
  components: { searchInput },
  methods: {
    // 点击下拉菜单项触发的事件回调
    handleCommand(command) {
      if (command === 'personal') {
        this.$router.push({
          path: '/personal',
          query: {
            id:
              JSON.parse(sessionStorage.getItem('myInfo')).userId ||
              this.$store.state.userInfo.userId
          }
        })
      } else if (command === 'loginOut') {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('cookie')
        sessionStorage.removeItem('loginStatus')
        this.loginStatus = false
        sessionStorage.removeItem('myInfo')
        this.$store.commit('setUserInfo', {})
        this.$store.commit('setLoginStatus', false)
        this.$forceUpdate()
        this.$bus.$emit('forceUpdate')
      }
    },
    // 打开搜索框
    openSearchInput() {
      this.openSearch = true
    }
  }
}
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
    color: #161e27;
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
.userbox {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  .line {
    width: 1px;
    height: 22px;
    background-color: #e1e1e1;
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
  .logined {
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    .avatar {
      margin-right: 15px;
    }
    .el-dropdown-link {
      display: inline-block;
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .el-icon-arrow-down {
        position: absolute;
        top: 20%;
        right: -18px;
      }
    }
  }
}
// 激活的路由类名(激活的标签)
.router-link-active {
  color: #fa2800;
}
</style>