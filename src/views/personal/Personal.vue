<template>
  <!-- 用户页面 -->
  <div class="personal-wrap">
    <div class="banner player"></div>
    <div class="personal-main container">
      <!-- 左侧 -->
      <div class="left">
        <div class="user-box shadow">
          <div class="background layer"
            :style="`backgroundImage:url(${userProfile.backgroundUrl})`"></div>
          <div class="card flex-row">
            <div class="avatar shadow">
              <img :src="userProfile.avatarUrl" alt="">
            </div>
            <div class="info flex-between">
              <p class="name ellipsis">
                {{userProfile.nickname}}
              </p>
              <div v-if="myId === userId">
                <button class="sign-btn sign-btn-active"
                  v-if="!userDetail.pcSign" @click="signIn">签到</button>
                <button class="sign-btn" v-else>已签到</button>
              </div>
            </div>
          </div>
          <!-- 个性签名 -->
          <p class="desc" :title="userDetail.signature">
            {{userDetail.signature}}
          </p>
          <div class="profile">
            <div class="tag">等级：<i class="iconfont lv-icon"
                :class="'nicelevel-' + userDetail.level"></i>
            </div>
            <div class="tag">年龄：
              <span>{{age}}</span>
              <!-- 性别图标 -->
              <i class="iconfont niceCRM_icon_nanxing sex-icon man"
                v-if="userProfile.gender === 1"></i>
              <i class="iconfont niceCRM_icon_nvxing sex-icon woman"
                v-if="userProfile.gender === 2"></i>
            </div>
            <div class="tag">地区：
              <span>{{provinceName}} <span v-if="cityName">-</span>
                {{cityName}}</span>
            </div>
          </div>
          <ul class="follow">
            <li>
              动态<span>{{userProfile.eventCount}}</span>
            </li>
            <li>
              关注<span>{{userProfile.newFollows}}</span>
            </li>
            <li>
              粉丝<span>{{userProfile.followeds}}</span>
            </li>
          </ul>
          <!-- 用户自己的页面才会显示 -->
          <div class="foot flex-center">
            <!-- 个人设置页面没做 -->
            <router-link :to="$route.fullPath" v-if="myId === userId">个人设置
            </router-link>
            <!-- 关注该用户 -->
            <!-- 非用户自己页面且没关注才会显示 + 关注 -->
            <div class="add-follow" v-else-if="(myId !== userId) && !followed"
              @click="followUser(1)">+ 关注</div>
            <div class="add-follow" v-else @click="followUser(0)">已关注</div>
          </div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="center shadow">
        <div class="card-header flex-between">
          <p class="flex-row">
            听歌排行<span>（累积听歌{{userDetail.listenSongs}}首）</span>
          </p>
          <div class="tab flex-row">
            <span :class="type===1?'active':''"
              @click="changeType(1)">最近一周</span>
            <span class="line"></span>
            <span :class="type===0?'active':''"
              @click="changeType(0)">所有时间</span>
          </div>
        </div>
        <!-- 歌曲列表 -->
        <song-sheet-list v-if="songs.length>0" :songs="songs"></song-sheet-list>
        <pretty-empty v-else :empty-text="emptyText"></pretty-empty>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <div class="my create module shadow">
          <div class="card-header flex-row">
            <span>我创建的歌单</span>
          </div>
          <song-sheet :sheet-list="myList" :num="2"></song-sheet>
        </div>
        <div class="my collect module shadow">
          <div class="card-header flex-row">
            <span>我收藏的歌单</span>
          </div>
          <song-sheet :sheet-list="collectList" :num="2"></song-sheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songSheetList from '../../components/content/SheetSongList'
