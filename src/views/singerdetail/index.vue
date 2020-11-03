<template>
  <!-- 歌手详情页面 -->
  <div class="singer-detail">
    <div class="singer-info">
      <div class="top">
        <!-- 半黑透明遮罩 -->
        <div class="top-mask">
          <div class="singer-box flex-column flex-center">
            <div class="avatar transition">
              <img :src="detail.img1v1Url+'?param=200y200'" alt="">
              <div class="level flex-center" v-show="level">
                <i :class="['iconfont','icon-level',level]"></i>
              </div>
            </div>
            <p class="nickname">
              {{detail.name}}
              <!-- 性别 -->
              <i class="iconfont" :class="gender"></i>
            </p>
            <div class="follow flex-center" v-if="!followed"
              @click="followSinger">
              <i class="iconfont niceIcon_add"></i>
              关注TA
            </div>
            <div class="follow flex-center" v-else-if="followed"
              @click="followSinger">
              已关注
            </div>
            <div class="empty" v-else></div>
            <div class="desc ellipsis-two" v-html="detail.briefDesc"></div>
            <ul class="info flex-center">
              <li>
                <p class="num">{{detail.musicSize}}</p>
                <p class="text">单曲数</p>
              </li>
              <li>
                <p class="num">{{detail.albumSize}}</p>
                <p class="text">专辑数</p>
              </li>
              <li>
                <p class="num">{{detail.mvSize}}</p>
                <p class="text">MV数</p>
              </li>
              <li v-show="detail.followeds">
                <p class="num">{{detail.followeds | transNum(1)}}</p>
                <p class="text">粉丝</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 两侧边的白色三角 -->
        <div class="bottom-trangle"></div>
      </div>
      <div class="bottom container">
        <ul class="nav flex-center">
          <li :class="active===item.index?'active':''" v-for="item in navList"
            :key="item.index" @click="tabItem(item.index)">{{item.name}}</li>
        </ul>
        <div class="content">
          <!-- 作品 -->
          <div class="song-box" v-if="active===1">
            <song-sheet-list :songs="songs" :is-person="isPerson"
              v-if="songs.length>0"></song-sheet-list>
          </div>
          <!-- 专辑 -->
          <div class="album" v-if="active===2">
            <album-list :albums="albums" v-if="albums.length>0"></album-list>
            <pretty-empty v-else :emptyText="emptyText"></pretty-empty>
          </div>
          <!-- mv -->
          <div class="mv-box" v-if="active===3">
            <mv-list :mvs="mvs" v-if="mvs.length>0"></mv-list>
            <pretty-empty v-else :emptyText="emptyText"></pretty-empty>
          </div>
          <!-- 歌手详情 -->
          <div class="info-box" v-if="active===4">
            <h2 class="title">{{detail.name}}简介</h2>
            <div v-if="Object.keys(singerDesc).length!==0"></div>
            <div class="profile" v-html="singerDesc.briefDesc"></div>
            <div class="introduction">
              <div class="item" v-for="item in singerDesc.introduction"
                :key="item.ti">
                <h3 class="sub-title">{{item.ti}}</h3>
                <p v-html="item.txt"></p>
              </div>
            </div>
            <pretty-empty :emptyText="emptyText"></pretty-empty>
          </div>
          <!-- 相似歌手 -->
          <div class="simi-box" v-else-if="active===5">
            <singer-list v-if="singers.length>0" :singers="singers">
            </singer-list>
            <pretty-empty v-else :emptyText="emptyText"></pretty-empty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songSheetList from '../../components/content/SheetSongList'
