<template>
  <div class="banner" v-if="bannerLength">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item,index) in banner" :key="index">
        <img :src="item.imageUrl" alt="">
      </swiper-slide>
    </swiper>
    <!--分页器 如果放置在swiper-container外面，需要自定义样式 -->
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'

export default {
  name: 'banner',
  data() {
    return {
      banner: [],
      // swiper v4.1.1 API文档：https://www.swiper.com.cn/api/index.html
      swiperOptions: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
        },
        slidesPerView: 3, //设置slider容器能够同时显示的slides数量(carousel模式)
        slidesPerGroup: 3, //在carousel mode下定义slides的数量多少为一组
        spaceBetween: 30, //在slide之间设置距离（单位px）。
        loop: true, //循环模式
        loopFillGroupWithBlank: true, //在loop模式下，为group填充空白slide
        // centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左
        grabCursor: true, //该选项给Swiper用户提供小小的贴心应用，设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        pagination: {
          el: '.swiper-pagination', //分页器容器的css选择器或HTML标签
          clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    bannerLength() {
      return this.banner.length ? true : false
    }
  },
  methods: {
    async getBanner() {
      const res = await this.$api.getBanner()
      this.banner = res.banners
    }
  },
  created() {
    this.getBanner()
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  .swiper-slide {
    img {
      border-radius: 3px;
    }
  }
}
.banner ::v-deep .swiper-pagination {
  position: absolute;
  bottom: -20px;
  width: 100%;
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    margin: 0 5px;
    border-radius: 50%;
    opacity: 0.8;
    background-color: #a3a3ac;
  }
  .swiper-pagination-bullet:focus {
    outline: none;
  }
  .swiper-pagination-bullet-active {
    width: 15px;
    height: 6px;
    border: 0;
    border-radius: 4px;
    background: #fa2800;
    opacity: 1;
  }
}
</style>