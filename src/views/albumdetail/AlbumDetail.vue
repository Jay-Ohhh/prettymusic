<template>
  <div class="album-detail container">
    <!-- 左侧 -->
    <div class="left shadow">
      <!-- 左侧顶部 -->
      <div class="top">
        <div class="avatar">
          <img :src="detail.picUrl" alt="">
        </div>
        <div class="info">
          <div class="title flex-row">
            <p>{{detail.name}}</p>
          </div>
          <div class="user flex-row">
            <div class="avatar" @click="toSingerDetail(creator.id)">
              <img :src="creator.picUrl" alt="">
            </div>
            <span class="nickname" @click="toSingerDetail(creator.id)">
              {{creator.name}}</span>
            <span class="createTime" v-if="detail.publishTime">
              {{detail.publishTime | formatDate('YYYY-MM-DD')}} 创建
            </span>
          </div>
          <div class="flex-row">
            发行公司：{{detail.company}}
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="detail.description"></p>
            <span class="flex-row" v-if="txtLength(detail.description)>50"
              @click="openDesc(detail.description,detail.name)">全部<i
                class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i></span>
          </div>
        </div>
      </div>
      <!-- 左侧内容：歌曲列表 -->
      <!-- v-loading是element loading组件（加载+遮罩层）的指令方式 fullscreen是全屏遮罩修饰符 -->
      <!-- 默认状况下，Loading 遮罩会插入到绑定元素的子节点 -->
      <div class="content" v-loading="screenLoading">
        <sheet-song-list :songs="songs" :is-person="false">
        </sheet-song-list>
      </div>
      <!-- 左侧精彩评论 -->
      <div class="comment">
        <div class="card-header flex-row">
          <span>精彩评论</span>
        </div>
        <ul v-if="comments.length>0">
          <li class="item" v-for="item in comments" :key="item.commentId">
            <div class="avatar" @click="toUser(item.user.userId)">
              <img :src="item.user.avatarUrl" alt=""
                :title="item.user.nickname">
            </div>
            <div class="info">
              <span @click="toUser(item.user.userId)">
                {{item.user.nickname}}<small> ·
                  {{item.time | formatTimeBefore}}</small>
              </span>
              <p>{{item.content}}</p>
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom:10px;">
          {{emptyComment}}
        </p>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="right">
      <!-- 热门专辑 -->
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>热门专辑</span>
        </div>
        <ul v-if="hotAlbums.length>0">
          <li v-for="item in hotAlbums" :key="item.id"
            @click="toAlbumDetail(item.id)">
            <div class="avatar">
              <img :src="item.picUrl" alt="" :title="item.name">
            </div>
            <div class="info">
              <h2 class="ellipsis" :title="item.name">{{item.name}}</h2>
              <span>By.<small>{{item.artist.name}}</small></span>
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom:10px;">
          {{emptyAlbum}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { createSong } from '../../utils/untils'
import sheetSongList from '../../components/content/SheetSongList'
export default {
  name: 'albumdetail',
  data() {
    return {
      // 歌单详情
      detail: {},
      // 歌单创建者信息
      creator: {},
      // 专辑id
      albumId: '',
      // 评论
      comments: [],
      // 歌曲列表
      songs: [],
      // 热门专辑
      hotAlbums: [],
      // 遮罩并加载
      screenLoading: false,
      // 没有评论时显示的文本
      emptyComment: '',
      // 没有热门专辑时显示的文本
      emptyAlbum: ''
    }
  },
  components: {
    sheetSongList
  },
  computed: {
    // 专辑的描述文字的长度
    txtLength() {
      // 返回一个函数，传入detail.description，即会执行
      return function(txt) {
        if (txt) {
          return txt.length
        }
      }
    }
  },
  created() {
    this.albumId = this.$route.query.id
    this._initialize()
  },
  methods: {
    // 获取专辑详情
    async getAlbumData() {
      this.screenLoading = true
      try {
        const res = await this.$api.getAlbumData(this.albumId)
        if (res.code === 200) {
          // ()标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用。
          // | 是 "或"，g是全局匹配
          // 替换掉换行符为br标签
          // replace方法返回一个新字符串
          res.album.description = res.album.description.replace(
            /(\r\n|\n|\r)/g,
            '<br />'
          )
          this.detail = res.album
          this.creator = res.album.artist
          this.songs = this._normalizeSongs(res.songs)
          this.screenLoading = false
        }
      } catch (e) {
        this.screenLoading = false
      }
    },
    // 获取歌手专辑
    async getArtistAlbum() {
      const params = {
        // 歌手id
        id: this.creator.id,
        // 返回数量
        limit: 10,
        // 偏移量
        offset: 0
      }
      const res = await this.$api.getArtistAlbum(params)
      if (res.code === 200) {
        this.hotAlbums = res.hotAlbums
        if (res.hotAlbums.length === 0) {
          this.emptyAlbum = '还没有其他专辑~'
        }
      }
    },
    // 获取专辑评论
    async getAlbumComment() {
      const params = {
        // 专辑 id
        id: this.albumId,
        // 评论数量
        limit: 30,
        // 偏移量
        offset: 0
      }
      const res = await this.$api.getAlbumComment(params)
      if (res.code === 200) {
        // 优先显示热门评论
        if (res.hotComments.length > 0) {
          this.comments = res.hotComments
        } else {
          this.comments = res.comments
        }
        if (this.comments.length === 0) {
          this.emptyComment = '等你来评论~'
        }
      }
    },
    // 处理歌曲
    _normalizeSongs(list) {
      const arr = []
      list.forEach(item => {
        if (item.id) {
          arr.push(createSong(item))
        }
      })
      return arr
    },
    // 打开专辑介绍详情
    openDesc(message, title) {
      this.$alert(message, title, {
        // 是否可通过点击遮罩关闭
        closeOnClickModal: true,
        // MessageBox 的自定义类名
        customClass: 'descBox',
        // 是否显示确认按钮
        showConfirmButton: false,
        // 是否将 message 属性作为 HTML 片段处理
        dangerouslyUseHTMLString: true
      }).catch(e => {})
    },
    // 跳转到专辑详情页面
    toAlbumDetail(id) {
      this.$router.push({
        path: '/albumdetail',
        query: { id }
      })
    },
    // 跳转到歌手详情页面
    toSingerDetail(id) {
      this.$router.push({
        path: '/singerdetail',
        query: { id }
      })
    },
    // 跳转到用户页面
    toUser(id) {
      this.$router.push({
        path: '/personal',
        query: { id }
      })
    },
    // 初始化
    async _initialize() {
      // 因为creator要通过getAlbumData()获取
      // 而getArtistAlbum()要用到creator.id
      // 所以，getAlbumData要排在getArtistAlbum前面
      await this.getAlbumData()
      this.getArtistAlbum()
      this.getAlbumComment()
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
.album-detail {
  display: flex;
  align-items: flex-start;
  .left {
    flex-shrink: 0;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    .top {
      display: flex;
      & > .avatar {
        flex-shrink: 0;
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 8px;
        margin-right: 30px;
        img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
        &::after {
          content: '';
          position: absolute;
          top: 15px;
          right: -5px;
          z-index: 0;
          width: 95%;
          height: 95%;
          border-radius: 8px;
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          width: 100%;
          line-height: 24px;
          margin: 10px 0 20px 0;
          font-size: 24px;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .user {
          margin-bottom: 15px;
          .avatar {
            position: relative;
            width: 30px;
            height: 30px;
            margin-right: 15px;
            border-radius: 50%;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .nickname {
            font-size: 14px;
            margin-right: 20px;
            cursor: pointer;
            transition: color 0.2s;
            &:hover {
              color: #fa2800;
            }
          }
          .createTime {
            font-size: 14px;
            color: #808080;
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          line-height: 1.6;
          margin-top: 15px;
          p {
            flex: 1;
            font-size: 14px;
          }
          span {
            flex-shrink: 0;
            color: #fa2800;
            cursor: pointer;
          }
        }
      }
    }
    .content {
      margin: 20px 0 15px;
    }
    .comment {
      padding: 20px 15px;
      ul {
        li {
          display: flex;
          width: 100%;
          padding: 10px 0;
          .avatar {
            flex-shrink: 0;
            width: 38px;
            height: 38px;
            margin-right: 12px;
            border-radius: 50%;
            cursor: pointer;
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          .info {
            flex: 1;
            span {
              margin: 0 5px 10px 0;
              font-size: 15px;
              cursor: pointer;
              small {
                font-size: 12px;
                color: #a5a5c1;
                font-weight: 200;
              }
            }
            p {
              width: 100%;
              padding: 5px 10px;
              margin-top: 5px;
              line-height: 1.6;
              border-radius: 3px;
              font-size: 12px;
              color: #666;
              background-color: #f5f5f5;
            }
          }
        }
      }
    }
  }
  .right {
    flex-shrink: 0;
    width: 350px;
    .module {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .related {
      padding-bottom: 5px;
      ul {
        li {
          display: flex;
          margin-bottom: 15px;
          cursor: pointer;
          .avatar {
            flex-shrink: 0;
            width: 50px;
            height: 50px;
            margin-right: 15px;
            border-radius: 3px;
            img {
              width: 100%;
              border-radius: 3px;
            }
          }
          .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 50px;
            overflow: hidden;
            h2 {
              width: 100%;
              height: 100%;
              margin-bottom: 10px;
              font-size: 14px;
              color: #4a4a4a;
              transition: color 0.2s;
            }
            span {
              font-size: 12px;
              color: #a5a5c1;
            }
            &:hover {
              h2 {
                color: #fa2800;
              }
            }
          }
        }
      }
    }
  }
}
</style>