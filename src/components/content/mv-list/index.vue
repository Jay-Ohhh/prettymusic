<template>
  <!-- 视频列表组件 -->
  <ul class="mv-list flex-row" v-if="mvs.length>0">
    <!-- isLive：是否直播 -->
    <li :class="[{live:item.isLive},flexNum]" v-for="item in mvs"
      :key="item.id">
      <div class="cover" @click="toDetailOrLive(item.id,item.isLive)">
        <!-- 图片 -->
        <el-image :src="item.picUrl" lazy>
          <!-- el-image 加载失败时内容 -->
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="font-size:18px;"></i>
          </div>
        </el-image>
        <!-- 播放数 -->
        <div class="count-wrapper">
          <i class="arrow"></i>
          <span class="count">{{item.playCount | transNum(1)}}</span>
        </div>
        <!-- 播放按钮 -->
        <div class="action">
          <button class="play flex-center">
            <i class="iconfont nicebofang1"></i>
          </button>
        </div>
        <div class="foot flex-between">
          <span>{{item.nickName}}</span>
          <span>{{item.duration | formatTime}}</span>
        </div>
      </div>
      <div class="info">
        <h2 class="title ellipsis">{{item.title}}</h2>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    // 视频数据数组
    mvs: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String
    },
    flexNum: {
      // 'one' Or 'four'
      type: String,
      default: 'four'
    }
  },
  methods: {
    // 跳转到视频详情或直播页面
    toDetailOrLive(id, isLive) {
      if (isLive) {
        // 新窗口打开
        window.open(`https://iplay.163.com/live?id=${id}`, '_blank')
      } else {
        // 先停止播放音乐
        this.$store.dispatch('stopPlay')
        if (typeof id === 'number') {
          // MV的id是数字
          this.$router.push({
            path: '/mvdetail',
            query: { id }
          })
        } else {
          // 视频的id是字符串，类似于"EEC51C6B714CDA2C32F4578A17244ABA"
          this.$router.push({
            path: '/videodetail',
            query: { id }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mv-list {
  flex-wrap: wrap;
  margin: 0 -15px;
  padding: 15px 0;
  li {
    flex: 0 0 25%;
    max-width: 25%;
    padding: 0 15px 30px;
    &.one {
      flex: 1;
      max-width: 100%;
    }
    .cover {
      // 图片未加载完成占位
      position: relative;
      padding-top: 56%;
      border-radius: 5px;
      cursor: pointer;
      .el-image {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        ::v-deep img {
          transition: transform 0.3s;
        }
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
          rgba(0, 0, 0, 0.7),
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
      .action {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s;
        .play {
          width: 32px;
          height: 32px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          color: #fff;
          font-size: 12px;
          background-color: #fa2800;
          cursor: pointer;
          i {
            position: relative;
            left: 1px;
          }
        }
      }
      .foot {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 35px;
        padding: 5px 15px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        color: #f3f3f3;
        font-weight: 500;
        background-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.6),
          transparent
        );
      }
      &:hover {
        .el-image {
          ::v-deep img {
            transform: scale(1.1);
          }
        }
        .action {
          opacity: 1;
        }
      }
    }
    .info {
      margin-top: 12px;
      color: #4a4a4a;
      .title {
        line-height: 1.3;
        font-size: 15px;
        font-weight: 500;
      }
    }
    &.live {
      .cover {
        .foot {
          background-image: linear-gradient(
            to top,
            rgba(250, 40, 0, 0.75),
            transparent
          );
        }
      }
    }
  }
}
</style>