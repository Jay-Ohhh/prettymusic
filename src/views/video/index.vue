<template>
  <!-- 视频列表页面 -->
  <div class="video-wrap container">
    <div class="filter shadow">
      <!-- 当前分类按钮 -->
      <!-- 因为冒泡，点击标签弹窗本身也会收起标签弹窗 -->
      <div class="title flex-row" @click="openFilter">{{currentCate}}
        <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
        <!-- 标签弹窗 -->
        <transition name="fade">
          <div class="filter-box shadow" v-if="showFilter">
            <ul>
              <li :class="currentCate===item.name?'active':''"
                v-for="item in tags" :key="item.id"
                @click="chooseCate(item.id,item.name)">
                {{item.name}}
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <!-- 标签选项 -->
      <div class="hot-tag flex-row">
        <p>热门分类：</p>
        <ul class="flex-center">
          <li :class="currentCate===item.name?'active':''"
            v-for="item in hotCategories" :key="item.id"
            @click="chooseCate(item.id,item.name)">{{item.name}}
          </li>
        </ul>
      </div>
      <div class="all" :class="currentCate==='全部'?'active':''"
        @click="chooseCate('','全部')">全部
      </div>
    </div>
    <!-- v-loading是element loading组件（加载+遮罩层）的指令方式 -->
    <mv-list :mvs="videos" v-loading="screenLoading"></mv-list>
    <div class="page flex-center" v-if="videos.length!==0">
      <!-- 第一页时禁用 “上一页” 按钮 -->
      <button :disabled="offset === 0" class="btn flex-center trainsition"
        @click="prev">
        上一页
      </button>
      <!-- 没有更多数据时禁用 “下一页” 按钮 -->
      <button :disabled="!hasMore" class="btn flex-center trainsition"
        @click="next">
        下一页
      </button>
    </div>
  </div>
</template>

