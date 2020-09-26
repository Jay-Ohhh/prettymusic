<template>
  <!-- 推荐歌手模块 -->
  <div class="recommend-singer">
    <h2 class="title">热门歌手</h2>
    <singer-list :singers="singers"></singer-list>
  </div>
</template>

<script>
import singerList from '../../../components/content/singer-list/index'
export default {
  data() {
    return {
      singers: []
    }
  },
  components: {
    singerList
  },
  created() {
    this.getHotSinger()
  },
  methods: {
    // 获取热门歌手
    async getHotSinger() {
      const res = await this.$api.getHotSinger()
      if (res.code === 200) this.singers = res.artists
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-singer {
  margin-top: 30px;
  .title {
    margin-bottom: 15px;
  }
}
</style>