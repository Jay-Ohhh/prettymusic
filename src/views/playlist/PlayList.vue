<template>
  <!-- 歌单列表页面 -->
  <div class="playlist-wrap container">
    <!-- 顶部标签栏 -->
    <div class="filter shadow">
      <!-- 当前分类按钮 -->
      <!-- 因为冒泡，点击分类弹窗本身也会收起分类弹窗 -->
      <div class="title flex-center" @click="openFilter">
        {{currentCate}}
        <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
        <!-- 分类弹窗 -->
        <transition name="fade">
          <div class="filter-box shadow" v-if="showFilter">
            <div class="item" v-for="(item,index) in cateList" :key="index">
              <h2>
                <i class="iconfont" :class="item.icon"></i>{{item.type}}
              </h2>
              <ul>
                <li :class="currentCate === sub.name?'active':''"
                  v-for="sub in item.list" :key="sub.name"
                  @click="chooseCate(sub.name)">{{sub.name}}</li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <div class="hot-tag flex-row">
        <p>热门标签：</p>
        <ul class="flex-center">
          <li :class="currentCate===item.name?'active':''"
            v-for="item in hotCategories" :key="item.id"
            @click="chooseCate(item.name)">{{item.name}}</li>
          <li class="line"></li>
          <li :class="currentCate==='全部'?'active':''" @click="chooseCate('全部')">
            全部</li>
        </ul>
      </div>
      <div class="type">
        <div class="item" :class="sortType==='hot'?'active':''"
          @click="chooseType('hot')">热门</div>
        <div class="item" :class="sortType==='new'?'active':''"
          @click="chooseType('new')">最新</div>
      </div>
    </div>
    <!-- v-loading是element loading组件（加载+遮罩层）的指令方式 fullscreen是全屏遮罩修饰符 -->
    <song-sheet :sheet-list="sheetList" v-loading="screenLoading">
    </song-sheet>
    <div class="page-wrap">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[40, 48, 56, 64]" :page-size="40"
        layout="total, sizes, prev, pager, next, jumper" :total="sheetTotal"
        background hide-on-single-page>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import songSheet from '../../components/content/song-sheet/index'
