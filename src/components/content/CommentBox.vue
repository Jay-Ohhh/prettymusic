<template>
  <!-- 发表评论组件 -->
  <!-- 评论请先登录 -->
  <div class="comment-box">
    <div class="flex-between">
      <span>
        <span v-if="userInfo.nickname">
          <i class="iconfont niceuser"></i>
          &emsp;{{userInfo.nickname}}
        </span>
        <span class="login-btn" v-else @click="toLogin">评论请先登录</span>
      </span>
      <!-- 点击CommentList组件的单条评论的回复按钮时才显示 -->
      <button class="cancel-comment" v-if="currentCommentId!=''"
        @click="cancelComment">取消回复
      </button>
    </div>
    <div class="comment-form">
      <div class="avatar">
        <!-- 未登录则显示默认头像 -->
        <img :src="userInfo.avatarUrl" alt="" v-if="userInfo.avatarUrl">
        <img src="../../assets/images/squareUser.png" alt="" v-else>
      </div>
      <div class="comment-area">
        <!-- cols:可见宽度 row:可见高度  -->
        <textarea name="comment" :disabled="!loginStatus"
          :class="{disabled:!loginStatus}" v-model="commentContent"
          :placeholder="placeholder" maxlength="1000">
        </textarea>
        <span class="rest-tip">{{restFont}} / {{fontMaxLength}}</span>
      </div>
    </div>
    <div class="comment-foot">
      <button class="comment-btn" type="button" v-preventReclick="2000"
        @click="commentSubmit">评论</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // 评论内容
      commentContent: ''
    }
  },
  props: {
    currentCommentId: {
      type: [Number, String]
    },
    // 可输入的最大字数
    fontMaxLength: {
      type: [Number, String],
      default: 1000
    },
    // 清空文本框
    clearText: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getLoginStatus']),
    // 剩余可输入的字数
    restFont() {
      return Number(this.fontMaxLength) - this.commentContent.length
    },
    // 我的用户信息
    userInfo() {
      return JSON.parse(sessionStorage.getItem('myInfo')) || this.getUserInfo
    },
    // 登录状态
    loginStatus() {
      this.$bus.$on('forceUpdate', () => {
        this.$router.go(0)
      })
      if (JSON.parse(sessionStorage.getItem('loginStatus'))) {
        return true
      }
      return this.getLoginStatus
    },
    // 文本框的提示文字
    placeholder() {
      if (this.loginStatus) {
        return '等你来评论~'
      } else {
        return '登录后才能评论哦~'
      }
    }
  },
  watch: {
    currentCommentId(newVal, oldVal) {
      // 回复不同的评论或取消回复，清空文本框的内容
      this.commentContent = ''
    },
    // 发布完评论清空文本框
    clearText(newVal) {
      if (newVal) {
        this.commentContent = ''
      }
    }
  },
  methods: {
    // 提交评论
    commentSubmit() {
      if (this.loginStatus === false) {
        ELEMENT.Message('评论请先登录')
        return
      }
      this.$emit('commentsubmit', this.commentContent)
    },
    // 取消评论
    cancelComment() {
      this.$emit('cancelcomment')
    },
    // 跳转到登录页面
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-box {
  margin-top: 20px;
  div {
    span {
      i {
        margin-right: 10px;
      }
      .login-btn {
        cursor: pointer;
        transition: color 0.2s;
        &:hover {
          color: #fa2800;
        }
      }
    }
    .cancel-comment {
      padding: 6px 10px;
      border: 1px solid #bbb;
      border-radius: 2px;
      color: #bbb;
      font-size: 12px;
      background-color: #fff;
      cursor: pointer;
    }
  }
  .comment-form {
    display: flex;
    margin-top: 20px;
    .avatar {
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      margin-right: 20px;
      border-radius: 3px;
      img {
        width: 100%;
        border-radius: 3px;
      }
    }
    .comment-area {
      flex: 1;
      position: relative;
      padding: 10px 12px 30px;
      border: 1px solid #eaebff;
      border-radius: 3px;
      background-color: #f8f9ff;
      textarea {
        width: 100%;
        // 显示5行，且文字不会被挡去一部分
        height: 80px;
        line-height: 16px;
        outline: none;
        background-color: #f8f9ff;
        // 取消文本域拖动变大变小
        resize: none;
        color: #666;
        font-size: 13px;
        &.disabled {
          cursor: not-allowed;
        }
      }
      .rest-tip {
        position: absolute;
        bottom: 8px;
        right: 15px;
        line-height: 20px;
        color: #999;
        font-weight: 500;
      }
    }
  }
  .comment-foot {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
    .comment-btn {
      padding: 10px 30px;
      border-radius: 3px;
      border: 0;
      outline: none;
      cursor: pointer;
      color: #fff;
      background: #ff416c; /* fallback for old browsers */
      /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      background: linear-gradient(to right, #ff4b2b, #ff416c);
    }
  }
}
</style>