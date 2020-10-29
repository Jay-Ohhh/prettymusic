<template>
  <!-- 专辑列表组件 -->
  <ul class="album-list flex-row">
    <li class="wrapper" v-for="item in albums" :key="item.id"
      @click="toDetail(item.id)">
      <div class="cover">
        <el-image :src="item.picUrl+'?param=300y300'" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="count">
          <i class="arrow"></i>
          <span>{{item.subType||item.type}}</span>
        </div>
      </div>
      <div class="info">
        <div class="name ellipsis">{{item.name}}</div>
        <div class="author">{{item.artist.name}}</div>
        <div class="time">{{item.publishTime|formatDate('YYYY-MM-DD')}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    albums: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 点击跳转到专辑详情页面
    toDetail(id) {
      this.$router.push({
        path: '/albumdetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.album-list {
  flex-wrap: wrap;
  padding: 15px 0;
  .wrapper {
    flex: 0 0 14%;
    position: relative;
    padding-right: 10px;
    margin: 0 15px 30px;
    cursor: pointer;
    .cover {
      position: relative;
      width: 100%;
      padding-top: 100%;
      border-radius: 5px;
      background-color: #d9d9d9;
      box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.25);
      .el-image {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
      }
      .count {
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
        .arrow {
          display: inline-block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 0 5px 6px;
          border-color: transparent transparent transparent #fff;
          margin-right: 5px;
        }
      }
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: -5px;
        transform: translateY(-50%);
        z-index: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #222;
        transition: right 0.4s;
      }
      &:hover {
        &:after {
          right: -10px;
        }
      }
    }
    .info {
      margin-top: 15px;
      .name {
        line-height: 18px;
        font-weight: 700;
      }
      .author,
      .time {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>