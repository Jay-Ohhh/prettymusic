<template>
  <!-- 视频详情页面 -->
  <div class="video-detail container">
    <!-- 左侧 -->
    <div class="left shadow">
      <!-- controls -->
      <div class="video-container">
        <!-- controls 显示控件 -->
        <!-- controlslist="nodownload" 禁止下载 因为版权问题，不能下载 -->
        <video :src="videoUrl" controls controlslist="nodownload"></video>
      </div>
      <div class="video-foot">
        <h2 class="title flex-row">{{detail.title}}</h2>
        <div class="tag">
          <a v-for="item of detail.videoGroup" :key="item.id">#{{item.name}}</a>
        </div>
        <p class="flex-row">
          <span>发布：{{detail.publishTime|formatDate('YYYY-MM-DD')}}</span>
          <span
            v-if="detail.playTime">播放次数：{{detail.playTime|transNum(1)}}</span>
        </p>
        <div class="follow">
          <div class="box" :class="videoDetailInfo.isLike?'active':''"
            @click="like">
            <i class="iconfont nicexihuan3 icon-like"></i>
            {{videoDetailInfo.likeCount}}
          </div>
          <div class="box" @click="collect">
            <i class="iconfont niceshoucang2 icon-collection"></i>
            {{ detail.subscribeCount }}
          </div>
          <!-- 分享功能没写 -->
          <div class="box">
            <i class="iconfont nicefenxiang2 icon-share"></i>
            {{ videoDetailInfo.shareCount }}
          </div>
        </div>
      </div>
      <div class="comment-wrap">
        <div class="title flex-row">
          <i class="iconfont nicepinglun"></i>Comments |
          <span>{{videoDetailINfo.commentCount}} 条评论</span>
        </div>
        <comment-box :current-comment-id="currentCommentId"
          :fontMaxLength="1000" @commentsubmit="commentSubmit"
          @cancelcomment="cancelComment">
        </comment-box>
        <!-- 精彩评论 -->
        <div class="hot-comment comment-list" v-if="hotComments.length>0">
          <div class="card-header flex-row">
            <span>精彩评论</span>
          </div>
          <div v-for="item of hotComments" :key="item.commentId">
            <comment-line :comment="item" @commentreply="commentReply"
              @commentlike="commentLike" @commentdelete="commentDelete">
            </comment-line>
            <comment-box v-if="currentCommentId == item.commentId"
              :current-comment-id="currentCommentId" :fontMaxLength="1000"
              @commentsubmit="commentSubmit" @cancelcomment="cancelComment">
            </comment-box>
          </div>
        </div>
        <!-- 最新评论，没有则等你来评论~ -->
        <div class="new-comment comment-list">
          <div class="card-header flex-row">
            <span>最新评论</span>
          </div>
          <div v-if="comments.length>0">
            <div v-for="item of comments" :key="item.commentId">
              <comment-line :comment="item" @commentreply="commentReply"
                @commentlike="commentLike" @commentdelete="commentDelete">
              </comment-line>
              <comment-box v-if="currentCommentId == item.commentId"
                :current-comment-id="currentCommentId" :fontMaxLength="1000"
                @commentsubmit="commentSubmit" @cancelcomment="cancelComment">
              </comment-box>
            </div>
            <!-- 评论分页器 -->
            <el-pagination @size-change="handleSizeChange" background
              @current-change="handleCurrentChange" hide-on-single-page
              :current-page.sync="currentPage" :page-size="limit"
              layout="total, prev, pager, next, jumper" :total="commentTotal">
            </el-pagination>
          </div>
          <!-- test -->
          <pretty-empty v-else empty-text="等你来评论~"></pretty-empty>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="right">
      <!-- 视频简介 -->
      <div class="introduction module shadow">
        <div class="card-header flex-row">
          <span>视频简介</span>
        </div>
        <div class="content">
          <div class="author">
            <div class="avatar" @click="toUser(creator.userId)">
              <img :src="creator.avatarUrl" alt="">
            </div>
            <p class="name" @click="toUser(creator.userId)">{{creator.nickname}}
            </p>
            <p v-if="detail.description">{{detail.description}}</p>
            <p v-else>视频暂无简介~</p>
          </div>
        </div>
      </div>
      <!-- 相关推荐 -->
      <div class="related module shadow">
        <div class="card-header flex-row">
          <!-- 视频列表 -->
          <ul class="mv-list flex-row" v-if="relatedList.length>0">
            <!-- isLive：是否直播 -->
            <li :class="[{live:item.isLive},flexNum]" v-for="item in mvs"
              :key="item.id">
              <div class="cover" @click="toDetailOrLive(item.id,item.isLive)">
                <!-- 图片 -->
                <el-image :src="item.picUrl" lazy>
                  <!-- el-image 加载失败时内容 -->
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"
                      style="font-size:18px;"></i>
                  </div>
                </el-image>
                <!-- 播放数 -->
                <div class="count-wrapper">
                  <i class="arrow"></i>
                  <span class="count">{{item.playCount | transNum(1)}}</span>
                </div>
                <!-- 播放按钮 -->
                <div class="action">
                  <button class="play flex-center">
                    <i class="iconfont nicebofang1"></i>
                  </button>
                </div>
                <div class="foot flex-between">
                  <span>{{item.nickName}}</span>
                  <span>{{item.duration | formatTime}}</span>
                </div>
              </div>
              <div class="info">
                <h2 class="title ellipsis">{{item.title}}</h2>
              </div>
            </li>
          </ul>
          <!-- test -->
          <pretty-empty empty-text="暂无相关推荐视频~"></pretty-empty>
        </div>
      </div>
    </div>
</template>

<script>
import commentBox from '../../components/content/CommentBox'
import commentLine from '../../components/content/CommentLine'
import prettyEmpty from '../../components/common/PrettyEmpty'
export default {
  data() {
    return {
      // 当前页码
      currentPage: 1,
      // 请求参数对象
      // 请求的评论数量
      limit: 15,
      // 偏移量
      offset: 0,
      // 评论总数
      commentTotal: 0
    }
  },
  components: {
    commentBox,
    commentLine,
    prettyEmpty
  },
  methods: {
    // 提交评论
    async commentSubmit(content) {},
    // 取消评论
    async cancelComment() {},
    // 回复评论
    async commentReply() {},
    // 点赞/取消点赞评论
    // liked是boolean值
    async commentlike(id, liked) {},
    // 删除评论
    async commentDelete(id) {},
    // 改变每页显示个数
    handleSizeChange(val) {},
    // 改变当前页数
    handleCurrentChange(val) {}
  }
}
</script>

<style>
</style>