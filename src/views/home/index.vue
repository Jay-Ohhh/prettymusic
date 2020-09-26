<template>
  <!-- 首页 -->
  <div class="home-wrap container">
    <!-- 轮播图 -->
    <banner></banner>
    <!-- 推荐歌单 -->
    <recommend-songs></recommend-songs>
    <!-- 推荐新音乐 -->
    <recommend-new-music></recommend-new-music>
    <!-- 热门歌手 -->
    <hot-singer></hot-singer>
  </div>
</template>

<script>
import banner from '../../components/common/Banner.vue'
import recommendSongs from './recommend-songs/index'
import recommendNewMusic from './recommend-newmusic/index'
import hotSinger from './hot-singer/index'
export default {
  name: 'home',
  components: {
    banner,
    recommendSongs,
    recommendNewMusic,
    hotSinger
  }
}
</script>

<style>
</style>