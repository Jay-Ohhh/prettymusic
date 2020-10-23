<template>
  <!-- 发表评论组件 -->
  <!-- 评论请先登录 -->
  <div class="comment-box">
    <div class="flex-row">
      <span>
        <i class="iconfont niceuser"></i>
        &emsp;
        <span v-if="userInfo.nickname">{{userInfo.nickname}}</span>
        <span class="login-btn" v-else @click="toLogin">评论请先登录~</span>
      </span>
      <!-- 点击CommentList组件的单条评论的回复按钮时才显示 -->
      <button class="cancel-comment" v-if="currentCommentId!=''"
        @click="cancelComment">取消回复
      </button>
    </div>
    <div class="comment-form">
      <div class="avatar">
        <!-- 未登录则显示默认头像 -->
        <img :src="userInfo.avatarUrl || '../../assets/images/squareUser.png'"
          alt="">
      </div>
      <div class="comment-area">
        <!-- cols:可见宽度 row:可见高度  -->
        <textarea name="comment" v-model="commentContent"
          aria-placeholder="等你来评论~" cols="50" row="5" maxlength="1000">
        </textarea>
        <span class="rest-tip">{{restFont}} / {{fontMaxLength}}</span>
      </div>
    </div>
    <div class="comment-foot">
      <button class="comment-btn" type="button"
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
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    // 剩余可输入的字数
    restFont() {
      return Number(fontMaxLength) - commentContent.length
    },
    // 我的用户信息
    userInfo() {
      return JSON.parse(sessionStorage.getItem('myInfo')) || this.getUserInfo
    }
  },
  watch: {
    currentCommentId(newVal, oldVal) {
      this.commentContent = ''
    }
  },
  methods: {
    // 提交评论
    commentSubmit() {
      this.$emit('commentsubmit', this.commentContent)
    },
    // 取消评论
    cancelComment() {
      this.$emit('cancelcomment')
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
    }
    .cancel-comment {
      padding: 6px 10px;
      border: 1px solid #aaa;
      border-radius: 2px;
      color: #aaa;
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
      textarea {
        width: 100%;
        height: 80px;
        padding: 6px 12px 22px;
        outline: none;
        border: 1px solid #eaebff;
        border-radius: 3px;
        background-color: #f8f9ff;
        // 取消文本域拖动变大变小
        resize: none;
        color: #666;
        font-size: 13px;
      }
      .rest-tip {
        position: absolute;
        bottom: 60px;
        right: 15px;
        line-height: 20px;
        color: #666;
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