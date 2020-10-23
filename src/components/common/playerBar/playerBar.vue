<template>
  <!-- vue 过渡组件 -->
  <transition name="fade">
    <div class="player-bar shadow flex-row"
      :class="{fold:showPlayerByArrow===false}" v-show="playList.length>0">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="getCurrentSong.picUrl" alt="">
      </div>
      <div class="info">
        <span class="song-name ellipsis">{{getCurrentSong.name}}</span>
        <span class="singer ellipsis">{{getCurrentSong.singer}}</span>
      </div>
      <!-- 播放工具栏的按钮 -->
      <div class="player-btn">
        <!-- 上一首按钮 -->
        <i class="iconfont icon-pre niceshangyishou" @click="preSong"></i>
        <!-- 播放/暂停按钮 -->
        <i class="iconfont icon-play" :class="[playIcon,{active:playing}]"
          @click="togglePlaying"></i>
        <!-- 下一首按钮 -->
        <i class="iconfont icon-next nicexiayishou" @click="nextSong"></i>
      </div>
      <!-- 进度栏 -->
      <div class="progress-wrap">
        <span class="current-time">{{currentTime | formatTime}}</span>
        <!-- 进度条组件 -->
        <progress-bar :percent="percent" @changepercent="changePercent">
        </progress-bar>
        <span class="duration">{{getCurrentSong.duration | formatTime }}</span>
      </div>
      <!-- 音量调节 -->
      <div class="volume-wrap">
        <i class="iconfont volume-icon" @click="changeMuted"
          :class="mutedIcon"></i>
        <div class="volume">
          <el-slider class="volume-inner" v-model="volumeNum"
            @change="changeVolume"></el-slider>
        </div>
      </div>
      <!-- 工具 -->
      <div class="tool">
        <!-- 改变播放模式 -->
        <el-tooltip :content="toolTip" placement="top">
          <i class="iconfont" :class="modeIcon" @click="changeMode"></i>
        </el-tooltip>
        <!-- 打开/关闭 歌词 -->
        <i class="iconfont nicegeci32" @click="openOrCloseLyric"></i>
        <!-- 打开/关闭 播放列表 -->
        <i class="iconfont nicebofangliebiao24"
          @click="openOrClosePlayList"></i>
      </div>
      <!-- 播放器 -->
      <!-- playing 事件在音频/视频(audio/video)因缓冲而暂停或停止后已就绪时触发 -->
      <!-- error 事件在音频/视频(audio/video)加载发生错误时触发 -->
      <!-- timeupdate 事件在音频/视频（audio/video）的播放位置发生改变时触发 -->
      <!-- ended 事件在音频/视频(audio/video)播放完成后触发 -->
      <!-- pause 事件在音频/视频(audio/video)暂停时触发 -->
      <!-- 当前播放歌曲发生变化（watch监听）就会加入播放历史 -->
      <audio ref="audio" :src="getCurrentSong.url" @playing="audioReady"
        @error="audioError" @timeupdate="updateTime" @ended="audioEnd"
        @pause="audioPaused" :muted="isMuted"></audio>
      <!-- 歌词盒子 -->
      <transition name="fade">
        <div class="lyric-box shadow" v-if="showLyric">
          <div class="title flex-center">歌词</div>
          <!-- 歌词列表 scroll要用鼠标拖动，不能用滚轮 -->
          <scroll class="lyric" ref="lyricList"
            :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <!-- 每一行歌词 -->
                <p ref="lyricLine" class="lyric-text"
                  :class="currentLyricNum===index?'active':''"
                  v-for="(item,index) in currentLyric.lines" :key="index">
                  {{item.txt}}
                </p>
              </div>
              <div class="no-lyric" v-else>暂无歌词，请您欣赏</div>
            </div>
          </scroll>
          <!-- 关闭歌词的箭头按钮 -->
          <div class="close-icon-wrapper" @click="openOrCloseLyric"><i
              class="close-icon"></i></div>
        </div>
      </transition>
      <!-- 播放歌曲列表盒子：最近播放 歌单列表 -->
      <transition name="fade">
        <div class="playlist-box shadow" v-if="showPlayList">
          <div class="title flex-row">
            <span class="tag1" :class="{active:listType==='historyList'}"
              @click="listType='historyList'">最近播放</span>
            <span class="tag2" :class="{active:listType==='songSheet'}"
              @click="listType='songSheet'">当前歌单</span>
            <i class="iconfont nicelajitong" title="全部删除"
              v-if="listType==='historyList'" @click="clearHistoryOrSheet"></i>
          </div>
          <div class="play-all" @click="playAllSong"><i
              class="iconfont nicebofang2"></i><span>播放全部（共{{songList.length}}首）</span>
          </div>
          <div class="list">
            <div class="item flex-row"
              :class="getCurrentSong.id === item.id && playing ? 'playing':''"
              v-for="(item,index) in songList" :key="item.id">
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
                <!-- 播放列表每首歌前面的播放按钮 -->
                <i class="iconfont nicebofang2 play-btn"
                  @click="playSong(item,index)"></i>
                <!-- 播放列表每首歌前面的暂停按钮 -->
                <i class="iconfont nicezanting1 pause-btn"
                  @click="pauseSong"></i>
              </div>
              <span class="song-name ellipsis">{{item.name}}</span>
              <i class="iconfont niceIcon_cloose"
                v-if="!(listType==='songSheet')"
                @click="deleteHistoryItem(item, index)"></i>
            </div>
          </div>
          <!-- 关闭列表的箭头按钮 -->
          <div class="close-icon-wrapper" @click="openOrClosePlayList"><i
              class="close-icon"></i></div>
        </div>
      </transition>
      <!-- 收起/展开 播放器按钮 -->
      <div class="fold-btn" @click="foldOrShowPlayer"><i class="fold-arrow"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { shuffle } from '../../../utils/untils'
