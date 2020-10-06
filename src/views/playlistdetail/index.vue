<template>
  <!-- 歌单的歌曲列表页面（歌单详情页面） -->
  <div class="playlist-detail container">
    <!-- 左侧 -->
    <div class="left shadow">
      <!-- 左侧顶部 -->
      <div class="top">
        <div class="avatar">
          <img :src="detail.coverImgUrl" alt="">
        </div>
        <div class="info">
          <div class="title flex-row">
            <p>{{detail.name}}</p>
          </div>
          <div class="user flex-row">
            <div class="avatar" @click="toUser(creator.userId)">
              <img :src="creator.avatarUrl" alt="">
            </div>
            <span class="nickname" @click="toUser(creator.userId)">
              {{creator.nickname}}</span>
            <span class="createTime" v-if="detail.createTime">
              {{detail.createTime | formatDate('YYYY-MM-DD')}}创建
            </span>
          </div>
          <div class="tag flex-row" v-if="detail.tags&&detail.tags.length>0">
            标签：<a v-for="item in detail.tags" :key="item"
              @click="tag(item)">{{item}}</a>
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="detail.description"></p>
            <span class="flex-row" v-if="txtLength(detail.description)>50"
              @click="openDesc(detail.description,detail.name)">全部<i
                class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i></span>
          </div>
        </div>
      </div>
      <!-- 左侧内容 -->
      <!-- v-loading是element loading组件（加载+遮罩层）的指令方式 fullscreen是全屏遮罩修饰符 -->
      <div class="content" v-loading="screenLoading">
        <sheet-song-list :songs="songs" :is-person="ordered"
          @collectartist="collectArtist" :subscribed="detail.subscribed">
        </sheet-song-list>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="right">
      <!-- 喜欢这个歌单的人 -->
      <div class="like module shadow">
        <div class="card-header flex-row">
          <span>喜欢这个歌单的人</span>
        </div>
        <ul v-if="subscribers.length>0">
          <li v-for="item in subscribers" :key="item.userId">
            <div class="avatar" @click="toUser(item.userId)">
              <img :src="item.avatarUrl" alt="" :title="item.nickname">
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom:10px;">还没有人喜欢~</p>
      </div>
      <!-- 相关推荐 -->
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul>
          <li v-for="item in relatedList" :key="item.id"
            @click="toDetail(item.id)">
            <div class="avatar">
              <img :src="item.coverImgUrl" alt="" :title="item.nickname">
            </div>
            <div class="info">
              <h2 class="ellipsis" :title="item.name">{{item.name}}</h2>
              <span>By.<small>{{item.creator.nickname}}</small></span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 精彩评论 -->
      <div class="comment module shadow">
        <div class="card-header flex-row">
          <span>精彩评论</span>
        </div>
        <ul v-if="comments.length>0">
          <li class="item" v-for="item in comments" :key="item.time">
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
        <p class="no-data-text" v-else style="padding-bottom:10px;">等你来评论~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { createSong } from '../../utils/untils'
