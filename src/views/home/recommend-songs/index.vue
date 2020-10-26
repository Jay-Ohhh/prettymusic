<template>
  <!-- 首页推荐歌单模块 -->
  <div class="recommend-sheet">
    <h2 class="title">推荐歌单</h2>
    <song-sheet :sheet-list="recSongs"></song-sheet>
  </div>
</template>

<script>
import songSheet from '../../../components/content/song-sheet/index'
export default {
  data() {
    return {
      // 获取推荐歌单的数量
      limit: 24,
      // 推荐歌单数据数组
      recSongs: []
    }
  },
  components: {
    songSheet
  },
  created() {
    this.getRecSongs()
  },
  methods: {
    async getRecSongs() {
      const res = await this.$api.getRecSongs(this.limit)
      this.recSongs = res.result
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-sheet {
  margin-top: 40px;
  .title {
    margin-bottom: 15px;
  }
}
</style>