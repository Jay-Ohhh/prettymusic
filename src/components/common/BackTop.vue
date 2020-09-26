<template>
  <div class="back-to-top" @click="backTop" v-show="showBackTop"
    @mouseenter="show" @mouseleave="hide">
    <img src="../../assets/images/gotop.png" alt="">
  </div>
</template>

<script>
export default {
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
      default: 'right'
    },
    // 图标形状
    iIcon: {
      type: String,
      default: 'fzicon fz-ad-fanhuidingbu1'
    },
    // 图标颜色
    iColor: {
      type: String,
      default: '#f00'
    },
    // 图标大小
    iFontSize: {
      type: String,
      default: '32px'
    },
    // 距离y轴多少距离显示返回按钮
    pageY: {
      type: Number,
      default: 200
    },
    // 过渡效果速度曲线
    transitionName: {
      type: String,
      default: 'linear'
    }
  }
}
</script>

<style>
</style>