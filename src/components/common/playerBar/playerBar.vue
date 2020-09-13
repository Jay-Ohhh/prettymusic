<template>
  <!-- vue 过渡组件 -->
  <transition name="fade">
    <div class="player-bar shadow flex-row" v-show="playList.length>0">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <div class="info">
        <span class="song-name ellipsis">{{currentSong.name}}</span>
        <span class="singer ellipsis">{{currentSong.singer}}</span>
      </div>
      <!-- 播放按钮 -->
      <div class="player-btn">
        <!-- 上一首 -->
        <i class="iconfont icon-prev niceshangyishou" @click="preSong"></i>
        <i class="iconfont icon-play nicebofang2" :class="playIcon"
          @click="togglePlaying"></i>
        <i class="iconfont icon-next nicexiayishou" @click="nextSong"></i>
      </div>
      <!-- 进度栏 -->
      <div class="progress-wrap">
        <span class="current-time">{{currentTime | formatTime}}</span>
        <!-- 进度条组件 -->
        <progress-bar :percent="percent" @changePercent="changePercent">
        </progress-bar>
        <span class="duration">{{currentSong.duration | formatTime }}</span>
      </div>
      <!-- 音量调节 -->
      <div class="volume-wrap">
        <i class="iconfont volume-icon" @click="changeMuted"
          :class="mutedIcon"></i>
        <div class="volume">
          <el-slider class="volume-inner" v-model="volumeNum"
            @change="changeVolume" style="width:100%;"></el-slider>
        </div>
      </div>
      <!-- 工具 -->
      <div class="tool">
        <!-- 改变播放模式 -->
        <i class="iconfont" :class="modeIcon" @click="changeMode"></i>
        <!-- 打开/关闭 歌词 -->
        <i class="iconfont nicegeci32" @click="openLyric"></i>
        <!-- 打开/关闭 播放列表 -->
        <i class="iconfont nicebofangliebiao24" @click="openPlayList"></i>
      </div>
      <!-- 播放器 -->
      <!-- playing 事件在音频/视频(audio/video)因缓冲而暂停或停止后已就绪时触发 -->
      <!-- error 事件在音频/视频(audio/video)加载发生错误时触发 -->
      <!-- timeupdate 事件在音频/视频（audio/video）的播放位置发生改变时触发 -->
      <!-- ended 事件在音频/视频(audio/video)播放完成后触发 -->
      <!-- pause 事件在音频/视频(audio/video)暂停时触发 -->
      <audio ref="audio" :src="currentSong.url" @playing="audioReady"
        @error="audioError" @timeupdate="updateTime" @ended="audioEnd"
        @pause="audioPaused" :muted="isMuted"></audio>
      <!-- 歌词盒子 -->
      <transition name="fade">
        <div class="lyric-box shadow" v-if="showLyric">
          <div class="title flex-between"></div>
          <scroll class="lyric" ref="lyricList"
            :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="curentLyric">
                <!-- 歌词 -->
                <p ref="lyricLine" class="lyric-text"
                  :class="currentLyricNum===index?'active':''"
                  v-for="(item,index) in currentLyric.lines" :key="index">
                  {{item.txt}}
                </p>
              </div>
              <div class="no-lyric" v-else>暂无歌词，请您欣赏</div>
            </div>
          </scroll>
          <!-- <div class="foot"></div> -->
        </div>
      </transition>
      <!-- 播放列表盒子 -->
      <transition name="fade">
        <div class="lyric-box playlist-box shadow">
          <div class="title flex-between">播放列表<i class="iconfont nicelajitong"
              @click="clearHistory"></i>
          </div>
          <div class="list">
            <div class="item flex-row"
              :class="currentSong.id === item.id && playing ? 'playing':''"
              v-for="(item,index) in historyList" :key="item.id">
              <div class="index-container flex-center">
                <!-- 序号 -->
                <span class="num">{{index+1 | formatZero(2)}}</span>
                <!-- 播放歌曲时的波浪形图标 -->
                <div class="play-icon">
                  <div class="line" style="animation-delay: -1.2s;"></div>
                  <div class="line" style="animation-delay: 0;"></div>
                  <div class="line" style="animation-delay: -1.5s;"></div>
                  <div class="line" style="animation-delay: -0.9s;"></div>
                  <div class="line" style="animation-delay: -0.6s;"></div>
                </div>
                <!-- 播放按钮 -->
                <i class="iconfont nicebofang2 play-btn"
                  @click="playSong(index)"></i>
                <!-- 暂停按钮 -->
                <i class="iconfont nicezanting1 pause-btn"
                  @click="pauseSong"></i>
              </div>
              <span class="ellipsis">{{item.name}}</span>
              <i class="iconfont niceIcon_cloose"
                @click="deleteHistoryItem(item, index)"></i>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import progressBar from './ProgressBar'
