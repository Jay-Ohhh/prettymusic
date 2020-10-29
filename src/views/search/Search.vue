<template>
  <!-- 搜索页面 -->
  <div class="search-wrap" @click="cancelInputFocus">
    <div class="banner layer">
      <div class="search-inner">
        <div class="search-box flex-row">
          <!-- .stop阻止冒泡到 search-wrap 元素 -->
          <!-- 不用再加@keyup.enter="search(type)"了，因为关键词一变化就会自动搜索 -->
          <input class="input" type="text" v-model="keyword" maxlength="128"
            @click.stop="inputFocus" placeholder="搜索音乐/MV/歌单/歌手">
          <!--不用再加 @click="search(type)"了，因为关键词一变化就会自动搜索 -->
          <i class="iconfont nicesearch-o search-icon"></i>
        </div>
        <div class="list" :class="isKeyword?'drop':''"
          v-if="Object.keys(searchResult).length!==0">
          <div class="item"
            v-if="searchResult.songs && searchResult.songs.length>0 ">
            <div class="title flex-row">
              <i class="iconfont niceyinfu3"></i> 单曲
            </div>
            <ul>
              <li v-for="item of searchResult.songs" :key="item.id"
                @click="search(1,item.name)">
                {{item.name}}
              </li>
            </ul>
          </div>
          <div class="item"
            v-if="searchResult.artists && searchResult.artists.length>0">
            <div class="title flex-row">
              <i class="iconfont niceicon-4"></i>歌手
            </div>
            <ul>
              <li v-for="item of searchResult.artists" :key="item.id"
                @click="search(100,item.name)">
                {{item.name}}
              </li>
            </ul>
          </div>
          <div class="item"
            v-if="searchResult.albums && searchResult.albums.length > 0">
            <div class="title flex-row">
              <i class="iconfont niceRaidobox-selectedRai1"></i> 专辑
            </div>
            <ul>
              <li v-for="item of searchResult.albums" :key="item.id"
                @click="search(10,item.name)">
                {{item.name}}
              </li>
            </ul>
          </div>
          <div class="item"
            v-if="searchResult.playlists && searchResult.playlists.length > 0">
            <div class="title flex-row">
              <i class="iconfont nicebofangliebiao24"
                style="font-size: 20px;"></i>
              歌单
            </div>
            <ul>
              <li v-for="item of searchResult.playlists" :key="item.id"
                @click="search(1000,item.name)">
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="main container">
      <ul class="tab">
        <h2>搜索结果</h2>
        <li :class="type===1?'active':''" @click="changeType(1)">单曲</li>
        <li :class="type===100?'active':''" @click="changeType(100)">歌手</li>
        <li :class="type===10?'active':''" @click="changeType(10)">专辑</li>
        <li :class="type===1014?'active':''" @click="changeType(1014)">视频</li>
        <li :class="type===1000?'active':''" @click="changeType(1000)">歌单</li>
      </ul>
      <!-- v-loading是element loading组件（加载+遮罩层）的指令方式 fullscreen是全屏遮罩修饰符 -->
      <!-- 默认状况下，Loading 遮罩会插入到绑定元素的子节点 -->
      <div class="content" v-loading="screenLoading">
        <sheet-song-list :songs="songs" v-if="type===1">
        </sheet-song-list>
        <singer-list :singers="singers" v-if="type===100"></singer-list>
        <album-list :albums="albums" v-if="type===10"></album-list>
        <mv-list :mvs="videos" v-if="type===1014"></mv-list>
        <song-sheet :sheet-list="sheetList" v-if="type===1000"></song-sheet>
        <pretty-empty empty-text="哎呀，这里什么都没有~" v-if="empty"></pretty-empty>
      </div>
    </div>
  </div>
</template>