import prettyEmpty from '../../components/common/PrettyEmpty'
import songSheet from '../../components/content/song-sheet/index'
import { mapGetters } from 'vuex'
import { createSong, getAstro } from '../../utils/untils'
import axios from 'axios'
export default {
  name: 'personal',
  data() {
    return {
      // 省份
      provinceName: '',
      // 城市
      cityName: '',
      // 用户的听歌排行列表(歌曲列表)
      songs: [],
      // 我创建的歌单列表
      myList: [],
      // 收藏的歌单列表
      collectList: [],
      // 标签选项：最近一周:1，所有时间:0
      type: 1,
      // 用户详情
      userDetail: {},
      // 用户信息，userProfile是userDetail的一个属性
      userProfile: {},
      // 用户id
      userId: '',
      // 格式：2020年-白羊座
      age: '',
      // 没有歌曲列表时显示的文本
      emptyText: '',
      // 是否已关注该用户
      followed: false
    }
  },
  components: { songSheetList, prettyEmpty, songSheet },
  computed: {
    ...mapGetters(['getUserInfo']),
    // 我的ID
    myId() {
      if (sessionStorage.getItem('myInfo') || this.getUserInfo.userId) {
        return (
          JSON.parse(sessionStorage.getItem('myInfo')).userId + '' ||
          this.getUserInfo.userId
        )
      }
      return ''
    }
  },
  created() {
    this.userId = this.$route.query.id
    this._initialize()
  },
  methods: {
    // 签到
    async signIn() {
      const res = await this.$api.signIn()
      if (res.code === 200) {
        this.userDetail.pcSign = true
      }
    },
    // 关注/取消关注用户
    // t : 1为关注,其他为取消关注
    async followUser(t) {
      // 判断有没有登录
      if (sessionStorage.getItem('cookie') && sessionStorage.getItem('token')) {
        const res = await this.$api.followUser(this.userProfile.userId, t)
        if (res.code === 200) {
          // 这里不必再发送请求刷新this.followed，手动修改即可
          if (t === 1) {
            this.followed = true
            // 粉丝数量+1
            this.userProfile.followeds += 1
          } else if (t === 0) {
            this.followed = false
            // 粉丝数量-1
            this.userProfile.followeds -= 1
          }
        }
      } else {
        ELEMENT.Message('请先登录')
        this.$router.push('/login')
      }
    },
    // 获取省市
    getArea() {
      // 高德地图开放接口
      axios
        .get('https://restapi.amap.com/v3/config/district', {
          params: {
            key: '5fcc853f4b7fcbbb608a33b4069b9b72', //用户在高德地图官网申请Web服务API类型KEY,一定要去自己去申请一个
            keywords: this.userProfile.province, // 搜索关键词
            // 设置显示下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县、乡镇/街道多级数据）, 1：返回下一级行政区
            subdistrict: 1,
            extensions: 'base' // 此项控制行政区信息中返回行政区边界坐标点，base:不返回行政区边界坐标点
          },
          timeout: 5000
        })
        .then(res => {
          if (res.data.status === '1' && res.data.info === 'OK') {
            if (res.data.districts.length !== 0) {
              // 地区
              let districts = res.data.districts[0]
              // 省份
              this.provinceName = districts.name
              if (res.data.districts[0].districts.length !== 0) {
                // 子级行政区
                let subDistricts = res.data.districts[0].districts
                subDistricts.forEach(item => {
                  // adcode:区域编码
                  // 为了以防一个是字符串类型，一个是数字类型，直接用双等于号都转换为字符串类型再比较
                  if (item.adcode == this.userProfile.city) {
                    this.cityName = item.name
                  }
                })
              }
            }
          }
        })
    },
    // 点击最近一周/所有时间
    changeType(type) {
      this.type = type
      // 重新获取用户播放记录
      this.getUserRecord()
    },
    // 获取用户信息
    async getUserDetail() {
      const res = await this.$api.getUserDetail(this.userId)
      if (res.code === 200) {
        this.userDetail = res
        this.userProfile = res.profile
        this.followed = res.profile.followed
        this.age = getAstro(res.profile.birthday)
      }
    },
    // 获取用户播放记录
    async getUserRecord() {
      const res = await this.$api.getUserRecord(this.userId, this.type)
      if (res.code === 200) {
        let arr = res.weekData || res.allData
        if (arr.length !== 0) {
          this.songs = this._normalizeSongs(arr)
        } else {
          this.emptyText = 'ta可能不想让我们看到~'
        }
      }
    },
    // 获取用户歌单
    async getUserArtist() {
      const res = await this.$api.getUserArtist({ uid: this.userId })
      if (res.code === 200) {
        res.playlist.forEach(item => {
          // 为了以防一个是字符串类型，一个是数字类型，直接用双等于号都转换为字符串类型再比较
          if (item.userId == this.userId) {
            this.myList.push(item)
          } else {
            this.collectList.push(item)
          }
        })
      }
    },
    // 初始化
    async _initialize() {
      // 因为this.getArea()要用到this.userProfile.province
      // 所以this.getUserDetail()要写在getArea()的前面并按顺序执行
      await this.getUserDetail()
      this.getArea()
      this.getUserRecord()
      this.getUserArtist()
    },
    // 重构歌曲详情对象结构
    _normalizeSongs(list) {
      const arr = []
      list.forEach(item => {
        item.song.playCount = item.playCount
        item.song.score = item.score
        if (item.song.id) {
          arr.push(createSong(item.song))
        }
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-wrap {
  margin-top: -20px;
  .banner {
    width: 100%;
    height: 350px;
    background: url('../../assets/images/personal.jpg') no-repeat center
      center/cover;
    // background-attachment设置背景图像是否固定或者随着页面的其余部分滚动
    background-attachment: fixed;
  }
  .personal-main {
    display: flex;
    align-items: flex-start;
    .left {
      width: 25%;
      position: relative;
      top: -60px;
      margin-right: 20px;
      .user-box {
        padding-bottom: 30px;
        border-radius: 5px;
        background-color: #fff;
        .background {
          width: 100%;
          height: 140px;
          border-radius: 5px 5px 0 0;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .card {
          width: 100%;
          padding: 0 15px 0 30px;
          margin-top: -20px;
          .avatar {
            position: relative;
            z-index: 2;
            flex-shrink: 0;
            width: 64px;
            height: 64px;
            border-radius: 3px;
            img {
              width: 100%;
              border-radius: 5px;
            }
          }
          .info {
            flex: 1;
            padding-top: 20px;
            margin-left: 15px;
            overflow: hidden;
            .name {
              margin-right: 5px;
              font-size: 16px;
              font-weight: 600;
            }
            div {
              .sign-btn {
                min-width: 55px;
                padding: 5px 15px;
                border-radius: 30px;
                font-size: 12px;
                color: #fff;
                background-color: #dbd9d9;
                &.sign-btn-active {
                  background-color: #fa2800;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .desc {
          padding: 0 40px;
          margin-top: 10px;
          font-size: 13px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        .profile {
          padding: 0 40px;
          margin-top: 10px;
          .tag {
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 15px;
            margin-bottom: 5px;
            .lv-icon {
              position: relative;
              top: 1px;
              font-size: 22px;
            }
            .sex-icon {
              margin-left: 5px;
              font-size: 14px;
              font-weight: 700;
              &.man {
                color: #4192eb;
              }
              &.woman {
                color: #f4606c;
              }
            }
            span {
              font-size: 13px;
            }
            &:before {
              content: '';
              position: absolute;
              top: 50%;
              left: 0;
              margin-top: -3px;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: #fa2800;
            }
          }
        }
        .follow {
          display: flex;
          padding-top: 15px;
          margin: 15px 30px 0;
          border-top: 1px solid #eee;
          li {
            flex: 33.33%;
            font-size: 14px;
            text-align: center;
            color: #958ebb;
            span {
              display: block;
            }
          }
        }
        .foot {
          width: 100%;
          padding: 0 30px;
          margin-top: 30px;
          a,
          .add-follow {
            display: inline-block;
            width: 50%;
            padding: 10px;
            margin: 0 6px;
            border-radius: 5px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            background: linear-gradient(to right, #ff4b2b, #ff416c);
            cursor: pointer;
          }
        }
      }
    }
    .center {
      flex: 45%;
      padding: 15px;
      margin: 40px 20px 0 0;
      border-radius: 5px;
      background-color: #fff;
      .card-header {
        p {
          span {
            color: #666;
            font-size: 12px;
            font-weight: 100;
          }
        }
        .tab {
          span {
            font-size: 12px;
            cursor: pointer;
            &.active {
              color: #fa2800;
            }
          }
          .line {
            width: 1px;
            height: 13px;
            margin: 0 10px;
            background-color: #999;
          }
        }
      }
    }
    .right {
      flex: 30%;
      padding-bottom: 30px;
      margin-top: 40px;
      border-radius: 5px;
      background-color: #fff;
      .module {
        width: 100%;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 8px;
      }
    }
  }
}
.card-header {
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding-left: 14px;
  margin-bottom: 15px;
  border-left: 3px solid #fa2800;
  font-weight: 700;
}
</style>