import scroll from '../Scroll'
import lyric from 'lyric-parser'
export default {
  data() {
    return {
      // 当前播放时间
      currentTime: 0,
      // 当前歌曲的所有歌词
      currentLyric: null,
      // 当前歌词第几行
      currentLyricNum: 0,
      // 显示歌词
      canLyricPlay: true,
      // 音量初始值
      volumeInit: 50,
      // 显示歌词
      showLyric: false,
      // 显示播放列表
      showPlayList: false,
      // 歌曲id
      id: '',
      // 当前播放歌词
      playingLyric: '',
      // 是否纯音乐
      isPureMusic: false,
      // 纯音乐歌词
      pureMusicLyric: '',
      // 是否静音
      isMuted: false,
      volume: 0.5,
      // element滑块调节条的值
      volumeNum: 50,
      timer: null
    }
  },
  components: {
    progressBar,
    scroll
  },
  computed: {
    ...mapState([
      'playMode',
      'playList',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList',
      'historyList'
    ]),
    ...mapGetters(['getCurrentSong']),
    // 播放/暂停按钮切换
    playIcon() {
      return this.playing ? 'nicezanting1' : 'nicebofang2'
    },
    // 播放模式
    modeIcon() {
      return this.mode === this.playMode.sequence
        ? 'nicexunhuanbofang24'
        : this.mode === this.playMode.loop
        ? 'nicebofangqidanquxunhuan'
        : 'nicebofangqisuijibofang'
    },
    // 静音按钮
    mutedIcon() {
      return this.isMuted ? 'nicejingyin1' : 'niceshengyin1'
    },
    // 已播放进度占总进度的比例
    percent() {
      return this.currentTime / this.currentSong.duration
    }
  },
  watch: {
    // 监听当前播放歌曲变化
    currentSong(newSong, oldSong) {
      // 新歌曲不存在或重复点击同一首歌曲
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) return
      this.songReady = false
      this.canLyricPlay = false
      // 如果当前歌曲的歌词存在
      if (this.currentLyric) {
        // 停止播放歌词
        this.currentLyric.stop()
        // 重置为null
        this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLyricNum = 0
      }
      this.$nextTick(() => {
        const audio = this.$refs.audio
        audio.src = newSong.url
        audio.volume = this.volume
        audio.play()
        this.saveHistory(newSong)
        this.id = newSong.id
      })
      // 若歌曲5s未播放，则认为超时，修改状态确保可以切换歌曲
      // 清理未超过5s而多次改变当前播放歌曲而产生的定时器
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.songReady = true
      }, 5000)
      this.getLyric(newSong.id)
    },
    // 监听播放状态
    playing(isPlaying) {
      if (this.songReady === false) return
      this.$nextTick(() => {
        const audio = this.$refs.audio
        isPlaying ? audio.playing() : audio.pause()
      })
    }
  },
  methods: {
    ...mapActions([
      'saveHistoryList',
      'deleteOneHistory',
      'clearHistoryList',
      'selectPlay',
      'pausePlay'
    ]),
    // 播放歌曲
    playSong(index) {
      this.selectPlay({
        list: this.historyList,
        index
      })
    },
    // 暂停播放
    pauseSong() {
      this.pausePlay()
    },
    // 点击上一首
    preSong() {},
    // 点击下一首
    nextSong() {},
    // 打开/关闭 播放列表
    openPlayList() {
      // 歌词盒子关闭
      this.showLyric = false
      this.showPlayList = !this.showPlayList
    },
    // 打开/关闭 歌词
    openLyric() {
      this.showPlayList = false
      this.showLyric = !this.showLyric
    },
    // 改变播放进度
    changePercent() {},
    // 静音/非静音切换
    changeMuted() {},
    // 调节音量（使用鼠标拖曳时，只在松开鼠标后触发）
    changeVolume() {},
    // 改变播放模式
    changeMode() {},
    // 由于暂停或数据缺失之后,播放准备完成
    audioReady() {},
    // 歌曲错误
    audioError() {},
    // 监听播放时间改变
    updateTime(e) {},
    // 歌曲播放完成
    audioEnd() {},
    // 歌曲暂停播放
    audioPaused() {},
    // 清空历史播放列表
    clearHistory() {
      this.clearHistoryList()
    },
    // 删除单个歌曲的历史播放记录
    deleteHistoryItem(item, index) {
      this.deleteOneHistory(item)
    }
  }
}
</script>

<style lang="scss" scoped>
// 给进度条设置最小宽度
</style>