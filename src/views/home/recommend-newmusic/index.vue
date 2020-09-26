<template>
  <!-- 首页推荐新音乐模块 -->
  <div class="recommend-newmusic">
    <h2 class="title">推荐新音乐</h2>
    <!-- 歌单列表 -->
    <song-list :song-list="newSongs"></song-list>
  </div>
</template>

<script>
import songList from '../../../components/content/song-list/index'
import { createSong } from '../../../utils/untils'
export default {
  data() {
    return {
      newSongs: []
    }
  },
  components: {
    songList
  },
  created() {
    this.getNewSongs()
  },
  methods: {
    // 获取最新音乐
    async getNewSongs() {
      const res = await this.$api.getNewSongs()
      let idList = res.result.map(v => {
        if (v.id) {
          return v.id
        }
      })
      this.getSongDetail(idList)
    },
    // 获取歌曲详情
    async getSongDetail(ids) {
      // 接口要求多个id需要用逗号隔开
      let idList = ids.join(',')
      const res = await this.$api.getSongDetail(idList)
      // 对数据进行整理重构
      this.newSongs = res.songs.map(item => createSong(item))
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-newmusic {
  margin-top: 30px;
  .title {
    margin-bottom: 15px;
  }
}
</style>