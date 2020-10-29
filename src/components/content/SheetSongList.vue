<template>
  <!-- 歌单的歌曲列表组件 -->
  <div class="list-wrapper">
    <!-- 播放全部 收藏按钮 -->
    <div class="tool-head" v-if="songs.length!==0">
      <div class="item play-item" @click="playAllSong">
        <i class="iconfont niceOutlined_Play"></i>播放全部
      </div>
      <!-- 如果不是自己的歌单且只能是歌单详情页面，才显示收藏按钮 -->
      <div class="item" :class="subscribed?'active':''"
        v-if="!isPerson && $route.path==='/playlistdetail'" @click="collect">
        <i class="iconfont niceicon-heart"></i>{{collectText}}
      </div>
    </div>
    <!-- 列表 -->
    <table class="sheet-table">
      <thead>
        <tr>
          <th class="th-index">序号</th>
          <th class="th-name">歌曲</th>
          <th class="th-artist">歌手</th>
          <th class="th-album">专辑</th>
          <th class="th-duration">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr :class="getCurrentSong.id === item.id && getPlaying?'playing':''"
          v-for="(item,index) in songs" :key="item.id">
          <td>
            <div class="index-container flex-center">
              <span class="num">{{index+1 | formatZero(2)}}</span>
              <div class="play-icon">
                <div class="line" style="animation-delay: -1.2s;"></div>
                <div class="line" style="animation-delay: 0s;"></div>
                <div class="line" style="animation-delay: -1.5s;"></div>
                <div class="line" style="animation-delay: -0.9s;"></div>
                <div class="line" style="animation-delay: -0.6s;"></div>
              </div>
              <i class="iconfont nicebofang2 play-btn"
                @click="playSong(item,index)"></i>
              <i class="iconfont nicezanting1 pause-btn"
                @click="pauseSong(item,index)"></i>
            </div>
          </td>
          <td>
            <div class="name-container">
              <div class="avatar">
                <el-image :src="item.picUrl+'?param=80y80'" lazy>
                  <div slot="error" class="image-slot">
                    <i class="iconfont niceicon-3"></i>
                  </div>
                </el-image>
              </div>
              <!-- title属性相当于tooltip提示 -->
              <span class="name ellipsis"
                :title="item.name">{{item.name}}</span>
            </div>
          </td>
          <td>
            <div class="artist-container ellipsis">
              <span class="author" :title="item.singer">{{item.singer}}</span>
            </div>
          </td>
          <td>
            <div class="album-container ellipsis">
              <span class="album" :title="item.album">{{item.album}}</span>
            </div>
          </td>
          <td>
            <div class="duration-container">
              <span class="duration">{{item.duration | formatTime}}</span>
              <div class="song-tools">
                <i class="iconfont niceicon-heart" title="喜欢"></i>
                <i class="iconfont nicexiazai" title="下载"></i>
                <i class="iconfont nicedot" title="更多"></i>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: {
    // 歌曲数组
    songs: {
      type: Array
    },
    // 是否已收藏
    subscribed: {
      type: Boolean
    },
    // 是否是我的歌单
    isPerson: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['getCurrentSong', 'getPlaying', 'getCurrentMode']),
    collectText() {
      return this.subscribed ? '已收藏' : '收藏'
    }
  },
  methods: {
    ...mapMutations(['setPlaying', 'setSongSheet']),
    ...mapActions([
      // 选择播放
      'selectPlay',
      // 暂停播放
      'pausePlay',
      // 播放全部
      'playAll'
    ]),
    // 播放歌曲
    playSong(item, index) {
      // 暂停时再次点击歌曲前面的播放按钮
      if (
        item.id === this.getCurrentSong.id &&
        this.getCurrentMode !== this.getCurrentMode.random
      ) {
        this.setPlaying(true)
        return
      }
      this.$store.dispatch('selectPlay', {
        list: this.songs,
        index
      })
      this.setSongSheet(this.songs)
    },
    // 停止播放歌曲
    pauseSong() {
      this.pausePlay()
    },
    // 全部播放
    playAllSong() {
      this.playAll({ list: this.songs })
      this.setSongSheet(this.songs)
    },
    // 收藏歌单
    collect() {
      this.$emit('collectartist')
    }
  }
}
</script>

<style lang="scss" scoped>
tbody {
  img {
    border-radius: 5px;
  }
  span {
    cursor: default;
  }
  i {
    cursor: pointer;
  }
}
.list-wrapper {
  width: 100%;
  // 播放全部 收藏按钮
  .tool-head {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 15px 0;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 7px 15px;
      margin-left: 15px;
      border-radius: 50px;
      color: #333;
      cursor: pointer;
      background-color: #f2f2f2;
      transition: all 0.4s;
      .iconfont {
        margin-right: 5px;
      }
      &.active {
        color: #fff;
        background-color: #fa2800;
      }
    }
    .play-item {
      color: #fff;
      background-color: #fa2800;
    }
  }
  // 歌曲列表
  .sheet-table {
    width: 100%;
    thead {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #999;
      background-color: #fafafa;
      th {
        padding: 0 9px;
        text-align: left;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.th-index {
          width: 10%;
          text-align: center;
        }
        &.th-name {
          width: 35%;
        }
        &.artist {
          width: 25%;
        }
        &.album {
          width: 15%;
        }
        &.th-duration {
          width: 15%;
          padding-right: 40px;
          text-align: right;
        }
      }
    }
    tbody {
      width: 100%;
      tr {
        height: 50px;
        transition: background-color 0.2s linear;
        td {
          padding: 0 9px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .index-container {
            .num {
              color: #4a4a4a;
              font-weight: 500;
            }
            .play-icon {
              display: none;
              height: 16px;
              min-width: 20px;
              overflow: hidden;
              .line {
                width: 2px;
                height: 100%;
                margin-left: 2px;
                background-color: #ff410f;
                animation: play 0.9s linear infinite alternate;
              }
            }
            .play-btn {
              display: none;
              color: #fa2800;
              font-size: 28px;
              text-align: left;
              cursor: pointer;
            }
            .pause-btn {
              display: none;
              font-size: 30px;
              color: #fa2800;
              text-align: left;
              cursor: pointer;
            }
          }
          .name-container {
            display: flex;
            align-items: center;
            .avatar {
              width: 35px;
              height: 35px;
              border-radius: 5px;
              flex-shrink: 0;
              margin-right: 10px;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
          }
          .duration-container {
            position: relative;
            padding-right: 15px;
            text-align: right;
            .duration {
              padding-right: 10px;
            }
            .song-tools {
              position: absolute;
              top: 50%;
              right: 10px;
              display: flex;
              justify-content: flex-end;
              display: none;
              .iconfont {
                flex-shrink: 0;
                margin-right: 15px;
                font-size: 20px;
                cursor: pointer;
              }
            }
          }
        }
        &:hover {
          background-color: #e8e9ed;
          .index-container {
            .num {
              display: none;
            }
            .play-btn {
              display: inline-block;
            }
          }
        }
        &:nth-child(2n) {
          background-color: #f7f7f7;
        }
        &.playing {
          color: #fa2800;
          .index-container {
            .num {
              display: none;
            }
            .play-icon {
              display: flex;
            }
            .play-btn {
              display: none;
            }
          }
          &:hover {
            .index-container {
              .play-icon {
                display: none;
              }
              .pause-btn {
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
}
</style>