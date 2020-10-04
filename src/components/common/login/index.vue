<template>
  <!-- 登录页面 -->
  <kinesis-container>
    <div class="login-wrap">
      <kinesis-element :strength="4" :type="parallax">
        <div class="login-box">
          <!-- 表单框顶部 -->
          <img class="nice-logo" src="../../../assets/images/logo-a.png" alt="">
          <p class="theme">PrettyMusic</p>
          <!-- 表单 -->
          <div class="login-form">
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
              <div class="login-input">
                <el-form-item prop="phone">
                  <el-input class="login-text" type="text"
                    v-model="loginForm.phone" placeholder="请输入手机号" clearable>
                  </el-input>
                  <span class="login-focus"></span>
                  <span class="login-symbol">
                    <i class="iconfont nicephone2"></i>
                  </span>
                </el-form-item>
              </div>
              <div class="login-input">
                <el-form-item prop="password">
                  <el-input class="login-text" type="password"
                    v-model="loginForm.password" placeholder="请输入密码"
                    show-password @keyup.enter.native="login('loginForm')">
                  </el-input>
                  <span class="login-focus"></span>
                  <span class="login-symbol">
                    <i class="iconfont nicemima"></i>
                  </span>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="login-footer">
            <div class="login-btn-wrap"></div>
            <!-- loading 是否加载中状态 -->
            <el-button class="login-btn" type="primary" :loading="loginLoading"
              @click="login('loginForm')">登录</el-button>
          </div>
        </div>
      </kinesis-element>
    </div>
  </kinesis-container>
</template>

<script>
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data() {
    var validatePhone = (rule, value, callback) => {
      var phoneREX = /^1[3-9]\d{9}$/
      if (phoneREX.test(value)) {
        callback()
      } else if (value === '') {
        return callback(new Error('手机号不能为空'))
      } else {
        return callback(new Error('请输入正确手机号'))
      }
    }
    return {
      // 登录数据对象
      loginForm: {
        phone: '',
        password: ''
      },
      // 登录验证规则对象
      loginRules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码！', trigger: 'blur' }]
      },
      loginLoading: false,
      parallax: 'depth'
    }
  },
  components: {
    KinesisContainer,
    KinesisElement
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setLoginStatus']),
    // 登录
    async login(formName) {
      this.loginLoading = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { phone, password } = this.loginForm
          this.loginAsync(phone, password)
        }
      })
    },
    // 登录接口调用
    async loginAsync(phone, password) {
      this.loginLoading = true
      try {
        const res = await this.$api.login(phone, password)
        if (res.code === 200) {
          window.sessionStorage.setItem('cookie', JSON.stringify(res.cookie))
          window.sessionStorage.setItem('token', JSON.stringify(res.token))
          window.sessionStorage.setItem('loginStatus', 'true')
          await this.getUserDetail(res.profile.userId)
          this.setLoginStatus(true)
          this.$msg.success('登录成功')
          this.$router.push({ path: this.$store.state.backPath })
        } else {
          this.$msg.error('登录失败，请重试')
        }
        this.loginLoading = false
      } catch (e) {
        this.$msg.error('登录失败，请重试')
        this.loginLoading = false
      }
    },
    // 获取个人信息
    async getUserDetail(uid) {
      const res = await this.$api.getUserDetail(uid)
      if (res.code === 200) {
        const userInfo = res.profile
        userInfo.level = res.level
        userInfo.listenSongs = res.listenSongs
        userInfo.createTime = res.createTime
        userInfo.createDays = res.createDays
        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.setUserInfo(userInfo)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 15px;
  background: #5dd5c8 url('../../../assets/images/newbg1.png') no-repeat bottom;
  .login-box {
    position: relative;
    width: 350px;
    height: 486px;
    border-radius: 8px;
    box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.3);
    background: #fff url('../../../assets/images/logbg.jpg') no-repeat center
      bottom;
    text-align: center;
    overflow: hidden;
    backface-visibility: hidden;
    transition: transform 0.3s;
    z-index: 10;
    .nice-logo {
      width: 55px;
      min-height: 55px;
      margin: 40px 0 10px;
    }
    .theme {
      margin-bottom: 40px;
      font-size: 16px;
    }
    .login-form {
      width: 296px;
      margin: 0 auto;
      .login-input {
        position: relative;
        width: 100%;
        z-index: 1;
        margin-bottom: 10px;
        .login-text {
          display: block;
          width: 100%;
          height: 42px;
          padding: 0 0 0 45px;
          border: 1px solid #e3e7ed;
          border-radius: 3px;
          font-size: 14px;
          line-height: 1.5;
          color: #666;
          // //////////////////////////////////////////////////
          ::v-deep .el-input__inner {
            width: 100%;
            border: 0;
            height: 40px;
            padding: 0;
            // chrome浏览器表单自动填充默认样式
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus {
              box-shadow: 0 0 0 60px #fff inset;
              color: #666666;
            }
            // 获得焦点的el-input__inner
            .el-input__inner:focus + .el-input__inner {
              -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
              animation: anim-shadow 0.5s ease-in-out forwards;
            }
          }
        }
        .login-focus {
          display: block;
          position: absolute;
          border-radius: 3px;
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          color: rgba(230, 230, 230, 0.8);
        }
        .login-symbol {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          padding-left: 15px;
          border-radius: 3px;
          pointer-events: none;
          color: #666;
          transition: all 0.4s;
          i {
            padding-right: 10px;
            border-right: 1px solid #eceff3;
          }
        }
        .login-footer {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding-top: 10px;
          .login-btn-wrap {
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
            margin: 0 auto;
            border-radius: 3px;
            overflow: hidden;
            .login-btn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 42px;
              border: 0;
              border-radius: 3px;
              font-size: 15px;
              line-height: 1.5;
              color: #fff;
              background-color: #5dd5c8;
            }
          }
        }
      }
    }
  }
}
@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}
</style>