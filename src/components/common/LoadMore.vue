<template>
  <!-- 触底加载更多 -->
  <div class="load-more">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    // 获取页面滚动的距离(被卷去的高)
    getScrollTop() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      return scrollTop
    },
    // 获取页面网页可见区域高(不包含边框)
    getClientHeight() {
      return document.documentElement.clientHeight || document.body.clientHeight
    },
    // 获取网页全文高（包括被卷去的部分）
    getScrollHeight() {
      return document.documentElement.scrollHeight || document.body.scrollHeight
    }
  },
  mounted() {
    let self = this
    window.onscroll = function() {
      if (
        self.getScrollTop() + self.getClientHeight() >=
        self.getScrollHeight()
      ) {
        self.$emit('loadmore', true)
      }
    }
  }
}
</script>

<style>
</style>