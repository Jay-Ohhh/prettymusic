<template>
  <!-- 歌手列表 -->
  <ul class="singer-list clearfix">
    <li class="item" v-for="item in singers" :key="item.id"
      @click="toSinger(item)">
      <div class="img-wrapper shadow">
        <el-image :src="item.img1v1Url" lazy>
          <!-- el-image 加载时占位 -->
          <div slot="placeholder" class="image-slot flex-center">
            <!-- 加载中<span class="dot">...</span> -->
          </div>
          <!-- el-image 加载失败时内容 -->
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="font-size:18px;"></i>
          </div>
        </el-image>
      </div>
      <div class="info">
        <span class="singer-name ellipsis">{{item.name}}</span>
        <span class="sing-count">单曲数{{item.musicSize | transNum(1)}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    singers: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    toSinger(item) {
      this.$router.push({
        path: 'singerdetail',
        query: {
          id: item.id
        }
      })
      this.$store.commit('setSinger', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-list {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 10%;
    padding: 0 15px 15px;
    cursor: pointer;
    .img-wrapper {
      position: relative;
      padding-top: 100%;
      border-radius: 50%;
      overflow: hidden;
      .el-image {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .info {
      margin-top: 10px;
      text-align: center;
      .singer-name {
        display: block;
        font-weight: 700;
      }
      .sing-count {
        display: block;
        margin-top: 5px;
        color: #fa2800;
      }
    }
  }
}
</style>