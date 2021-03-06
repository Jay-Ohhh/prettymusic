<template>
  <!-- 歌单表格 -->
  <div class="song-sheet">
    <div class="list-item" :class="numClass" v-for="item in sheetList"
      :key="item.id" @click="toDetail(item)">
      <a>
        <div class="img-wrapper">
          <!-- 接口文档：图片加上 ?param=宽y高 可控制图片尺寸 -->
          <el-image :src="item.picUrl || item.coverImgUrl + '?param=300y300'"
            lazy>
            <!-- el-image 加载失败时内容 -->
            <div slot="error" class="image-slot ">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <span class="list-name ellipsis-two">{{item.name}}</span>
        <!-- 播放数 -->
        <div class="count-wrapper">
          <i class="arrow"></i>
          <span class="count">{{item.playCount | transNum(1)}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 歌单列表
    sheetList: {
      type: Array,
      default() {
        return []
      }
    },
    // 用来控制CSS样式每行占多少个歌单，目前只有8和2
    num: {
      type: Number,
      default: 8
    }
  },
  computed: {
    // 用来控制CSS样式每行占多少个歌单的CSS类名，num等于8时默认样式就是显示8个
    numClass() {
      return this.num === 2 ? 'two' : ''
    }
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        path: 'playlistdetail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.song-sheet {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -15px;
  .list-item {
    position: relative;
    // 每行占8个
    flex: 0 1 12.5%;
    flex-grow: 0;
    min-width: 88px;
    padding: 0 15px 20px;
    cursor: pointer;
    &.two {
      // 每行占2个
      flex: 0 1 50%;
    }
    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      .img-wrapper {
        position: relative;
        margin-bottom: 8px;
        padding-top: 100%;
        &:before,
        &:after {
          content: '';
          position: absolute;
          top: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          background-color: #d9d9d9;
          transition: all 0.4s;
        }
        &:before {
          right: -3px;
          transform: scale(0.85);
          transform-origin: 100% 50%;
          border-radius: 2px;
        }
        &:after {
          right: -6px;
          transform: scale(0.73);
          transform-origin: 100% 50%;
          border-radius: 3px;
          opacity: 0.6;
        }
        .el-image {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          border-radius: 5px;
        }
      }

      .list-name {
        font-size: 0.8vw;
        font-weight: 550;
        color: #333;
      }
      .count-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        padding: 3px 5px 5px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: #f3f3f3;
        font-weight: 500;
        text-align: right;
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.5),
          transparent
        );
        i {
          display: inline-block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 0 5px 6px;
          border-color: transparent transparent transparent #fff;
          margin-right: 5px;
        }
      }
    }
    &:hover {
      .img-wrapper::before,
      .img-wrapper::after {
        background: rgba(250, 40, 0, 0.2);
      }
      .img-wrapper::before {
        border: 1px solid #ccc;
        right: -6px;
      }
      .img-wrapper::after {
        border: 1px solid #ccc;
        right: -10px;
      }
    }
  }
}
</style>