import progressBar from './ProgressBar'
import scroll from '../Scroll'
import lyric from 'lyric-parser'
export default {
  data() {
    return {
      // 歌曲是否准备
      songReady: false,
      // 当前播放时间,单位ms
      // 通过audio的updateTime事件监听并赋值，audio的时间单位是s赋值给currentTime时要
      // 赋值给currentTime时要注意乘以1000
      currentTime: 0,
      // 当前歌曲对象，调用lyric-parser库创建
      currentLyric: null,
      // 当前歌词第几行
      currentLyricNum: 0,
      // 缓冲未完成时为false，缓冲完成已就绪时为true
      canLyricPlay: false,
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
      // 音量 最小0，最大1
      volume: 0.5,
      // element滑块调节条的默认值
      volumeNum: 30,
      timer: null,
      // 显示最近播放还是歌单列表
      listType: 'historyList',
      // 控制播放器的显示与隐藏的其中一个标志
      // 默认为true，第一次打开页面点击歌曲后才能显示播放器
      showPlayerByArrow: true,
      // 不要将该歌曲升至顶部
      playSongNoRise: false,
      // 能否将最近播放列表传入playList
      canToPlayList: true,
      // 当前播放歌曲在最近播放列表的索引
      indexOfHistory: -1
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
      'currentMode',
      'historyList',
      'songSheet'
    ]),
    ...mapGetters(['getCurrentSong']),
    // 根据点击'最近播放'和'当前歌单'标签，改变当前列表类型listType
    // 然后显示 最近播放列表 或者 歌单歌曲列表
    // 每次切换，对列表A或列表B数组进行排序再传入列表C，找到当前播放歌曲在列表C的索引，设置为当前播放索引
    songList() {
      let list = []
      let songList = []
      if (this.listType === 'historyList') {
        songList = list = this.historyList
      } else if (this.listType === 'songSheet') {
        songList = list = this.songSheet
      }
      // 当点击全部删除后，historyList为空数组，而playList为了播放器能够显示歌曲信息则会保留当前播放歌曲，所以当historyList为0时不能再传入playList
      if (list.length !== 0 && this.canToPlayList === true) {
        let song = this.getCurrentSong
        if (this.currentMode === this.playMode.random) {
          list = shuffle(list)
        }
        // 当前播放歌曲在随机列表中的索引
        let index = list.findIndex(item => item.id === song.id)
        this.setPlayList(list)
        this.setCurrentIndex(index)
      }
      return songList
    },
    // 播放/暂停按钮切换
    playIcon() {
      return this.playing ? 'nicezanting1' : 'nicebofang2'
    },
    // 播放模式
    modeIcon() {
      return this.currentMode === this.playMode.sequence
        ? 'nicexunhuanbofang24'
        : this.currentMode === this.playMode.loop
        ? 'nicebofangqidanquxunhuan'
        : 'nicebofangqisuijibofang'
    },
    // 鼠标经过播放模式按钮上方出现的提示文字
    toolTip() {
      return this.currentMode === this.playMode.sequence
        ? '顺序播放'
        : this.currentMode === this.playMode.loop
        ? '单曲循环'
        : '随机播放'
    },
    // 静音按钮
    mutedIcon() {
      return this.isMuted ? 'nicejingyin1' : 'niceshengyin1'
    },
    // 已播放进度占总进度的比例
    percent() {
      return this.currentTime / this.getCurrentSong.duration
    }
  },
  watch: {
    // 监听当前播放歌曲变化
    getCurrentSong(newSong, oldSong) {
      // 新歌曲不存在或重复点击同一首歌曲
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) return
      this.songReady = false
      this.canLyricPlay = false
      // 如果当前歌曲的歌词存在
      if (this.currentLyric) {
        // 停止播放歌词
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLyricNum = 0
        // 重置为null
        this.currentLyric = null
      }
      this.$nextTick(() => {
        const audio = this.$refs.audio
        audio.src = newSong.url
        audio.volume = this.volume
        audio.play()
        if (this.playSongNoRise === false) this.saveHistoryList(newSong)
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
        isPlaying ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    ...mapMutations([
      'setPlaying',
      'setCurrentIndex',
      'setCurrentMode',
      'setPlayList',
      'setHistoryList'
    ]),
    ...mapActions([
      'saveHistoryList',
      'deleteOneHistory',
      'clearHistoryList',
      'selectPlay',
      'pausePlay',
      'playAll',
      'clearSongSheet'
    ]),
    // 获取歌词
    async getLyric(id) {
      try {
        let res = await this.$api.getLyric(id)
        if (res.code === 200) {
          // 如果歌词是base64格式需要安装js-base64库，利用其API解析，此处不需解析
          let lyricStr = res.lrc.lyric
          // 新建Lyric-parser歌词对象
          // lyricStr是歌词信息，格式：[00:04.050]\n[00:12.570]难以忘记初次见你\n[00:16.860]一双迷人的眼睛\n
          // this.currentLyric.play()后会监听歌词随时间的变化
          this.currentLyric = new lyric(lyricStr, this.lyricHandle)
          if (this.isPureMusic) {
            // \d匹配一个数字'字符'，{n}：n 是一个非负整数，匹配确定的 n 次
            // \[ ，对 [ 转义
            // () 运算优先级，g是全局匹配
            // 匹配 [00:04.05] 这样的格式
            const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g
            // 歌词对象的lrc属性值是歌词信息
            this.pureMusicLyric = this.currentLyric.lrc
              .replace(timeExp, '')
              .trim()
            this.playingLyric = this.pureMusicLyric
          } else {
            if (this.playing && this.canLyricPlay)
              // 寻找对应的开始时间的歌词
              this.currentLyric.seek(this.currentTime)
          }
        }
      } catch (error) {
        // 出错则重置
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLyricNum = 0
      }
    },
    // 歌词随时间改变的回调，lineNum：歌词第几行, txt：该行歌词
    lyricHandle({ lineNum, txt }) {
      if (!this.$refs.lyricLine) return
      this.currentLyricNum = lineNum
      // 若当前行大于8,开始滚动,以保歌词显示于中间位置
      if (this.$refs.lyricList) {
        if (lineNum > 8) {
          let lineEl = this.$refs.lyricLine[lineNum - 8]
          // 结合better-scroll，滚动歌词
          // lineEl: 滚动到的目标元素, 1000: 滚动动画执行的时长（单位 ms）
          // 等一句歌词滚动渲染完成，才进行下一句歌词的滚动
          this.$nextTick(() => {
            this.$refs.lyricList.scrollToElement(lineEl, 1000)
          })
        } else {
          // 等渲染完成再滚动
          this.$nextTick(() => {
            this.$refs.lyricList.scrollTo(0, 0, 1000)
          })
        }
        // 当前播放的歌词
        this.playingLyric = txt
      }
    },
    // 点击播放列表的歌曲前面的播放按钮，播放歌曲
    playSong(item, index) {
      this.playSongNoRise = false
      // 暂停时再次点击播放列表的歌曲前面的播放按钮
      if (
        item.id === this.getCurrentSong.id &&
        this.currentMode !== this.playMode.random
      ) {
        this.setPlaying(true)
        return
      }
      // 通过actions把最近播放列表根据播放模式进行数组调整，传到state的播放列表playList
      // 然后在找到该歌曲在播放列表数组的索引，传到state的currentIndex
      // 然后audio表前通过getters的getCurrentSong:state.playList[state.currentIndex].url获取到音频链接
      this.selectPlay({
        list: this.songList,
        index
      })
    },
    // 播放全部
    playAllSong() {
      this.playSongNoRise = true
      // 如果最近播放列表或当前歌单为空数组时，return
      if (this.songList.length === 0) return
      this.playAll({ list: this.songList })
    },
    // 暂停播放
    pauseSong() {
      this.pausePlay()
    },
    // 播放/暂停 (播放工具栏的播放/暂停按钮)
    togglePlaying() {
      if (this.songReady === false) return
      // 切换歌曲和歌词的播放状态
      this.setPlaying(!this.playing)
      if (this.currentLyric) this.currentLyric.togglePlay()
    },
    // 在音频/视频(audio/video)因缓冲（而暂停）或停止后已就绪时触发
    audioReady() {
      clearTimeout(this.timer)
      this.songReady = true
      this.canLyricPlay = true
      // 歌词对象存在且非纯音乐
      if (this.currentLyric && !this.isPureMusic) {
        // 匹配歌词时间轴，形参单位要求是毫秒
        this.currentLyric.seek(this.currentTime)
      }
    },
    // 歌曲错误
    audioError() {
      clearTimeout(this.timer)
      // getCurrentSong即当前播放的音乐，当点击音乐播放但未缓冲完成时，this.songReady会设置为false
      // 缓存完成或超过5s都会将this.songReady设置为true
      // 而歌曲错误，也需要将this.songReady设置为true，避免影响其他歌曲播放
      this.songReady = true
      if (this.$msg) {
        this.$msg('这首歌暂时没有版权~')
      }
    },
    // 歌曲暂停
    audioPaused() {
      this.setPlaying(false)
      if (this.currentLyric) this.currentLyric.stop()
    },
    // 歌曲播放完成
    audioEnd() {
      if (this.canToPlayList === false) {
        // 这段代码针对于 删除的是当前播放歌曲，但当前播放歌曲不是列表A仅有的一首歌
        // 在当前歌曲播放完成后，播放下一首之前，或者点击上一首或下一首时
        // 根据播放模式排序后传入列表C，并将当前播放歌曲在最近列表的索引设置为当前索引。在列表循环和单曲循环模式下
        // 下一首播放歌曲的索引即为被删除歌曲的索引，因此将该索引设置为当前播放索引。因为随机模式是乱序
        // 对于下一首是随机，因此也可以直接将该索引设置为当前播放索引
        // 如果没有下一首歌，直接设置当前索引为0
        // 上一首播放歌曲的索引即为被删除歌曲的索引-1
        this.canToPlayList = true
        if (this.historyList.length === 0) {
          this.setPlayList([this.getCurrentSong])
        } else {
          let song = this.getCurrentSong
          let list = this.historyList
          if (this.currentMode === this.playMode.random) {
            list = shuffle(this.historyList)
          }
          this.setPlayList(list)
          if (this.indexOfHistory < this.playList.length) {
            this.setCurrentIndex(this.indexOfHistory)
          } else {
            this.setCurrentIndex(0)
          }
        }
        this.setPlaying(true)
        return
      }
      this.currentTime = 0
      if (this.currentMode === this.playMode.loop) {
        this.loopSong()
      } else {
        this.nextSong()
      }
    },
    // 控制静音
    changeMuted() {
      this.isMuted = !this.isMuted
      this.$refs.audio.muted = this.isMuted
    },
    // 单曲循环播放
    loopSong() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlaying(true)
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    // 上一首,即使是单曲循环也是切换到上一首，然后再单曲循环
    preSong() {
      if (this.listType === 'historyList') {
        this.playSongNoRise = true
      } else {
        this.playSongNoRise = false
      }
      if (this.songReady === false) return
      if (this.canToPlayList === false) {
        // 这段代码针对于 删除的是当前播放歌曲，但当前播放歌曲不是列表A仅有的一首歌
        // 在当前歌曲播放完成后，播放下一首之前，或者点击上一首或下一首时
        // 根据播放模式排序后传入列表C，并将当前播放歌曲在最近列表的索引设置为当前索引。在列表循环和单曲循环模式下
        // 下一首播放歌曲的索引即为被删除歌曲的索引，因此将该索引设置为当前播放索引。因为随机模式是乱序
        // 对于下一首是随机，因此也可以直接将该索引设置为当前播放索引
        // 如果没有下一首歌，直接设置当前索引为0
        // 上一首播放歌曲的索引即为被删除歌曲的索引-1
        this.canToPlayList = true
        if (this.historyList.length === 0) {
          this.setPlayList([this.getCurrentSong])
          this.setCurrentIndex(0)
        } else {
          let song = this.getCurrentSong
          let list = this.historyList
          if (this.currentMode === this.playMode.random) {
            list = shuffle(this.historyList)
          }
          this.setPlayList(list)
          let index = this.indexOfHistory - 1
          if (index < 0) index = this.playList.length - 1
          this.setCurrentIndex(index)
        }
        return
      }
      // 如果播放列表只有一首
      if (this.playList.length === 1) {
        this.loopSong()
        return
      } else {
        let index = this.currentIndex - 1
        if (index < 0) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        // 如果正在暂停
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    // 下一首，即使是单曲循环也是切换到下一首，然后再单曲循环
    nextSong() {
      if (this.listType === 'historyList') {
        // 最近播放列表存在 “提升歌曲”
        this.playSongNoRise = true
      } else {
        this.playSongNoRise = false
      }
      if (this.songReady === false) return
      if (this.canToPlayList === false) {
        // 这段代码针对于 删除的是当前播放歌曲，但当前播放歌曲不是列表A仅有的一首歌
        // 在当前歌曲播放完成后，播放下一首之前，或者点击上一首或下一首时
        // 根据播放模式排序后传入列表C，并将当前播放歌曲在最近列表的索引设置为当前索引。在列表循环和单曲循环模式下
        // 下一首播放歌曲的索引即为被删除歌曲的索引，因此将该索引设置为当前播放索引。因为随机模式是乱序
        // 对于下一首是随机，因此也可以直接将该索引设置为当前播放索引
        // 如果没有下一首歌，直接设置当前索引为0
        // 上一首播放歌曲的索引即为被删除歌曲的索引-1
        this.canToPlayList = true
        if (this.historyList.length === 0) {
          this.setPlayList([this.getCurrentSong])
          this.setCurrentIndex(0)
        } else {
          let song = this.getCurrentSong
          let list = this.historyList
          if (this.currentMode === this.playMode.random) {
            list = shuffle(this.historyList)
          }
          this.setPlayList(list)
          if (this.indexOfHistory < this.playList.length) {
            this.setCurrentIndex(this.indexOfHistory)
          } else {
            this.setCurrentIndex(0)
          }
        }
        return
      }
      if (this.playList.length === 1) {
        this.loopSong()
        return
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        // 如果正在暂停
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    // 打开/关闭 播放列表
    openOrClosePlayList() {
      // 歌词盒子关闭
      this.showLyric = false
      this.showPlayList = !this.showPlayList
    },
    // 打开/关闭 歌词盒子
    openOrCloseLyric() {
      this.showPlayList = false
      this.showLyric = !this.showLyric
    },
    // 拖动进度条，改变播放进度，参数percent从子组件传过来
    changePercent(percent) {
      const currentTime = this.getCurrentSong.duration * percent
      this.currentTime = currentTime
      // audio.currentTime属性单位是秒
      this.$refs.audio.currentTime = currentTime / 1000
      if (this.currentLyric) this.currentLyric.seek(this.currentTime)
      if (this.playing === false) this.togglePlaying()
    },
    // 调节音量（使用鼠标拖曳时，只在松开鼠标后触发）
    changeVolume(e) {
      // e是el-slider改变后的值 从 0 (静音) 到 100 (最大声)
      this.volume = e / 100
      // audio标签属性volume 从 0.0 (静音) 到 1.0 (最大声)
      this.$refs.audio.volume = e / 100
    },
    // 改变播放模式,一直按一直按顺序切换：顺序:0 -> 单曲循环:1 -> 随机:2
    changeMode() {
      const currentMode = (this.currentMode + 1) % 3
      this.setCurrentMode(currentMode)
      if (this.canToPlayList === false) return
      if (this.songList.length === 0) return
      let list = null
      if (currentMode === this.playMode.random) {
        list = shuffle(this.songList)
      } else {
        list = this.songList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    // 重置当前播放歌曲的索引
    resetCurrentIndex(list) {
      let index = list.findIndex(item => item.id === this.getCurrentSong.id)
      this.setCurrentIndex(index)
    },
    // 监听播放时间改变
    updateTime(e) {
      this.currentTime = e.target.currentTime * 1000
    },
    // 清空历史播放列表
    clearHistoryOrSheet() {
      if (this.listType === 'historyList') {
        // 清理播放列表，但要保持当前播放的歌曲，以防播放组件隐藏掉或没有歌曲信息可显示
        this.clearHistoryList(this.getCurrentSong)
      } else if (this.listType === 'songSheet') {
        // 清空当前歌单
        this.clearSongSheet()
      }
    },
    // 删除单个歌曲的历史播放记录
    deleteHistoryItem(item, index) {
      // 删除的不是当前歌曲
      if (item.id !== this.getCurrentSong.id) {
        this.deleteOneHistory(item)
        // 删除在最近播放列表的该歌曲
        // 最近播放列表一旦发生变化，在songList()内
        // 找到该歌曲在最近播放列表的索引，然后将最近播放传入playList
        // 将该索引设置为当前索引，该索引即指向下一首
        // 在随机模式下，下一首指向谁都无所谓
      } else if (
        item.id === this.getCurrentSong.id &&
        this.historyList.length === 1
      ) {
        // 删除的是当前播放歌曲且最近播放列表仅有该歌曲时
        this.deleteOneHistory(item)
        // 最近播放列表发生了变化，但此时为空数组
        // 在songList()内不会找索引，不会传入playList
        this.setPlayList([item])
        this.setCurrentIndex(0)
      } else if (
        item.id === this.getCurrentSong.id &&
        this.historyList.length > 1
      ) {
        this.canToPlayList = false
        this.indexOfHistory = this.historyList.findIndex(
          val => val.id === item.id
        )
        this.deleteOneHistory(item)
      }
    },
    // 折叠/展示 播放器
    foldOrShowPlayer() {
      this.showPlayerByArrow = !this.showPlayerByArrow
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-leave-active {
  transition: all 0.5s;
}
.player-bar {
  // 已设置了flex--row类名
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  min-width: 970px;
  height: 72px;
  padding: 0 10px 0 20px;
  background-color: #fff;
  transition: transform 0.5s;
  // 头像
  .avatar {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .info {
    width: 120px;
    margin-left: 15px;
    flex-shrink: 0;
    .song-name {
      display: block;
      margin-bottom: 13px;
      font-size: 14px;
      color: #333;
    }
    .singer {
      display: block;
      font-size: 12px;
      color: #666;
    }
  }
  .player-btn {
    display: flex;
    align-items: center;
    i {
      cursor: pointer;
    }
    .icon-pre,
    .icon-next {
      font-size: 40px;
    }
    .icon-play {
      font-size: 60px;
      margin: 0 10px;
      &.active {
        color: #fa2800;
      }
    }
  }
  .progress-wrap {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 150px;
    height: 100%;
    margin-left: 30px;
    .current-time {
      font-size: 14px;
    }
  }
  .volume-wrap {
    flex: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    padding-right: 20px;
    .volume-icon {
      font-size: 26px;
      font-weight: 700;
      cursor: pointer;
    }
    .volume {
      flex: 0.6;
      position: relative;
      width: 100%;
      min-width: 50px;
      height: 2px;
      margin-left: 10px;
      border-radius: 2px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.1);
      .volume-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
  }
  .tool {
    .iconfont {
      font-size: 26px;
      margin: 0 15px;
      cursor: pointer;
    }
  }
  .lyric-box,
  .playlist-box {
    position: absolute;
    right: 10px;
    bottom: 80px;
    height: 580px;
    padding: 30px;
    border-radius: 3px;
    overflow: hidden;
    .play-all {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        .nicebofang2 {
          color: #fa2800;
          transform: scale(1.1);
        }
      }
      .nicebofang2 {
        position: relative;
        top: 1px;
        font-size: 24px;
        transition: color 0.3s, transform 0.3s;
      }
      span {
        margin-left: 5px;
        font-size: 16px;
      }
    }
  }
  .lyric-box {
    width: 360px;
    .title {
      margin: 0 0 20px;
      font-size: 18px;
    }
    .lyric {
      width: 100%;
      height: 430px;
      overflow: hidden;
      .lyric-wrapper {
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        .lyric-text {
          margin: 5px 0;
          line-height: 24px;
          text-align: center;
          font-size: 14px;
          font-weight: normal;
          &.active {
            color: #fa2800;
          }
        }
      }
    }
    .close-icon-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: #f1f1f1;
        .close-icon {
          transform: scale(1.2) rotate(45deg);
          background-color: #f1f1f1;
        }
      }
      .close-icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-right: 1px solid #4a4a4a;
        border-bottom: 1px solid #4a4a4a;
        transform: rotate(45deg);
        background-color: #fff;
        transition: transform 0.3s, background-color 0.3s;
      }
    }
  }
  .playlist-box {
    width: 460px;
    .title {
      margin: 10px 0 25px;
      font-size: 16px;
      .tag1,
      .tag2 {
        position: relative;
        cursor: pointer;
        &.active {
          color: #fa2800;
        }
        &.active::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          border-bottom: 2px solid #fa2800;
        }
      }
      .tag2 {
        margin-left: 25px;
      }
      i {
        margin-left: 220px;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: #fa2800;
        }
      }
    }
    .list {
      overflow-y: scroll;
      max-height: calc(100% - 90px);
      .item {
        padding: 8px 0;
        height: 40px;
        .index-container {
          width: 30px;
          margin-right: 20px;
          flex-shrink: 0;
          .num {
            font-size: 14px;
            color: #4a4a4a;
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
              // alternate 动画轮流反向播放
              animation: play 0.9s linear infinite alternate;
            }
          }
          .play-btn,
          .pause-btn {
            display: none;
            color: #fa2800;
            text-align: left;
            cursor: pointer;
          }
          .play-btn {
            font-size: 28px;
          }
          .pause-btn {
            font-size: 30px;
          }
        }
        .song-name {
          flex: 1;
          margin-right: 20px;
          cursor: pointer;
        }
        .niceIcon_cloose {
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: #fa2800;
          }
        }
        &:hover {
          .index-container {
            .num {
              display: none;
            }
            .play-btn {
              display: block;
            }
          }
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
            .pause-btn {
              display: none;
            }
          }
        }
        &.playing:hover {
          .play-icon {
            display: none;
          }
          .pause-btn {
            display: block;
          }
        }
      }
    }
    .close-icon-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: #f1f1f1;
        .close-icon {
          transform: scale(1.2) rotate(45deg);
          background-color: #f1f1f1;
        }
      }
      .close-icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-right: 1px solid #4a4a4a;
        border-bottom: 1px solid #4a4a4a;
        transform: rotate(45deg);
        background-color: #fff;
        transition: transform 0.3s, background-color 0.3s;
      }
    }
  }
  .fold-btn {
    display: flex;
    align-items: center;
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    height: 25px;
    padding: 0 20px;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 22px solid rgba(228, 227, 227, 0.5);
    cursor: pointer;
    .fold-arrow {
      position: relative;
      top: 8px;
      display: block;
      width: 12px;
      height: 12px;
      border-right: 1px solid #4a4a4a;
      border-bottom: 1px solid #4a4a4a;
      transform-origin: 70% 80%;
      transform: rotate(45deg);
      transition: transform 0.3s;
    }
  }
}
.player-bar.fold {
  transform: translateY(70px);
  .fold-arrow {
    transform-origin: 70% 80%;
    transform: rotate(-135deg);
  }
}
</style>
