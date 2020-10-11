<template>
  <!-- 排行榜页面 -->
  <!-- v-loading是element loading组件（加载+遮罩层）的指令方式 fullscreen是全屏遮罩修饰符 -->
  <!-- 默认状况下，Loading 遮罩会插入到绑定元素的子节点 -->
  <div class="rank-wrap container" v-loading="screenLoading">
    <div class="module">
      <h2 class="title">云音乐特色榜</h2>
      <song-sheet :sheet-list="featureList"></song-sheet>
    </div>
    <div class="module">
      <h2 class="title">全球媒体榜</h2>
      <song-sheet :sheet-list="globalList"></song-sheet>
    </div>
  </div>
</template>

<script>
import songSheet from '../../components/content/song-sheet/index'
export default {
  name: 'rank',
  data() {
    return {
      // 所有榜单
      ranks: [],
      // 云音乐特色榜
      featureList: [],
      // 全球媒体榜
      globalList: [],
      // 加载遮罩
      screenLoading: false
    }
  },
  components: {
    songSheet
  },
  created() {
    this.getRank()
  },
  methods: {
    // 获取排行榜数据
    async getRank() {
      this.screenLoading = true
      try {
        const res = await this.$api.getRank()
        if (res.code === 200) {
          this.ranks = res.list
          this.featureList = res.list.slice(0, 4)
          this.globalList = res.list.slice(4)
        }
        // 请求失败是不会往下执行的，所以要用try和catch，将遮罩关闭
        this.screenLoading = false
      } catch (e) {
        this.screenLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-wrap {
  .module {
    .title {
      width: 100%;
      height: 20px;
      padding-left: 15px;
      margin-bottom: 20px;
      border-left: 3px solid #fa2800;
    }
  }
}
</style>