import albumList from '../../components/content/album-list/index'
import mvList from '../../components/content/mv-list'
import singerList from '../../components/content/singer-list/index'
import prettyEmpty from '../../components/common/PrettyEmpty'
import { createSong } from '../../utils/untils'
export default {
  name: 'singerDetail',
  data() {
    return {
      // 歌手基本信息
      singerDetail: {},
      // 歌手用户信息
      userDetail: {
        level: '',
        followeds: '',
        gender: ''
      },
      // 歌手简介
      singerDesc: {},
      // 热门单曲
      songs: [],
      // 专辑数组
      albums: [],
      // 相似歌手
      singers: [],
      // mv
      mvs: [],
      // 歌手id
      singerId: '',
      // 模块
      navList: [
        { name: '作品', index: 1 },
        { name: '专辑', index: 2 },
        { name: 'MV', index: 3 },
        { name: '歌手详情', index: 4 },
        { name: '相似歌手', index: 5 }
      ],
      // 当前显示的模块
      active: 1,
      // 分页显示条数
      limit: 20,
      // 分页偏移量
      offset: 0,
      // 传给song-sheet-list组件，不显示收藏按钮
      isPerson: false,
      // 是否已关注该用户
      followed: false,
      // 没有数据时显示的文本
      emptyText: '哎呀，这里什么都没有~'
    }
  },
  components: {
    songSheetList,
    albumList,
    mvList,
    singerList,
    prettyEmpty
  },
  computed: {
    // 合并歌手详情对象
    detail() {
      return { ...this.singerDetail, ...this.userDetail }
    },
    // 设置歌手性别
    gender() {
      if (this.detail.gender > 0) {
        // 1是男，2是女，其它是未知
        return this.detail.gender === 1
          ? 'niceCRM_icon_nanxing man'
          : 'niceCRM_icon_nvxing woman'
      } else {
        return ''
      }
    },
    // 设置歌手等级,最低等级为1级
    level() {
      if (this.detail.level > 0) {
        return 'nicelevel-' + this.detail.level
      } else {
        return ''
      }
    },
    // 我的ID
    myId() {
      if (sessionStorage.getItem('myInfo') || this.getUserInfo.userId) {
        return (
          JSON.parse(sessionStorage.getItem('myInfo')).userId + '' ||
          this.getUserInfo.userId
        )
      }
      return ''
    }
  },
  created() {
    if (this.$route.query.id) {
      this.singerId = this.$route.query.id
      this._initailize(this.$route.query.id)
    }
  },
  methods: {
    // 点击标签切换模块
    tabItem(index) {
      this.active = index
    },
    // 获取歌手部分信息和热门歌曲
    async getArtists(id) {
      const res = await this.$api.getArtists(id)
      if (res.code === 200) {
        this.singerDetail = res.artist
        // 要传入的ID不是路由url的ID，而是下面这个ID
        // 有些歌手是没有创建网易云用户的，所以是没有accountId，获取不到用户信息
        if (res.artist.accountId) this.getUserDetail(res.artist.accountId)
        this.followed = res.artist.followed
      }
      // 歌手单曲中的热门歌曲
      this.songs = this._normalizeSongs(res.hotSongs)
    },
    // 获取(歌手)用户信息
    async getUserDetail(id) {
      const res = await this.$api.getUserDetail(id)
      if (res.code === 200) {
        this.userDetail.level = res.level
        this.userDetail.followeds = res.profile.followeds
        this.userDetail.gender = res.profile.gender
      }
    },
    // 获取歌手专辑
    async getArtistAlbum(id) {
      const params = {
        id,
        limit: this.limit,
        offset: this.offset
      }
      const res = await this.$api.getArtistAlbum(params)
      if (res.code === 200) {
        this.albums = res.hotAlbums
      }
    },
    // 获取歌手MV
    async getArtistMv(id) {
      const res = await this.$api.getArtistMv(id)
      if (res.code === 200) {
        this.mvs = this._normalizeVideos(res.mvs)
      }
    },
    // 获取歌手简介
    async getArtistDesc(id) {
      const res = await this.$api.getArtistDesc(id)
      if (res.code === 200) {
        if (res.introduction.length > 0) {
          res.introduction.forEach(item => {
            // ()标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用。
            // | 是 "或"，g是全局匹配
            // 替换掉换行符为br标签
            // replace方法返回一个新字符串
            item.txt = item.txt.replace(/(\r\n|\n|\r)/g, '</ br>')
          })
          this.singerDesc = res
        }
      }
    },
    // 获取相似歌手
    async getArtistSimi(id) {
      const res = await this.$api.getArtistSimi(id)
      if (res.code === 200) {
        this.singers = res.artists
      }
    },
    // 处理歌曲
    _normalizeSongs(list) {
      const arr = []
      list.forEach(item => {
        arr.push(createSong(item))
      })
      return arr
    },
    // 处理视频
    _normalizeVideos(list) {
      const arr = []
      list.forEach(item => {
        if (item.id) {
          arr.push({
            id: item.id,
            nickName: item.artistName,
            title: item.name,
            playCount: item.playCount,
            duration: item.duration,
            picUrl: item.imgurl16v9
          })
        }
      })
      return arr
    },
    // 收藏/取消收藏用户
    // t : 1为收藏,其他为取消收藏
    async followSinger() {
      // 判断有没有登录
      if (sessionStorage.getItem('cookie') && sessionStorage.getItem('token')) {
        if (this.followed) {
          this.$confirm('确认取消收藏歌手', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(async () => {
            const res1 = await this.$api.followSinger(this.singerId, 0)
            if (res1.code === 200) {
              // 不必再发送请求刷新this.followed，手动修改即可
              this.followed = false
            }
          })
        } else {
          const res1 = await this.$api.followSinger(this.singerId, 1)
          if (res1.code === 200) {
            // 不必再发送请求刷新this.followed，手动修改即可
            this.followed = true
          }
        }
      } else {
        this.$msg('请先登录')
        this.$router.push('/login')
      }
    },
    // 初始化
    _initailize(id) {
      this.getArtists(id)
      this.getArtistAlbum(id)
      this.getArtistMv(id)
      this.getArtistDesc(id)
      this.getArtistSimi(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  margin-top: -20px;
  .singer-info {
    .top {
      position: relative;
      width: 100%;
      height: 580px;
      background: url('../../assets/images/top-bg.jpg') no-repeat center / cover;
      .top-mask {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        .singer-box {
          position: relative;
          height: 100%;
          margin: 0 auto;
          padding-top: 10px;
          text-align: center;
          z-index: 2;
          .avatar {
            position: relative;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            transition: box-shadow 0.3s;
            overflow: hidden;
            .level {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 25px;
              background-color: rgba(255, 255, 255, 0.8);
              .icon-level {
                margin-left: 8px;
                font-size: 25px;
                color: #fa2800;
              }
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: #fff;
              border: 3px solid rgba(255, 255, 255, 1);
            }
            &:hover {
              box-shadow: 0 5px 20px rgba(255, 255, 255, 0.8);
            }
          }
          .nickname {
            line-height: 24px;
            margin-top: 20px;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            i {
              font-size: 20px;
              &.man {
                color: #1f91f2;
              }
              &.woman {
                color: #fc7265;
              }
            }
          }
          .follow {
            width: 96px;
            height: 36px;
            padding: 0;
            margin: 24px 0 30px;
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 18px;
            font-size: 12px;
            color: #fff;
            cursor: pointer;
            transition: border 0.2s, background-color 0.2s;
            &:hover {
              border: 1px solid #fff;
              background-color: rgba(255, 255, 255, 0.1);
            }
            i {
              margin-right: 5px;
            }
          }
          .desc {
            width: 740px;
            // 2行显示
            height: 48px;
            line-height: 24px;
            margin: 0 auto 24px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
          }
          .info {
            width: 100%;
            margin: 0 auto;
            li {
              margin: 0 50px;
              text-align: center;
              .num {
                line-height: 24px;
                margin-bottom: 8px;
                font-size: 24px;
                color: #fff;
              }
              .text {
                line-height: 14px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }
      }
      .bottom-trangle {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 137px;
        background: url('../../assets/images/arrow-lr.png') no-repeat center;
      }
    }
    .bottom {
      .nav {
        margin: 30px 0;
        li {
          margin: 0 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          &.active {
            color: #fa2800;
          }
        }
      }
      .content {
        background-color: #fff;
        .info-box {
          padding: 15px;
          .title {
            position: relative;
            margin-bottom: 30px;
            text-align: center;
            &::after {
              content: '';
              position: absolute;
              left: 50%;
              margin-left: -20px;
              bottom: -10px;
              width: 40px;
              height: 2px;
              background-color: #fa2800;
            }
          }
          .profile {
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 1.7;
            text-align: center;
          }
          .introduction {
            .item {
              margin-bottom: 15px;
              .sub-title {
                margin-bottom: 10px;
              }
              p {
                line-height: 1.7;
              }
            }
          }
        }
        .simi-box {
          padding: 15px 15px;
        }
      }
    }
  }
}
</style>