export default {
  data() {
    return {
      // 当前第几页
      currentPage: 1,
      // 歌单总数
      sheetTotal: 0,
      // 歌单分类的大类:'语种' '风格' '场景' '情感' '主题'
      categories: {},
      // 热门分类
      hotCategories: [],
      // 分类列表
      cateList: [],
      // 歌单数组
      sheetList: [],
      // 显示分类弹窗
      showFilter: false,
      // 一页显示歌单的个数，也是分页接口的参数
      limit: 40,
      // 分页偏移量
      offset: 0,
      // 当前分类标签
      currentCate: '全部',
      // 类型:'hot'或'new'
      sortType: 'hot',
      // 控制全屏遮罩加载
      screenLoading: false,
      // 类型列表
      typeList: [
        { key: 0, value: '语种', icon: 'niceyuyan' },
        { key: 1, value: '风格', icon: 'nicefengge' },
        { key: 2, value: '场景', icon: 'nicekafeidengdai' },
        { key: 3, value: '情感', icon: 'niceqingganqingshu' },
        { key: 4, value: '主题', icon: 'nicepifugexinghuazhuti-xianxing' }
      ]
    }
  },
  components: {
    songSheet
  },
  methods: {
    // 改变每页显示个数
    handleSizeChange(val) {
      this.limit = val
      this.offset = val * this.currentPage
      this.getSheetList()
    },
    // 改变当前页数
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = this.limit * (val - 1)
      this.getSheetList()
    },
    // 显示分类弹窗
    openFilter() {
      this.showFilter = !this.showFilter
    },
    // 选择最新或热门
    chooseType(type) {
      // 如果是点击的是当前选项，则不用重新发送请求
      if (this.type === type) return
      this.sortType = type
      this.getSheetList()
    },
    // 选择分类
    chooseCate(tag) {
      // 如果是点击的是当前分类，则不用重新发送请求
      if (this.currentCate === tag) return
      this.currentCate = tag
      this.getSheetList()
    },
    // 获取歌单分类
    async getCateList() {
      const res = await this.$api.getCateList()
      if (res.code === 200) {
        this.categories = res.categories
        this.cateList = this.categoryGroup(res.sub, 'category')
      }
    },
    // 获取热门歌单分类
    async getHotList() {
      const res = await this.$api.getHotList()
      if (res.code === 200) {
        this.hotCategories = res.tags
      }
    },
    // 获取歌单（网友精选碟）
    async getSheetList() {
      this.screenLoading = true
      // 请求参数对象
      const params = {
        order: this.sortType,
        cat: this.currentCate,
        limit: this.limit,
        offset: this.offset
      }
      try {
        const res = await this.$api.getSheetList(params)
        if (res.code === 200) {
          this.sheetList = res.playlists
          this.sheetTotal = res.total
        }
        // 请求失败是不会往下执行的，所以要用try和catch，将遮罩关闭
        this.screenLoading = false
      } catch (e) {
        this.screenLoading = false
      }
    },
    // 根据分类进行分组
    categoryGroup(list, field) {
      const obj = {}
      for (let i = 0; i < list.length; i++) {
        obj[list[i][field]] = {
          list: obj[list[i][field]] ? obj[list[i][field]].list : []
        }
        obj[list[i][field]].list.push(list[i])
      }
      // obj的形式：obj:{'0':{list:Array[5]} , '1':{list:Array[10]} , ...}
      const att = []
      for (let item in obj) {
        let type = ''
        let category = ''
        let icon = ''
        this.typeList.forEach(val => {
          if (val.key === obj[item].list[0].category) {
            type = val.value
            category = val.key
            icon = val.icon
          }
        })
        att.push({ type, category, icon, list: obj[item].list })
      }
      return att
    }
  },
  created() {
    if (this.$route.query.cate) {
      this.currentCate = this.$route.query.cate
    }
    this.getCateList()
    this.getHotList()
    this.getSheetList()
  }
}
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.playlist-wrap {
  .filter {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    padding-right: 20px;
    border-radius: 5px 0 5px 5px;
    .title {
      position: relative;
      height: 100%;
      padding: 0 18px 0 15px;
      margin-right: 15px;
      border-radius: 5px 0 5px 5px;
      background-color: #fa2800;
      color: #fff;
      cursor: pointer;
      & > .iconfont {
        transform: rotate(90deg);
        margin-left: 10px;
        font-size: 18px;
      }
      .filter-box {
        position: absolute;
        top: 50px;
        right: -631px;
        z-index: 100;
        width: 720px;
        height: 400px;
        padding: 15px 10px 0 16px;
        border-radius: 10px 10 0 16px;
        color: #000;
        overflow-y: scroll;
        background-color: #fff;
        .item {
          margin-bottom: 20px;
          h2 {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            font-size: 15px;
            color: #161e27;
            .iconfont {
              font-size: 18px;
              margin: -1px 5px 0 0;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              padding: 8px 18px;
              border-radius: 16px;
              margin: 0 10px 10px 0;
              color: #161e27;
              cursor: pointer;
              background-color: #f7f7f7;
              transition: all 0.4s;
              &:hover,
              &.active {
                color: #fff;
                background-color: #fa2800;
              }
            }
          }
        }
        &::-webkit-scrollbar {
          width: 0;
        }
      }
    }
    .hot-tag {
      flex: 1;
      ul {
        li {
          margin: 0 5px;
          padding-right: 10px;
          cursor: pointer;
          &:hover {
            color: #888;
          }
          &.active {
            color: #fa2800;
          }
        }
        .line {
          width: 1px;
          height: 15px;
          padding: 0;
          background-color: #999;
          margin: 0 10px 0 5px;
          cursor: default;
        }
      }
    }
    .type {
      display: flex;
      .item {
        margin-left: 20px;
        padding: 5px 10px;
        background-color: #f7f7f7;
        color: #161e27;
        font-size: 12px;
        border-radius: 3px;
        transition: all 0.4s;
        cursor: pointer;
        &.active {
          background-color: #fa2800;
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>