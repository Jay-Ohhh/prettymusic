<template>
  <!-- 评论列表组件 -->
  <div class="comment-line">
    <div class="avatar">
      <img :src="comment.user.avatarUrl" alt="" :title="comment.user.nickname">
    </div>
    <div class="info">
      <h2 class="flex-between">
        <span>{{comment.user.nickname}}
          <small> · {{comment.time | formatTimeBefore}}</small>
        </span>
        <div class="tool flex-row">
          <i class="iconfont nicezan1 icon-zan" :class="{active:comment.liked}"
            @click="commentLike(comment.commentId,comment.liked)">
          </i>
          <span>({{comment.likeCount}})</span>
          <i class="iconfont nicevoice icon-comment"
            v-if="comment.user.userId !== myId"
            @click="commentReply(comment.commentId)">
          </i>
          <span v-else @click="commentDelete(comment.commentId)">删除</span>
        </div>
      </h2>
      <div class="content">{{comment.content}}
        <div class="reply" v-for="subItem of comment.beReplied"
          :key="subItem.beRepliedCommentId">
          <small>@{{subItem.user.nickname}}：</small>{{subItem.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 单条评论数据对象
    comment: {
      type: Object
    }
  },
  computed: {
    // 我的ID
    myId() {
      return (
        JOSN.parse(sessionStorage.getItem('myInfo')).userId ||
        this.$store.getters.getUserInfo.userId
      )
    }
  },
  methods: {
    // 回复评论
    commentReply(id) {
      this.$emit('commentreply', id)
    },
    // 点赞/取消点赞评论
    // liked是boolean值
    commentLike(id, liked) {
      this.$emit('commentlike', id, liked)
    },
    // 删除评论
    commentDelete(id) {
      this.$emit('commentdelete', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-line {
  display: flex;
  width: 100%;
  padding: 10px 0;
  .avatar {
    flex-shrink: 0;
    width: 45px;
    height: 45px;
    margin-right: 12px;
    border-radius: 50%;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    h2 {
      font-size: 15px;
      margin-right: 5px;
      margin-bottom: 10px;
      small {
        font-size: 12px;
        font-weight: 200;
        color: #a5a5c1;
      }
      .tool {
        i {
          font-size: 24px;
          font-weight: 100;
          cursor: pointer;
        }
        .icon-zan.active {
          color: #fa2800;
        }
        span {
          position: relative;
          margin: 2px 20px 0 0;
          font-size: 12px;
          font-weight: 200;
          color: #666;
          &::after {
            content: '';
            position: absolute;
            top: 2px;
            right: -12px;
            width: 1px;
            height: 13px;
            background-color: #93939e;
          }
        }
      }
    }
    .content {
      width: 100%;
      padding: 8px 10px;
      margin-top: 5px;
      line-height: 1.6;
      border-radius: 3px;
      color: #4a4a4a;
      background-color: #f5f5f5;
      .reply {
        padding: 8px 10px;
        margin-top: 10px;
        border-radius: 3px;
        color: #666;
        background-color: #fff;
        small {
          color: #fa2800;
        }
      }
    }
  }
}
</style>