<script>
import sheetSongList from '../../components/content/SheetSongList'
import singerList from '../../components/content/singer-list/index'
import albumList from '../../components/content/album-list/index'
import mvList from '../../components/content/mv-list/index'
import songSheet from '../../components/content/song-sheet/index'
import prettyEmpty from '../../components/common/PrettyEmpty'
import { createSong } from '../../utils/untils'
export default {
  name: 'search',
  data() {
    return {
      // 关键词
      keyword: '',
      // 搜索结果对象
      searchResult: {},
      // 请求参数：返回数量
      limit: 30,
      // 请求参数：偏移量
      offset: 0,
      // 标签类型，默认为歌手
      type: 1,
      // 歌曲数组
      songs: [],
      // 歌手数组
      singers: [],
      // 专辑数组
      albums: [],
      // 视频数组
      videos: [],
      // 歌单数组
      sheetList: [],
      // 遮罩并加载
      screenLoading: false,
      // 防抖函数定时器
      timer: null,
      // 输入框聚焦标志
      focus: false,
      // 重复关键词
      repeatKeyword: false,
      // 当前标签有无数据
      empty: false
    }
  },
  components: {
    sheetSongList,
    singerList,
    albumList,
    mvList,
    songSheet,
    prettyEmpty
  },
  computed: {
    // 输入框内的关键词是否有效值
    isKeyword() {
      return this.keyword.split(' ').join('').length > 0 && this.focus
    }
  },
  watch: {
    // 监视关键词变化
    keyword(newVal, oldVal) {
      // 在created时已经改变了keyword的值并发起了请求，所以不用再发请求
      if (oldVal === '') return
      if (newVal.trim() === oldVal.trim()) {
        this.repeatKeyword = true
        return
      } else {
        this.repeatKeyword = false
      }
      // 尾部防抖
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.keyword.split(' ').join('').length === 0) {
        this.searchResult = {}
        return
      }
      this.timer = setTimeout(() => {
        this.searchSuggest()
        this.search(this.type)
      }, 100)
    }
  },
  created() {
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword
      this.search(1)
    }
  },
  deactivated() {
    this.focus = false
  },
  methods: {
    // 输入框聚焦
    inputFocus() {
      this.focus = true
    },
    // 点击input除外的元素，this.focus 为 false，下拉框取消弹出
    cancelInputFocus() {
      this.focus = false
    },
    // 更改搜索类型
    changeType(type) {
      this.type = type
      this.search(type)
    },
    // 搜索建议
    async searchSuggest() {
      // 避免重复关键词
      if (this.repeatKeyword) return
      const res = await this.$api.searchSuggest(this.keyword)
      if (res.code === 200) {
        this.searchResult = res.result
      }
    },
    // 搜索
    async search(type, keyword) {
      // 避免重复点击
      if (type === this.type && this.repeatKeyword) return
      this.type = type
      const params = {
        // 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开
        keywords: keyword || this.keyword,
        limit: this.limit,
        offset: this.offset,
        // type 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        type
      }
      const res = await this.$api.search(params)
      if (res.code === 200) {
        switch (type) {
          case 1: {
            if (res.result && res.result.songs) {
              const list = res.result.songs
              const sliceArr = []
              list.forEach(item => {
                sliceArr.push(item.id)
              })
              await this.getSongDetail(sliceArr)
            }
            this.empty = this.songs.length === 0
            break
          }
          case 100: {
            if (res.result && res.result.artists) {
              this.singers = res.result.artists
            }
            this.empty = this.singers.length === 0
            break
          }
          case 10: {
            if (res.result && res.result.albums) {
              this.albums = res.result.albums
            }
            this.empty = this.albums.length === 0
            break
          }
          case 1014: {
            if (res.result && res.result.videos) {
              this.videos = this._normalizeVideos(res.result.videos)
            }
            this.empty = this.videos.length === 0
            break
          }
          case 1000: {
            if (res.result && res.result.playlists) {
              this.sheetList = res.result.playlists
            }
            this.empty = this.sheetList.length === 0
            break
          }
          default: {
            if (res.result && res.result.songs) {
              const list = res.result.songs
              const sliceArr = []
              list.forEach(item => {
                sliceArr.push(item.id)
              })
              this.getSongDetail(sliceArr)
            }
            this.empty = this.songs.length === 0
            break
          }
        }
      }
    },
    // 获取歌曲详情
    async getSongDetail(idArr) {
      this.screenLoading = true
      let ids = idArr.join(',')
      try {
        const res = await this.$api.getSongDetail(ids)
        this.songs = this._normalizeSongs(res.songs)
        this.screenLoading = false
      } catch (e) {
        this.screenLoading = false
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
    // 处理视频
    _normalizeVideos(list) {
      const arr = []
      list.forEach(item => {
        if (item.id) {
          arr.push({
            id: item.vid,
            nickName: item.creator.nickname,
            name: item.title,
            playCount: item.playTime,
            duration: item.durationms,
            image: item.coverUrl,
            isLive: false
          })
        }
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrap {
  margin-top: -20px;
  .banner {
    position: relative;
    width: 100%;
    height: 250px;
    background: url('../../assets/images/personal.jpg') no-repeat fixed center /
      cover;
    .search-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      transform: translate(-50%, -50%);
      .search-box {
        width: 720px;
        padding-left: 8px;
        border-radius: 2px;
        background-color: #f5f5f5;
        input {
          position: relative;
          // 一定要位于 .list 元素之上
          z-index: 11;
          flex: 1;
          display: inline-block;
          height: 54px;
          line-height: 54px;
          padding-left: 10px;
          margin-right: 24px;
          border: none;
          background-color: #f5f5f5;
        }
        i {
          font-size: 20px;
          padding: 16px;
          cursor: pointer;
        }
      }
      .list {
        // 要隐藏，避免点击不了其他元素
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 18px 0 15px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 10px 30px rgba(65, 67, 70, 0.3);
        border-radius: 4px;
        opacity: 0;
        transition: top 0.3s, opacity 0.3s;
        &.drop {
          display: block;
          top: 110%;
          opacity: 1;
          z-index: 10;
        }
        .item {
          .title {
            height: 30px;
            line-height: 30px;
            padding: 0 18px;
            font-size: 12px;
            color: #909399;
            i {
              margin-right: 5px;
              font-size: 18px;
              font-weight: 700;
              color: #fa2800;
            }
          }
        }
        ul {
          li {
            height: 38px;
            line-height: 38px;
            padding: 0 18px;
            font-weight: 300;
            background-color: #fff;
            cursor: pointer;
            transition: background-color 0.1s;
            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
      }
    }
  }
  .main {
    margin: 0 auto;
    .tab {
      display: flex;
      align-items: baseline;
      padding: 0 30px;
      margin: 40px 0;
      h2 {
        line-height: 40px;
        margin-right: 40px;
        font-size: 22px;
        font-weight: 600;
      }
      li {
        position: relative;
        height: 20px;
        line-height: 20px;
        margin-right: 34px;
        font-weight: 300;
        color: #333;
        cursor: pointer;
        &.active::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 100%;
          height: 6px;
          background-color: #fa2800;
          opacity: 0.7;
        }
      }
    }
  }
}
</style>