import sheetSongList from '../../components/common/SheetSongList'
export default {
  data() {
    return {
      // 歌单详情
      detail: {},
      // 歌单创建者信息
      creator: {},
      // 收藏这个歌单的用户
      subscribers: [],
      // 相关歌单
      relatedList: [],
      // 评论
      comments: [],
      // 歌曲列表
      songs: [],
      // 歌单id
      artistId: '',
      // 遮罩并加载
      screenLoading: false,
      // 是否自己的歌单
      ordered: false
    }
  },
  components: {
    sheetSongList
  },
  computed: {
    // 歌单的描述文字的长度
    txtLength() {
      return function(txt) {
        if (txt) {
          return txt.length
        }
      }
    }
  },
  watch: {
    $route(newId, oldId) {
      if (newId && newId !== oldId) {
        this.artistId = newId
        this._initialize(newId)
      }
    }
  },
  methods: {
    // 点击标签跳转到歌单列表页面
    tag(cate) {
      this.$router.push({
        path: '/playlist',
        query: {
          cate
        }
      })
    },
    // 获取歌单详情
    // id是歌单id, s是歌单最近的s个收藏者，默认为8
    async getPlayListDetail(id, s) {
      const res = await this.$api.getPlayListDetail(id, s)
      if (res.code === 200) {
        if (res.playlist.description !== null) {
          // ()标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用。
          // | 是 "或"，g是全局匹配
          // 替换掉换行符为br标签
          res.playlist.description = res.playlist.description.replace(
            /(\r\n|\n|\r)/g,
            '<br />'
          )
        }
        this.detail = res.playlist
        this.creator = res.playlist.creator
        let trackIds = res.playlist.trackIds
        // 数量超过1000，进行分割
        let arrLength = 1000
        let sliceArr = []
        for (let i = 0; i < trackIds.length; i += arrLength) {
          if (i + arrLength >= trackIds.length) {
            sliceArr.push(trackIds.slice(i, trackIds.length))
          } else {
            sliceArr.push(trackIds.slice(i, i + arrLength))
          }
        }
        this.getSongDetail(sliceArr)
      }
    },
    // 获取多首歌曲的歌曲详情
    async getSongDetail(sliceArr) {
      this.screenLoading = true
      let before = sliceArr[0]
      let after = sliceArr[1]
      let beforeIds = []
      let afterIds = []
      before.forEach(item => beforeIds.push(item.id))
      beforeIds = beforeIds.join(',')
      if (after && after.length !== 0) {
        after.forEach(item => afterIds.push(item.id))
        afterIds = afterIds.join(',')
        const beforeRes = await this.$api.getSongDetail(beforeIds)
        const afterRes = await this.$api.getSongDetail(afterIds)
        const res = beforeRes.songs.concat(afterRes.songs)
        this.songs = this._normalizeSongs(res)
      } else {
        const beforeRes = await this.$api.getSongDetail(beforeIds)
        const res = beforeRes.songs
        this.songs = this._normalizeSongs(res)
      }
      this.screenLoading = false
    },
    // 处理歌曲
    _normalizeSongs(list) {
      let arr = list.map(item => {
        if (item.id) {
          return createSong(item)
        }
      })
      return arr
    },
    // 获取相关歌单推荐
    // id是当前歌单的id
    async getRelatedPlayList(id) {
      let res = await this.$api.getRelatedPlayList(id)
      if (res.code === 200) {
        this.relatedList = res.playlists
      }
    },
    // 获取歌单收藏者
    // id是当前歌单的id
    async getSubscribers(id) {
      const params = {
        id,
        limit: 28, // 收藏者数量
        offset: 0 // 偏移量
      }
      const res = await this.$api.getSubscribers(params)
      if (res.code === 200) {
        this.subscribers = res.subscribers
      }
    },
    // 获取歌单评论
    // id是当前歌单的id
    async getSheetComment(id) {
      const params = {
        id,
        // 评论数量
        limit: 28,
        offset: 0
      }
      const res = await this.$api.getSheetComment(params)
      if (res.code === 200) {
        if (res.hotComments.length > 0) {
          this.comments = res.hotComments
        } else {
          this.comments = res.comments
        }
      }
    },
    // 打开歌单介绍详情
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
    // 收藏或取消收藏歌单，由于接口的问题，收藏与取消收藏的接口不会立即更新状态
    async collectArtist() {
      let message = this.detail.subscribed ? '已取消收藏' : '收藏成功'
      // 如果已收藏过该歌单
      if (this.detail.subscribed) {
        this.$confirm('确认取消收藏该歌单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
          .then(async () => {
            // t : 类型,1:收藏,2:取消收藏
            let t = this.detail.subscribed ? 2 : 1
            const res = await this.$api.collectArtist(t, this.artistId)
            if (res.code === 200) {
              this.detail.subscribed = !this.detail.subscribed
              this.$msg.success(message)
              // 刷新收藏者
              this.getSubscribers(this.artistId)
            }
          })
          .catch(e => {})
      } else {
        // t : 类型,1:收藏,2:取消收藏
        let t = this.detail.subscribed ? 2 : 1
        const res = await this.$api.collectArtist(t, this.artistId)
        if (res.code === 200) {
          this.detail.subscribed = !this.detail.subscribed
          this.$msg.success(message)
          // 刷新收藏者
          this.getSubscribers(this.artistId)
        }
      }
    },
    // 点击推荐歌单跳转到另一个歌单详情页面
    toDetail(id) {
      this.$router.push({
        path: '/playlistdetail',
        query: {
          id
        }
      })
    },
    // 点击跳转到用户页面
    toUser(id) {
      this.$router.push({
        path: '/personal',
        query: { id }
      })
    },
    // 初始化
    _initialize(id) {
      this.getPlayListDetail(id, 100)
      this.getRelatedPlayList(id)
      this.getSubscribers(id)
      this.getSheetComment(id)
    }
  },
  created() {
    this.artistId = this.$route.query.id
    if (this.artistId) {
      this._initialize(this.artistId)
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
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
            margin-right: 30px;
            cursor: pointer;
            &:hover {
              color: #fa2800;
            }
          }
          .createTime {
            font-size: 14px;
            color: #808080;
          }
        }
        .tag {
          a {
            padding: 4px 12px;
            margin-right: 15px;
            border-radius: 15px;
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            background-color: #fa2800;
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
      margin-top: 20px;
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
      .card-header {
        height: 20px;
        padding-left: 14px;
        margin-bottom: 15px;
        border-left: 3px solid #fa2800;
        font-weight: 700;
      }
    }
    .like {
      padding-bottom: 5px;
      ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
        li {
          // 每行7个li
          flex: 0 0 14.28%;
          max-width: 14.28%;
          padding: 0 5px 10px;
          cursor: pointer;
          .avatar {
            width: 100%;
            border-radius: 3px;
            overflow: hidden;
            img {
              width: 100%;
              border-radius: 3px;
            }
          }
        }
      }
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
    .comment {
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
}
</style>