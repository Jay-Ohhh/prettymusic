<template>
  <!-- 搜索框 -->
  <div class="search-wrap" :class="openSearch?'open':'close'">
    <div class="overlay" @click="closeSearchPop"></div>
    <div class="search-body">
      <div class="search-content">
        <!-- 上面部分 -->
        <div class="search-popup-cover">
          <!-- 背景效果 -->
          <div class="bg-effect">
            <span class="layer"></span>
          </div>
          <!-- 输入框 -->
          <div class="search-form">
            <input class="search-input" type="text" v-model="keyword"
              ref="input" placeholder="请输入搜索关键词" @keyup.enter="search">
            <i class="iconfont nicesearch-o" @click="search"></i>
          </div>
        </div>
        <!-- 历史搜索 -->
        <div class="search-hot" v-show="getSearchHistory.length>0">
          <div class="title flex-row">
            <i class="iconfont nicelishi"></i>
            <span class="title-text">历史搜索</span>
            <span class="clear-text" @click="clearSearch">清空</span>
          </div>
          <ul class="tags">
            <li v-for="item in getSearchHistory" :key="item">
              <a class="btn flex-row" @click="tag(item)">{{item}}
                <!-- stop阻止冒泡到a标签的点击事件 -->
                <i class="close-dark" @click.stop="deleteItem(item)"></i></a>
            </li>
          </ul>
        </div>
        <!-- 热门搜索 -->
        <div class="search-hot">
          <div class="title flex-row">
            <i class="iconfont niceremensousuo"></i>
            <span>热门搜索</span>
          </div>
          <ul class="tags" v-if="hots.length>0">
            <li v-for="item in hots" :key="item.first">
              <a class="btn" @click="tag(item.first)">{{item.first}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-close flex-center" @click="closeSearchPop">
        <span class="close-light"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      keyword: '',
      hots: [],
      historys: []
    }
  },
  props: {
    openSearch: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['getSearchHistory'])
  },
  methods: {
    ...mapActions(['saveSearchKey', 'deleteSearchKey', 'clearSearchHistory']),
    // 关闭搜索框
    closeSearchPop() {
      this.$emit('update:openSearch', false)
    },
    // 搜索
    search() {
      if (this.keyword.split(' ').join('').length !== 0) {
        // 关闭输入框
        this.closeSearchPop()
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.keyword
          }
        })
        // 保存关键词
        this.saveSearchKey(this.keyword)
      }
    },
    // 点击标签搜索
    tag(keyword) {
      this.saveSearchKey(keyword)
      this.closeSearchPop()
      this.$router.push({
        path: 'search',
        query: {
          keyword
        }
      })
    },
    // 删除单个搜索历史关键词
    deleteItem(item) {
      this.deleteSearchKey(item)
    },
    // 清空搜索历史
    clearSearch() {
      this.clearSearchHistory()
    },
    // 获取热搜列表
    async getSearchHot() {
      const res = await this.$api.getSearchHot()
      if (res.code === 200) {
        this.hots = res.result.hots
      }
    }
  },
  created() {
    this.getSearchHot()
  },
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<style lang="scss" scoped>
.search-wrap {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(120, 129, 147, 0.22);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: auto;
  }
  .search-body {
    position: relative;
    opacity: 0;
    width: 100%;
    max-width: 790px;
    pointer-events: auto;
    .search-content {
      position: relative;
      width: 100%;
      border-radius: 4px;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 10px 50px -5px rgba(6, 39, 67, 0.12);
      .search-popup-cover {
        position: relative;
        padding: 20px;
        overflow: hidden;
        .bg-effect {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          filter: blur(8px);
          transform: scale(1.05);
          background: url('../../assets/images/personal.jpg') no-repeat center
            center / cover;
          .layer {
            position: absolute;
            top: 0;
            opacity: 1;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            transition: opacity 0.3 ease-in-out;
          }
        }
        .search-form {
          position: relative;
          padding: 60px 0;
          .search-input {
            display: block;
            width: 100%;
            padding: 8px 5px;
            text-align: center;
            color: #fff;
            border-radius: 5px;
            border-color: transparent;
            background-color: rgba(255, 255, 255, 0.03);
            background-clip: padding-box;
            transition: all 0.3s;
            transition: border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
            font-size: 14px;
            line-height: 1.5;
            &:hover,
            &:focus {
              background-color: rgba(255, 255, 255, 0.04);
            }
            &::placeholder {
              color: #fff;
            }
          }
          .nicesearch-o {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            padding-left: 10px;
            border-left: 1px solid #888;
            color: #aaa;
            font-size: 18px;
            cursor: pointer;
          }
        }
      }
      .search-hot {
        padding: 21px 42px;
        .title {
          margin-bottom: 15px;
          .iconfont {
            color: #fa2800;
            font-size: 20px;
            margin-right: 10px;
          }
          .title-text {
            font-size: 15px;
            flex: 1;
          }
          .clear-text {
            position: relative;
            top: -1px;
            color: #fa2800;
            cursor: pointer;
          }
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          width: 100%;
          li {
            cursor: pointer;
            .btn {
              display: flex;
              padding: 5px 10px;
              margin-bottom: 5px;
              margin-right: 8px;
              line-height: 1.5;
              border-radius: 5px;
              color: #6d7685;
              font-size: 14px;
              text-align: center;
              vertical-align: middle;
              user-select: none;
              background-color: #f4f4f5;
              .close-dark {
                display: inline-block;
                width: 14px;
                height: 14px;
                margin-left: 8px;
                background: url('../../assets/images/close-dark.svg') no-repeat
                  center center/contain;
                vertical-align: middle;
                opacity: 0.7;
              }
              &:hover {
                color: #161e27;
                .close-dark {
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
    .btn-close {
      position: absolute;
      bottom: -50px;
      left: 0;
      width: 100%;
      z-index: 99;
      cursor: pointer;
      text-align: center;
      .close-light {
        display: inline-block;
        width: 28px;
        height: 28px;
        background: url('../../assets/images/close.svg') no-repeat center center /
          contain;
        vertical-align: center;
      }
    }
  }

  &.open {
    z-index: 1000;
    .overlay {
      opacity: 1;
      backdrop-filter: blur(10px);
    }
    .search-body {
      animation: tips-open 0.3s forwards;
    }
  }
  &.close {
    .search-body {
      animation: tips-close 0.3s forwards;
    }
  }
}
@keyframes tips-open {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes tips-close {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(50px);
  }
}
</style>