<script>
import mvList from '../../components/content/mv-list/index'
export default {
  data() {
    return {
      // 当前分类
      currentCate: '全部',
      // 标签/分类选项的id
      tagId: '',
      // 标签数组
      tags: [],
      // 热门标签数组
      hotCategories: [],
      // 视频数组
      videos: [],
      // 请求参数偏移量
      offset: 0,
      // 是否有更多数据,第一页时 “下一页” 按钮不被禁用，默认为true
      hasMore: true,
      // 显示标签弹窗
      showFilter: false,
      // 显示加载遮罩
      screenLoading: false
    }
  },
  components: {
    mvList
  },
  created() {
    this.getVideoCategory()
    this.getVideoTag()
    // 视频详情页面会有一些标签，当点击标签跳转时会带上这个标签
    // 使用params，参数不会显示在url
    // params只能和name使用
    if (this.$route.params.id) {
      this.tagId = this.$route.params.id
      this.currentCate = this.$route.params.name
      this.getVideoOther(this.tagId)
    } else {
      this.getVideoAll()
    }
  },
  methods: {
    // 显示分类弹窗
    openFilter() {
      this.showFilter = !this.showFilter
    },
    // 上一页
    prev() {
      this.offset -= 1
      if (this.tagId) {
        this.getVideoOther(this.tagId)
      } else {
        this.getVideoAll()
      }
    },
    // 下一页
    next() {
      this.offset += 1
      if (this.tagId) {
        this.getVideoOther(this.tagId)
      } else {
        this.getVideoAll()
      }
    },
    // 获取视频分类列表（热门分类）
    async getVideoCategory() {
      const res = await this.$api.getVideoCategory()
      if (res.code === 200) {
        this.hotCategories = res.data
      }
    },
    // 获取视频标签列表（标签弹窗）
    async getVideoTag() {
      const res = await this.$api.getVideoTag()
      if (res.code === 200) {
        this.tags = res.data
      }
    },
    // 获取全部视频列表
    async getVideoAll() {
      this.screenLoading = true
      try {
        const res = await this.$api.getVideoAll(this.offset)
        if (res.code === 200) {
          this.videos = this._normalizeVideos(res.datas)
          this.screenLoading = false
          this.hasMore = res.hasmore ? true : false
        }
      } catch (e) {
        this.screenLoading = false
      }
    },
    // 获取视频标签/分类下的视频
    // id是标签/分类id
    async getVideoOther(id) {
      this.screenLoading = true
      try {
        const res = await this.$api.getVideoOther(id, this.offset)
        if (res.code === 200) {
          this.videos = this._normalizeVideos(res.datas)
          this.screenLoading = false
        }
      } catch (e) {
        this.screenLoading = false
      }
    },
    // 处理视频对象数据
    _normalizeVideos(list) {
      let arr = []
      list.forEach(item => {
        // 视频数据对象
        let res = item.data
        // 直播数据对象
        let liveRes = item.data.liveData
        if (res.vid) {
          arr.push({
            id: res.vid,
            nickName: res.creator.nickname,
            title: res.title,
            playCount: res.playTime,
            duration: res.durationms,
            picUrl: res.coverUrl,
            isLive: false
          })
        } else {
          arr.push({
            id: liveRes.liveRoom.liveRoomNo,
            nickName: liveRes.liveUser.nickName,
            title: liveRes.liveRoom.title,
            playCount: liveRes.liveRoom.popularity,
            duration:
              liveRes.liveRoom.liveStatus == 1 ? '正在直播' : '直播已关闭',
            picUrl: liveRes.liveRoom.coverUrl,
            isLive: true
          })
        }
      })
      return arr
    },
    // 选择分类
    chooseCate(id, name) {
      // 如果是点击的是当前标签/分类，则不用重新发送请求
      if (this.tagId === id) return
      this.offset = 0
      this.hasMore = true
      this.currentCate = name
      if (id) {
        this.tagId = id
        this.getVideoOther(id)
      } else {
        // 点击'全部'时，传入的id是'',判断为false
        this.getVideoAll()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.video-wrap {
  .filter {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding-right: 20px;
    margin-bottom: 20px;
    border-radius: 5px 0 5px 5px;
    .title {
      position: relative;
      height: 100%;
      padding: 0 18px 0 15px;
      margin-right: 15px;
      border-radius: 5px 0 5px 5px;
      background-color: #fa2800;
      color: #fff;
      cursor: pointer;
      & > .iconfont {
        transform: rotate(90deg);
        margin-left: 10px;
        font-size: 18px;
      }
      .filter-box {
        position: absolute;
        top: 50px;
        right: -631px;
        z-index: 100;
        width: 720px;
        height: 400px;
        padding: 15px 10px 0 16px;
        border-radius: 5px;
        color: #000;
        background-color: #fff;
        overflow-y: scroll;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            padding: 8px 18px;
            margin: 0 10px 10px 0;
            border-radius: 16px;
            font-size: 12px;
            color: #161e27;
            background-color: #f7f7f7;
            cursor: pointer;
            transition: all 0.4s;
            &:hover,
            &.active {
              color: #fff;
              background-color: #fa2800;
            }
          }
        }
      }
    }
    .hot-tag {
      flex: 1;
      ul {
        li {
          padding-right: 10px;
          margin: 0 5px;
          cursor: pointer;
          &:hover {
            color: #888;
          }
          &.active {
            color: #fa2800;
          }
        }
      }
    }
    .all {
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 12px;
      color: #161e27;
      background-color: #f7f7f7;
      cursor: pointer;
      transition: all 0.4s;
      &.active {
        color: #fff;
        background-color: #fa2800;
      }
    }
  }
  .page {
    .btn {
      padding: 7px 10px;
      margin: 0 10px;
      border: 0;
      border-radius: 3px;
      background-color: #fa2800;
      color: #fff;
      cursor: pointer;
      &:disabled {
        background-color: #fab6b6;
      }
    }
  }
}
</style>