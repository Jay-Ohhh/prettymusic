<template>
  <!-- 歌曲列表 -->
  <div class="song-list">
    <div class='list-item' v-for="(item,index) in songList" :key="item.id"
      :class="index==getCurrentIndex && getCurrentSong.id == item.id && getPlaying?'playing':''">
      <div class="item-wrapper shadow">
        <!-- 序号 -->
        <span class="index">{{index+1 | formatZero(2)}}</span>
        <!-- 播放按钮 -->
        <i class="iconfont  nicebofang2 play-btn" @click="playSong(index)"></i>
        <!-- 暂停按钮 -->
        <i class="iconfont nicezanting1 pause-btn" @click="pausePlay"></i>
        <!-- 播放歌曲时的波浪形图标 -->
        <div class="play-icon">
          <div class="line" style="animation-delay: -1.2s;"></div>
          <div class="line" style="animation-delay: 0;"></div>
          <div class="line" style="animation-delay: -1.5s;"></div>
          <div class="line" style="animation-delay: -0.9s;"></div>
          <div class="line" style="animation-delay: -0.6s;"></div>
        </div>
        <!-- 图片 -->
        <div class="img-wrapper">
          <el-image :src="item.picUrl" lazy>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="info">
          <span class="music-name ellipsis">{{item.name}}</span>
          <span class="singer ellipsis">{{item.singer}}</span>
        </div>
        <div class="music-name ellipsis">《{{item.name}}》</div>
        <div class="duration">{{item.duration|formatTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    songList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {},
  computed: {
    ...mapGetters(['getCurrentIndex', 'getPlaying', 'getCurrentSong'])
  },
  methods: {
    // 播放歌曲
    playSong(index) {
      this.$store.dispatch('selectPlay', {
        list: this.songList,
        index
      })
    },

    ...mapActions([
      // 选择播放
      'selectPlay',
      // 暂停播放
      'pausePlay'
    ])
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -15px;
  .list-item {
    flex: 50%;
    min-width: 450px;
    padding: 0 15px;
    margin-bottom: 20px;
    transition: transform 0.6s;
    .item-wrapper {
      display: flex;
      align-items: center;
      height: 80px;
      padding: 0 26px;
      transition: box-shadow, -webkit-box-shadow 0.6s;
      .index {
        flex: 0.8;
        margin-right: 20px;
        font-size: 15px;
        color: #4a4a4a;
        font-weight: 700;
        text-align: center;
      }
      .play-btn,
      .pause-btn {
        flex: 0.8;
        display: none;
        margin-right: 18px;
        color: #fa2800;
        text-align: center;
      }
      .play-btn {
        font-size: 28px;
      }
      .pause-btn {
        font-size: 30px;
      }
      .play-icon {
        display: none;
        flex: 0.8;
        margin-left: 15px;
        height: 16px;
        margin-left: 15px;
        overflow: hidden;
        .line {
          width: 2px;
          height: 100%;
          margin-left: 2px;
          background-color: #ff410f;
          // alternate 动画轮流反向播放
          animation: play 0.9s linear infinite alternate;
        }
      }
      .img-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 10px 0;
        margin-right: 20px;
        ::v-deep img {
          width: 90%;
          height: 90%;
          border-radius: 2px;
        }
      }
      .info {
        flex: 2;
        overflow: hidden;
        cursor: text;
        .music-name {
          display: block;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .singer {
          display: block;
        }
      }
      & > .music-name {
        flex: 4;
        margin: 0 20px 0 60px;
        font-weight: 700;
        cursor: text;
      }
      .duration {
        flex: 1;
        font-weight: 700;
        text-align: right;
        cursor: text;
      }
    }
    &:hover {
      cursor: pointer;
      transform: translateY(-0.5px);
      .item-wrapper {
        -webkit-box-shadow: 0px 10px 20px 2px rgba(2, 10, 18, 0.1);
        box-shadow: 0px 10px 20px 2px rgba(2, 10, 18, 0.1);
        .index {
          display: none;
        }
        .play-btn {
          display: block;
        }
      }
    }
  }
  .list-item.playing {
    .item-wrapper {
      .index {
        display: none;
      }
      .play-btn {
        display: none;
      }
      .play-icon {
        display: flex;
      }
    }
    &:hover {
      .pause-btn {
        display: block;
      }
      .play-icon {
        display: none;
      }
    }
  }
}
</style>