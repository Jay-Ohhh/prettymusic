<template>
  <!-- 歌手列表页面 -->
  <div class="singer-wrap container">
    <!-- 标签栏 -->
    <div class="filter">
      <ul class="tag">
        <li :class="currentArea === item.value?'active':''"
          v-for="item in areas" :key="item.value"
          @click="chooseType('area',item.value)">
          {{item.label}}
        </li>
      </ul>
      <ul class="tag">
        <li :class="currentType===item.value?'active':''" v-for="item in types"
          :key="item.value" @click="chooseType('type',item.value)">
          {{item.label}}
        </li>
      </ul>
      <ul class="tag tag-letter">
        <li :class="currentLetter===item.value?'active':''"
          v-for="item in letters" :key="item.value"
          @click="chooseType('letter',item.value)">
          {{item.label}}
        </li>
      </ul>
    </div>
    <!-- 触底加载更多 -->
    <load-more @loadmore="loadMore">
      <singer-list :singers="singers"></singer-list>
    </load-more>
    <loading-icon v-if="showLoadIcon" :loading-text="'努力加载中~'"></loading-icon>
  </div>
</template>

<script>
import loadMore from '../../components/common/LoadMore'
import singerList from '../../components/content/singer-list/index'
import loadingIcon from '../../components/common/LoadingIcon'
export default {
  name: 'singer',
  data() {
    return {
      // 当前地区/语种
      currentArea: -1,
      // 地区数组
      areas: [
        { value: -1, label: '全部' },
        { value: 7, label: '华语' },
        { value: 96, label: '欧美' },
        { value: 8, label: '日本' },
        { value: 16, label: '韩国' },
        { value: 0, label: '其他' }
      ],
      // 分类
      currentType: -1,
      // 分类数组
      types: [
        { value: -1, label: '全部' },
        { value: 1, label: '男歌手' },
        { value: 2, label: '女歌手' },
        { value: 3, label: '乐队' }
      ],
      // 当前字母
      currentLetter: -1,
      // 字母A-Z
      letters: [],
      // 请求参数
      params: {
        // 返回数量
        limit: 40,
        // 偏移量
        offset: 0,
        // 类型
        type: -1,
        // 地区
        area: -1,
        // 热门或字母A-Z,'热门'为-1,'其他'为0
        initial: -1
      },
      // 歌手列表
      singers: [],
      // 是否还有更多数据
      hasMore: false,
      // 是否显示加载图标
      showLoadIcon: false
    }
  },
  components: {
    loadMore,
    singerList,
    loadingIcon
  },
  created() {
    this.setLetters()
    this.getSingers()
  },
  methods: {
    // 字母数组
    setLetters() {
      for (let i = 0; i < 26; i++) {
        this.letters.push({
          // fromCharCode 将 Unicode 编码转为一个字符
          // 请求参数传入value小写字母，UI显示label大写字母
          value: String.fromCharCode(97 + i),
          label: String.fromCharCode(65 + i)
        })
      }
      this.letters.unshift({
        value: -1,
        label: '热门'
      })
      this.letters.push({
        value: 0,
        label: '其他'
      })
    },
    // 选择歌手分类
    chooseType(type, val) {
      if (type === 'area') {
        this.currentArea = val
        this.params.area = val
      } else if (type === 'type') {
        this.currentType = val
        this.params.type = val
      } else if (type === 'letter') {
        this.currentLetter = val
        this.params.initial = val
      }
      this.params.offset = 0
      // 清空之前的歌手数据
      this.singers = []
      this.getSingers()
    },
    // 获取歌手列表
    async getSingers() {
      const res = await this.$api.getSingers(this.params)
      if (res.code === 200) {
        this.singers.push(...res.artists)
        this.hasMore = res.more
      }
    },
    // 触底加载更多
    loadMore() {
      if (this.hasMore) {
        this.showLoadIcon = true
        this.params.offset += 40
        this.getSingers()
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
.singer-wrap {
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
    .tag-letter {
      li {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        padding: 0;
        margin-right: 14px;
      }
      li:first-child,
      li:last-child {
        width: auto;
        padding: 0 15px;
        border-radius: 14px;
      }
      li:last-child {
        margin-left: -14px;
      }
      li:nth-child(2) {
        margin-left: 6px;
      }
    }
  }
}
</style>