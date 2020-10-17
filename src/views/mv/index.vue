<template>
  <!-- mv页面 -->
  <div class="mv-wrap container">
    <!-- 标签栏 -->
    <div class="filter">
      <!-- 地区 -->
      <ul class="tag">
        <li :class="currentArea===item?'active':''" v-for="item in areas"
          :key="item" @click="chooseType('area',item)">
          {{item}}
        </li>
      </ul>
      <!-- 官方版 原生 现场版 ...  -->
      <ul class="tag">
        <li :class="currentType===item?'active':''" v-for="item in types"
          :key="item" @click="chooseType('type',item)">
          {{item}}
        </li>
      </ul>
      <!-- 最热 最新 -->
      <ul class="tag">
        <li :class="currentOrder===item?'active':''" v-for="item in orders"
          :key="item" @click="chooseType('order',item)">
          {{item}}
        </li>
      </ul>
      <load-more @loadmore="loadMore">
        <mv-list :mvs="mvs"></mv-list>
      </load-more>
      <loading-icon v-if="showLoadIcon" :loading-text="'努力加载中~'"></loading-icon>
    </div>
  </div>
</template>

<script>
import loadMore from '../../components/common/LoadMore'
import loadingIcon from '../../components/common/LoadingIcon'
import mvList from '../../components/content/mv-list/index'
export default {
  name: 'mv',
  data() {
    return {
      // 当前地区
      currentArea: '全部',
      // 地区数组
      areas: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      // 当前类型
      currentType: '全部',
      // 类型数组
      types: ['全部', '官方版', '内地', '现场版', '网易出品'],
      // 当前排序
      currentOrder: '上升最快',
      // 排序数组
      orders: ['上升最快', '最热', '最新'],
      // 请求参数对象
      params: {
        // 地区
        area: '全部',
        // 分类
        type: '全部',
        // 排序
        order: '上升最快',
        // 返回数量
        limit: 16,
        // 偏移量
        offset: 0
      },
      // mv数据数组
      mvs: [],
      // 是否还有更多数据
      hasMore: false,
      // 是否显示加载图标
      showLoadIcon: false
    }
  },
  components: {
    loadMore,
    loadingIcon,
    mvList
  },
  created() {
    this.getMvAll()
  },
  methods: {
    // 选择分类
    chooseType(type, val) {
      if (type === 'area') {
        this.params.area = this.currentArea = val
      } else if (type === 'type') {
        this.params.type = this.currentType = val
      } else if (type === 'order') {
        this.params.order = this.currentOrder = val
      }
      this.params.offset = 0
      this.mvs = []
      this.getMvAll()
    },
    // 获取全部mv
    async getMvAll() {
      const res = await this.$api.getMvAll(this.params)
      if (res.code === 200) {
        this.mvs.push(...this._normalizeVideos(res.data))
        this.hasMore = res.hasMore
      }
    },
    // 处理mv对象数据
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
            picUrl: item.cover
          })
        }
      })
      return arr
    },
    // 触底加载更多
    loadMore() {
      if (this.hasMore) {
        this.showLoadIcon = true
        this.params.offset += this.params.limit
        this.getMvAll()
          .then(res => {
            this.showLoadIcon = false
          })
          .catch(e => {
            this.showLoadIcon = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mv-wrap {
  margin-top: 10px;
  .filter {
    .tag {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 15px;
      li {
        height: 28px;
        line-height: 28px;
        padding: 0 15px;
        margin-right: 14px;
        text-align: center;
        border-radius: 14px;
        font-size: 13px;
        color: #333;
        cursor: pointer;
        &:hover {
          color: #fa2800;
          transition: all 0.4s;
        }
        &.active {
          background-color: #fa2800;
          color: #fff;
          font-weight: 700;
        }
      }
    }
  }
}
</style>