<template>
  <div class="progress-bar-wrap" @mouseup.self="progressMouseUp">
    <!-- 进度栏 -->
    <div class="progress-bar" ref="progressBar" @click="progressClick">
      <div class="bar-inner">
        <!-- 已播放的进度 -->
        <div class="progress" ref="progress"></div>
        <!-- 进度条小圆点按钮 -->
        <div class="progress-btn" ref="progressBtn" @mouseup="progressMouseUp"
          @mousedown="progressMouseDown"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 播放进度
      playProgress: 0,
      // 用以存储按下鼠标时某些属性的对象
      touch: {
        // 鼠标按下的标志
        initiated: false
      }
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newVal) {
      this.setProgressWidthBySong(newVal)
    }
  },
  methods: {
    // 鼠标放开
    progressMouseUp(e) {
      // 0：谷歌等浏览器中，如果按的是鼠标左键 e.button === 0
      // 1：IE浏览器中，如果按的是鼠标左键 e.button === 1
      if (this.touch.initiated && (e.button === 0 || e.button === 1)) {
        if (document.onmousemove === null) return
        // 拖动结束
        this.touch.initiated = false
        // 改变播放进度
        this.changePercent()
        document.onmousemove = null
      }
    },
    // 鼠标按下
    progressMouseDown(e) {
      // 拖动开始
      this.touch.initiated = true
      // 以Document 对象（即文本窗口）左上角为原点，定位x轴坐标
      this.touch.startX = e.pageX
      // clientWidth获取元素除边框外的宽度，返回值不带单位
      // 获取已播放进度条的已播放长度
      this.touch.left = this.$refs.progress.clientWidth

      // 页面布局可能会因为拖动发生变化
      // 进度栏的总长度是弹性布局，即进度栏的总长度会发生变化，而mounted只执行一次，因此不能写在mounted()
      // 进度栏的总长度
      let progressBarWidth = this.$refs.progressBar.clientWidth
      // 按钮的宽度，因为点击或者经过时，按钮会变大，我们需要的是正常状态下按钮的大小
      // 以下的方法好像获取的就是正常状态下按钮的大小，无法获取hover状态下按钮的大小
      let progressBtnWidth = this.$refs.progressBtn.offsetWidth
      // 进度条最大的长度 = 进度栏的总长度 - 按钮的宽度
      let progressMaxWidth = progressBarWidth - progressBtnWidth

      document.onmousemove = e => {
        if (this.touch.initiated) {
          // 拖动鼠标，鼠标在x轴上的变化量，可正可负
          const deltaX = e.pageX - this.touch.startX
          // 已播放进度的长度，不计入按钮自身的大小
          const progressWidth = Math.min(
            // 进度栏的总长度-按钮的长度，是已播放进度的最大值
            progressMaxWidth,
            // 第二个参数：已播放的长度+拖动鼠标的长度，是已播放进度的最小值
            Math.max(0, this.touch.left + deltaX)
          )
          // 如果拖动了鼠标
          if (progressWidth >= 0) this.setProgressWidth(progressWidth)
          // 如果鼠标拖动超出了进度条
          if (progressWidth >= progressMaxWidth) {
            this.changePercent()
            this.touch.initiated = false
          }
        }
      }
    },
    // 设置已播放进度条长度
    setProgressWidth(progressWidth) {
      this.$refs.progress.style.width = `${progressWidth}px`
    },
    // 获取播放进度（ 已播放进度长度/进度条总长度 ）
    getPercent() {
      return (
        this.$refs.progress.clientWidth /
        (this.$refs.progressBar.clientWidth -
          this.$refs.progressBtn.offsetWidth)
      )
    },
    // 改变播放进度
    changePercent() {
      // 需要区分正在播放和暂停播放
      this.$emit('changepercent', this.getPercent())
    },
    // 点击控制进度
    progressClick(e) {
      // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置
      // 因为IE浏览器具有2px的上、左边框，所以是从(2,2)开始计算相对位置
      // 而其他浏览器没有
      const left = document.documentElement.clientLeft // 非IE为0，IE为2
      // 鼠标相对于页面的横坐标 - 进度栏的相对于页面的横坐标 - 按钮的一半长度
      // 由于布局因素，进度栏的相对于页面的横坐标  等于 其相对于视口的位置
      const rect = this.$refs.progressBar.getBoundingClientRect()
      // 按钮的宽度，因为点击或者经过时，按钮会变大，我们需要的是正常状态下按钮的大小
      // 以下的方法好像获取的就是正常状态下按钮的大小，无法获取hover状态下按钮的大小
      let progressBtnWidth = this.$refs.progressBtn.offsetWidth
      // 已播放进度的长度，rect.left:元素相对于视口的x坐标
      const progressWidth = e.pageX - rect.left - left - progressBtnWidth / 2
      this.setProgressWidth(progressWidth)
      this.changePercent()
    },
    // 根据歌曲播放进度，设置进度条的已播放长度
    setProgressWidthBySong(percent) {
      // 有在播放且没有点击或拖动鼠标
      if (percent >= 0 && this.touch.initiated === false) {
        // 进度栏的总长度
        let progressBarWidth = this.$refs.progressBar.clientWidth
        // 按钮的宽度，因为点击或者经过时，按钮会变大，我们需要的是正常状态下按钮的大小
        // 以下的方法好像获取的就是正常状态下按钮的大小，无法获取hover状态下按钮的大小
        let progressBtnWidth = this.$refs.progressBtn.offsetWidth
        // 进度条最大的长度 = 进度栏的总长度 - 按钮的宽度
        let progressMaxWidth = progressBarWidth - progressBtnWidth
        this.setProgressWidth(progressMaxWidth * percent)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .progress-bar {
    position: relative;
    flex: 1;
    height: 3px;
    margin: 0 25px;
    border-radius: 2px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    .bar-inner {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      .progress {
        width: 0;
        height: 3px;
        border-radius: 2px;
        background-color: #fa2800;
      }
      .progress-btn {
        position: absolute;
        top: -4.5px;
        right: -12px;
        z-index: 10;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        background-color: #fa2800;
        transition: transform 0.3s;
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
          background-color: #fff;
        }
        &:hover {
          transform: scale(1.2);
          -webkit-transform: scale(1.2);
        }
      }
    }
  }
}
</style>