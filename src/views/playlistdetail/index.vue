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
              {{detail.createTime | formatDate('YYYY-MM-DD')}} 创建
            </span>
          </div>
          <div class="tag flex-row" v-if="detail.tags&&detail.tags.length>0">
            标签：<a v-for="item in detail.tags" :key="item"
              @click="tag(item)">{{item}}</a>
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="detail.description"></p>
            <span class="flex-row" v-if="txtLength(detail.description)>50"
              @click="openDesc(detail.description,detail.name)">全部
              <i
                class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
            </span>
          </div>
        </div>
      </div>
      <!-- 左侧内容 -->
      <!-- v-loading是element loading组件（加载+遮罩层）的指令方式 fullscreen是全屏遮罩修饰符 -->
      <!-- 默认状况下，Loading 遮罩会插入到绑定元素的子节点 -->
      <div class="content" v-loading="screenLoading">
        <sheet-song-list :songs="songs" :is-person="isPerson"
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
        <p class="no-data-text" v-else style="padding-bottom:10px;">
          {{emptyText}}
        </p>
      </div>
      <!-- 相关推荐 -->
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul v-if="relatedList.length>0">
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
        <p class="no-data-text" v-else style="padding-bottom:10px;">
          {{emptyRelated}}
        </p>
      </div>
      <!-- 精彩评论 -->
      <div class="comment module shadow">
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
  </div>
</template>

<script>
import { createSong } from '../../utils/untils'
import sheetSongList from '../../components/content/SheetSongList'
export default {
  name: 'playListDetail',
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
      // 是否自己的歌单,如果是则不显示收藏按钮
      isPerson: false,
      // 没有人收藏该歌单时显示的文本
      emptyText: '',
      // 没有相关推荐时显示的文本
      emptyRelated: '',
      // 没有评论时显示的文本
      emptyComment: ''
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
  created() {
    this.artistId = this.$route.query.id
    this._initialize(this.artistId)
  },
  watch: {
    // 因为设置了 <router-view :key="$route.fullPath"></router-view>
    // url的参数发生变化，路由就会重新创建，因为不是同一路由，所以$route不会出现新值和旧值
    // 因此不需要watch
    // $route(newPath, oldPath) {
    //   if (newPath && newPath !== oldPath) {
    //     this.artistId = this.$route.query.id
    //     this._initialize(this.artistId)
    //   }
    // }
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
          // replace方法返回一个新字符串
          res.playlist.description = res.playlist.description.replace(
            /(\r\n|\n|\r)/g,
            '<br />'
          )
        }
        this.detail = res.playlist
        this.creator = res.playlist.creator
        let trackIds = res.playlist.trackIds

        // 是否自己的歌单
        if (sessionStorage.getItem('myInfo')) {
          let myId =
            JSON.parse(sessionStorage.getItem('myInfo')).userId ||
            this.$store.getters.getUserInfo.userId
          if (this.creator.userId === myId) {
            this.isPerson = true
          }
        }
        // 数量超过1000，进行分割
        // 想了一下，不用分割的，直接拿全部trackIds 请求一次 song/detail 接口获取所有歌曲的详情
        // let arrLength = 1000
        // let sliceArr = []
        // for (let i = 0; i < trackIds.length; i += arrLength) {
        //   if (i + arrLength >= trackIds.length) {
        //     sliceArr.push(trackIds.slice(i, trackIds.length))
        //   } else {
        //     sliceArr.push(trackIds.slice(i, i + arrLength))
        //   }
        // }
        // this.getSongDetail(sliceArr)
        this.getSongDetail(trackIds)
      }
    },
    // 获取多首歌曲的歌曲详情
    async getSongDetail(arr) {
      this.screenLoading = true
      // let before = arr[0]
      // let after = arr[1]
      // let beforeIds = []
      // let afterIds = []
      // before.forEach(item => beforeIds.push(item.id))
      // beforeIds = beforeIds.join(',')
      // if (after && after.length !== 0) {
      //   after.forEach(item => afterIds.push(item.id))
      //   afterIds = afterIds.join(',')
      //   const beforeRes = await this.$api.getSongDetail(beforeIds)
      //   const afterRes = await this.$api.getSongDetail(afterIds)
      //   const res = beforeRes.songs.concat(afterRes.songs)
      //   this.songs = this._normalizeSongs(res)
      // } else {
      //   const beforeRes = await this.$api.getSongDetail(beforeIds)
      //   const res = beforeRes.songs
      //   this.songs = this._normalizeSongs(res)
      // }
      let ids = []
      arr.forEach(item => ids.push(item.id))
      try {
        const res = await this.$api.getSongDetail(ids.join(','))
        this.songs = this._normalizeSongs(res.songs)
        // 请求失败是不会往下执行的，所以要用try和catch，将遮罩关闭
        this.screenLoading = false
      } catch (e) {
        this.screenLoading = false
      }
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
        if (res.playlists.length === 0) {
          this.emptyRelated = '还没有相关推荐~'
        }
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
        // 收藏者数量为0时
        if (res.subscribers.length === 0) {
          this.emptyText = '还没有人喜欢~'
        }
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
        // 因为所有评论数量可能会有点多，所以有热门评论就直接显示热门评论
        if (res.hotComments.length > 0) {
          this.comments = res.hotComments
        } else {
          this.comments = res.comments
        }
        // 评论数量为0时
        if (this.comments.length === 0) {
          this.emptyComment = '等你来评论~'
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
      if (
        sessionStorage.getItem('cookie') &&
        sessionStorage.getItem('token') &&
        JSON.parse(sessionStorage.getItem('loginStatus'))
      ) {
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
      } else {
        this.$msg('请先登录')
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
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