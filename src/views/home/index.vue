<template>
  <!-- 首页 -->
  <div class="home-wrap container">
    <!-- 轮播图 -->
    <banner></banner>
    <!-- 推荐歌单 -->
    <recommend-songs></recommend-songs>
    <!-- 推荐新音乐 -->
    <recommend-new-music></recommend-new-music>
  </div>
</template>

<script>
import banner from '../../components/common/Banner.vue'
import recommendSongs from './recommend-songs/index'
import recommendNewMusic from './recommend-newmusic/index'
export default {
  components: {
    banner,
    recommendSongs,
    recommendNewMusic
  }
}
</script>

<style>
</style>