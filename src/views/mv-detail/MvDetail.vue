<template>
  <!-- MV详情页面 -->
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
        <h2 class="title flex-row ellipsis">
          <i class="iconfont nicemv24"></i>
          {{detail.name}}
        </h2>
        <div class="tag">
          <a v-for="item of detail.videoGroup" :key="item.id">
            {{item.name}}
          </a>
        </div>
        <p class="flex-row">
          <span>发布：{{detail.publishTime | formatDate('YYYY-MM-DD')}}</span>
          <span
            v-if="detail.playTime">播放次数：{{detail.playTime | transNum(1)}}</span>
        </p>
        <div class="follow flex-row">
          <div class="box" :class="videoDetailInfo.isLike?'active':''"
            @click="likeResource">
            <i class="iconfont nicexihuan3 icon-like"></i>
            {{videoDetailInfo.likedCount}}
          </div>
          <div class="box">
            <i class="iconfont niceshoucang2 icon-collection"></i>
            {{ detail.subCount }}
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
          <span>{{videoDetailInfo.commentCount}} 条评论</span>
        </div>
        <comment-box v-if="currentCommentId===''" :clear-text="clearText"
          :current-comment-id="currentCommentId" :fontMaxLength="1000"
          @commentsubmit="commentSubmit" @cancelcomment="cancelComment">
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
              :clear-text="clearText" :current-comment-id="currentCommentId"
              :fontMaxLength="1000" @commentsubmit="commentSubmit"
              @cancelcomment="cancelComment">
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
                :clear-text="clearText" :current-comment-id="currentCommentId"
                :fontMaxLength="1000" @commentsubmit="commentSubmit"
                @cancelcomment="cancelComment">
              </comment-box>
            </div>
            <!-- 评论分页器 -->
            <el-pagination @size-change="handleSizeChange" background
              @current-change="handleCurrentChange" hide-on-single-page
              :current-page.sync="currentPage" :page-sizes="[15, 20, 30]"
              :page-size="limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="commentTotal">
            </el-pagination>
          </div>
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
        <div class="author" v-for="artist of artists" :key="artist.id">
          <div class="avatar" @click="toSinger(artist.id)">
            <img :src="artist.img1v1Url" alt="">
          </div>
          <p class="name" @click="toSinger(artist.id)">{{artist.name}}
          </p>
        </div>
        <p v-if="detail.desc">{{detail.desc}}
        </p>
        <p v-else>视频暂无简介~</p>
      </div>
      <!-- 相关推荐 -->
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <!-- 视频列表 -->
        <ul class="mv-list flex-row" v-if="relatedList.length>0">
          <!-- isLive：是否直播 -->
          <li :class="{live:item.isLive}" v-for="item in relatedList"
            :key="item.vid">
            <div class="cover" @click="toDetailOrLive(item.vid,item.isLive)">
              <!-- 图片 -->
              <el-image :src="item.cover">
                <!-- el-image 加载失败时内容 -->
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"
                    style="font-size:18px;"></i>
                </div>
              </el-image>
              <!-- 播放数 播放时长 -->
              <div class="top flex-between">
                <span class="count">
                  <i class="arrow"></i>{{item.playCount | transNum(1)}}
                </span>
                <span>{{item.duration | formatTime}}</span>
              </div>
              <!-- 播放按钮 -->
              <div class="action">
                <button class="play flex-center">
                  <i class="iconfont nicebofang1"></i>
                </button>
              </div>
            </div>
            <div class="info">
              <h2 class="title ellipsis">
                <i class="iconfont nicemv24"></i>
                {{item.name}}
              </h2>
              By<span v-for="author of item.artists" :key="author.id">
                <small>&emsp;{{author.name}}&emsp;</small>
              </span>
            </div>
          </li>
        </ul>
        <pretty-empty v-else empty-text="暂无相关推荐视频~"></pretty-empty>
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
      commentTotal: 0,
      // 视频详情
      detail: {},
      // 创作歌手数组
      artists: [],
      // 相关视频
      relatedList: [],
      // 热评
      hotComments: [],
      // 评论
      comments: [],
      // 想要回复的评论id
      // 为''时即发表评论，不对评论回复
      currentCommentId: '',
      // 视频播放地址
      videoUrl: '',
      // 视频id
      videoId: '',
      // 视频的点赞、转发、评论数据对象
      videoDetailInfo: {},
      // 清空文本框
      clearText: false
    }
  },
  components: {
    commentBox,
    commentLine,
    prettyEmpty
  },
  created() {
    this.videoId = this.$route.query.id
    this._initailze()
  },
  methods: {
    // 发送评论
    async commentSubmit(content) {
      if (content.trim() === '') {
        ELEMENT.Message('请输入内容')
        return
      } else {
        let timestamp = new Date().getTime()
        const params = {
          // 0歌曲 1mv 2歌单 3专辑 4电台 5视频 6动态
          type: 1,
          id: this.videoId,
          content,
          timestamp
        }
        if (this.currentCommentId === '') {
          // 发布评论
          params.t = 1
        } else {
          // 回复评论
          params.t = 2
          params.commentId = this.currentCommentId
        }
        const res = await this.$api.commentSubmit(params)
        if (res.code === 200) {
          ELEMENT.Message.success('提交成功')
          this.currentCommentId = ''
          this.clearText = true
          this.$nextTick(() => {
            this.clearText = false
          })
          this.getMvDetailInfo()
          this.getMvComments()
        }
      }
    },
    // 点击 取消回复 按钮
    cancelComment() {
      this.currentCommentId = ''
    },
    // 点击评论的回复按钮
    async commentReply(id) {
      this.currentCommentId = id
    },
    // 点赞/取消点赞评论
    // liked是boolean值
    async commentLike(cid, liked) {
      let timestamp = new Date().getTime()
      const params = {
        id: this.videoId,
        cid,
        // 0歌曲 1mv 2歌单 3专辑 4电台 5视频 6动态
        type: 1,
        timestamp
      }
      if (liked) {
        // 0取消点赞
        params.t = 0
      } else {
        // 1点赞
        params.t = 1
      }
      const res = await this.$api.commentLike(params)
      if (res.code === 200) {
        this.getMvComments(this.videoId)
      }
    },
    // 删除评论
    async commentDelete(id, content) {
      let timestamp = new Date().getTime()
      const params = {
        // 0删除 1发布 2回复
        t: 0,
        // 0歌曲 1mv 2歌单 3专辑 4电台 5视频 6动态
        type: 1,
        id: this.videoId,
        commentId: id,
        timestamp
      }
      const res = await this.$api.commentDelete(params)
      if (res.code === 200) {
        ELEMENT.Message.success('删除成功')
        this.getMvDetailInfo()
        this.getMvComments()
      }
    },
    // 资源点赞/取消点赞
    async likeResource() {
      // 1mv 4电台 5视频 6动态
      let type = 1
      // 1点赞 其余为取消点赞
      let t = 1
      if (this.videoDetailInfo.isLike) {
        t = 2
      }
      let timestamp = new Date().getTime()
      const params = {
        t,
        type,
        id: this.videoId,
        timestamp
      }
      const res = await this.$api.likeResource(params)
      if (res.code === 200) {
        this.getMvDetailInfo()
      }
    },
    // 获取mv播放地址
    async getMvUrl() {
      try {
        const res = await this.$api.getMvUrl(this.videoId)
        if (res.code === 200) {
          this.videoUrl = res.data.url
        }
      } catch (e) {
        ELEMENT.Message('视频无法加载，请重新刷新一下~')
      }
    },
    // 获取mv数据
    async getMvDetail() {
      const res = await this.$api.getMvDetail(this.videoId)
      if (res.code === 200) {
        res.data.videoGroup.forEach(item => {
          item.name = item.name.replace(/#/g, '')
        })
        this.detail = res.data
        this.artists = res.data.artists
      }
    },
    // 获取mv的点赞、转发、评论数
    async getMvDetailInfo() {
      let timestamp = new Date().getTime()
      const params = {
        mvid: this.videoId,
        timestamp
      }
      const res = await this.$api.getMvDetailInfo(params)
      if (res.code === 200) {
        const detail = {
          isLike: res.liked,
          likedCount: res.likedCount,
          shareCount: res.shareCount,
          commentCount: res.commentCount
        }
        this.videoDetailInfo = detail
      }
    },
    // 获取mv评论
    async getMvComments() {
      let timestamp = new Date().getTime()
      const params = {
        id: this.videoId,
        limit: this.limit,
        offset: this.offset,
        timestamp
      }
      const res = await this.$api.getMvComments(params)
      if (res.code === 200) {
        this.commentTotal = res.total
        this.hotComments = res.hotComments || []
        this.comments = res.comments || []
      }
    },
    // 获取相似mv
    async getMvRelated() {
      const res = await this.$api.getMvRelated(this.videoId)
      if (res.code === 200) {
        this.relatedList = res.mvs
      }
    },
    // 跳转到视频详情页面或直播页面
    toDetailOrLive(id, isLive) {
      if (isLive) {
        // 新窗口打开
        window.open(`https://iplay.163.com/live?id=${id}`, '_blank')
      } else {
        this.$router.push({
          path: '/mvdetail',
          query: { id }
        })
      }
    },
    // 跳转到歌手详情页面
    toSinger(id) {
      this.$router.push({
        path: '/singerdetail',
        query: { id }
      })
    },
    // 改变每页显示的评论个数
    handleSizeChange(val) {
      this.limit = val
      this.offset = val * (this.currentPage - 1)
      this.getMvComments()
    },
    // 改变评论页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getMvComments()
    },
    // 初始化
    _initailze() {
      this.getMvUrl()
      this.getMvDetail()
      this.getMvDetailInfo()
      this.getMvComments()
      this.getMvRelated()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header {
  height: 20px;
  padding-left: 14px;
  margin-bottom: 15px;
  border-left: 3px solid #fa2800;
  font-weight: 700;
}
.video-detail {
  display: flex;
  .left {
    flex: 1;
    padding: 15px;
    margin-right: 20px;
    border-radius: 8px;
    .video-container {
      // 视频播放器占位
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-radius: 3px;
        background-color: #333;
      }
    }
    .video-foot {
      margin-top: 8px;
      h2 {
        i {
          margin-right: 10px;
          font-size: 26px;
          color: #f0280d;
        }
      }
      .tag {
        margin: 10px 0 8px;
        cursor: default;
        a {
          display: inline-block;
          padding: 5px 15px;
          margin-right: 15px;
          border-radius: 15px;
          color: #fff;
          font-weight: normal;
          background-color: #fa2800;
        }
      }
      p {
        span {
          margin-right: 30px;
          font-size: 12px;
          color: #999;
        }
      }
      .follow {
        margin-top: 10px;
        .box {
          display: flex;
          align-items: center;
          padding: 0 10px;
          border-radius: 15px;
          margin-right: 15px;
          text-align: center;
          background-color: #f2f2f2;
          color: #161e27;
          cursor: pointer;
          i {
            font-size: 26px;
          }
          &.active {
            color: #fff;
            background-color: #fa2800;
          }
        }
      }
    }
    .comment-wrap {
      margin-top: 25px;
      .title {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #f1f1f1;
        i {
          margin-right: 10px;
          font-size: 18px;
          color: #666;
        }
        span {
          margin-left: 5px;
        }
      }
      .comment-list {
        width: 100%;
        margin-top: 20px;
        .el-pagination {
          margin-top: 20px;
        }
      }
    }
  }
  .right {
    flex-shrink: 0;
    width: 350px;
    .module {
      width: 100%;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 8px;
    }
    .introduction {
      .author {
        display: flex;
        align-items: center;
        margin: 5px 0 15px;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 15px;
          border-radius: 50%;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .name {
          flex: 1;
          cursor: pointer;
          transition: color 0.2s;
          &:hover {
            color: #fa2800;
          }
        }
      }
    }
    .related {
      padding-bottom: 0;
      .mv-list {
        flex-wrap: wrap;
        margin: 0 -15px;
        padding: 15px 0;
        li {
          flex: 0 0 100%;
          max-width: 100%;
          padding: 0 15px 20px;
          .cover {
            // 图片未加载完成占位
            position: relative;
            padding-top: 56%;
            border-radius: 5px;
            cursor: pointer;
            .el-image {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              width: 100%;
              height: 100%;
              border-radius: 5px;
              overflow: hidden;
              ::v-deep img {
                transition: transform 0.3s;
              }
            }
            .top {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
              width: 100%;
              padding: 5px 10px;
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
              color: #f3f3f3;
              font-weight: 500;
              background-image: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.7),
                transparent
              );
              .count {
                i {
                  display: inline-block;
                  width: 0;
                  height: 0;
                  border-style: solid;
                  border-width: 5px 0 5px 6px;
                  border-color: transparent transparent transparent #fff;
                  margin-right: 5px;
                }
              }
            }
            .action {
              position: absolute;
              top: 50%;
              left: 50%;
              z-index: 2;
              transform: translate(-50%, -50%);
              opacity: 0;
              transition: opacity 0.3s;
              .play {
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 50%;
                color: #fff;
                font-size: 12px;
                background-color: #fa2800;
                cursor: pointer;
                i {
                  position: relative;
                  left: 1px;
                }
              }
            }
            &:hover {
              .el-image {
                ::v-deep img {
                  transform: scale(1.1);
                }
              }
              .action {
                opacity: 1;
              }
            }
          }
          .info {
            margin-top: 12px;
            color: #a5a5c1;
            .title {
              margin-bottom: 5px;
              line-height: 1.3;
              font-size: 15px;
              font-weight: 500;
              color: #4a4a4a;
              i {
                margin-right: 10px;
                font-size: 26px;
                color: #f0280d;
              }
            }
            span {
              font-size: 12px;
              color: #a5a5c1;
            }
          }
          &.live {
            .cover {
              .top {
                background-image: linear-gradient(
                  to bottom,
                  rgba(250, 40, 0, 0.75),
                  transparent
                );
              }
            }
          }
        }
      }
    }
  }
}
</style>