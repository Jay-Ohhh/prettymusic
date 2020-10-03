<template>
  <!-- 返回顶部组件 -->
  <!-- 不能用v-show,因为可能会点击到隐藏的backTop按钮 -->
  <div class="back-top" @click="backTop" v-if="showBackTop"
    @mouseenter="showTip" @mouseleave="hideTip">
    <!-- 要么用图片,要么用图标,提示可根据需要显示或隐藏（注释） -->
    <i :style="{ color: bttOption.iColor }"></i>
    <span class="tips" :class="[bttOption.iPos]"
      :style="{ color: bttOption.textColor }"
      v-show="showToolTip">{{ bttOption.text }}</span>
    <!-- <img src="../../assets/images/gotop.png" alt=""> -->
  </div>
</template>

<script>
import { scrollIt } from '../../utils/scrollIt'
export default {
  data() {
    return {
      showToolTip: false,
      showBackTop: false
    }
  },
  props: {
    // 文本提示
    text: {
      type: String,
      default: '返回顶部'
    },
    // 文本颜色
    textColor: {
      type: String,
      default: '#f00'
    },
    // 文本位置
    iPos: {
      type: String,
      default: 'top'
    },
    // 图标颜色
    iColor: {
      type: String,
      default: '#f00'
    },
    // 距离y轴多少距离显示返回按钮
    pageY: {
      type: Number,
      default: 400
    },
    // 过渡效果速度曲线
    transitionName: {
      type: String,
      default: 'easeInOutQuad'
    }
  },
  computed: {
    bttOption() {
      return {
        text: this.text,
        textColor: this.textColor,
        iPos: this.iPos,
        iIcon: this.iIcon,
        iColor: this.iColor,
        iFontSize: this.iFontSize
      }
    }
  },
  methods: {
    // 显示文字
    showTip() {
      return (this.showToolTip = true)
    },
    // 隐藏文字
    hideTip() {
      return (this.showToolTip = false)
    },
    // 判断滚动区域大于多少的时候显示返回顶部的按钮
    showBackTopBtn() {
      this.showBackTop = window.pageYOffset >= this.pageY
    },
    // 返回顶部
    backTop() {
      // 参数从左到右：距离顶部的距离，动画持续时间，动画效果曲线，返回顶部后的回调函数
      scrollIt(0, 500, this.transitionName, this.showBackTopBtn)
    }
  },
  created() {
    // 组件一被创建，为window添加scroll事件监听器
    window.addEventListener('scroll', this.showBackTopBtn)
  },
  beforeDestroy() {
    // 在销毁组件前，为window移除scroll事件的某个监听器
    window.removeEventListener('scroll', this.showBackTopBtn)
  }
}
</script>

<style>
.back-top {
  position: fixed;
  right: 70px;
  bottom: 120px;
  z-index: 999;
  cursor: pointer;
}
.back-top i {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
  padding: 5px;
  font-size: 32px;
  text-align: center;
  transition: all 0.3s;
}
.back-top i::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 10px solid currentColor;
}
.back-top i:hover {
  border-radius: 50%;
  background-color: #222;
  color: #fff;
}
.back-top .tips {
  position: absolute;
  z-index: 999;
  display: inline-block;
  white-space: nowrap;
  font-size: 12px;
  color: #000;
  transition: all 0.3s;
}
.back-top .tips.left {
  top: 50%;
  left: -130%;
  transform: translateY(-50%);
}
.back-top .tips.right {
  top: 50%;
  right: -130%;
  transform: translateY(-50%);
}
.back-top .tips.top {
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
}
.back-top .tips.bottom {
  bottom: -50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>