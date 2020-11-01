<template>
  <!-- 页脚 -->
  <div class="footer">
    <!-- container的样式已在common.css中写好 -->
    <div class="container">
      <p class="title">prettymusic</p>
      <p class="desc">{{oneSentence}}</p>
      <!-- 两个图标 -->
      <div class="social flex-row">
        <router-link to="/home">
          <i class="iconfont nicewangyiyunyinle"></i>
        </router-link>
        <a href="https://gitee.com/Jay_Ohhh/prettrymusic" target="_blank">
          <i class="iconfont niceicon_githubb"></i>
        </a>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        <p>
          <span>Copyright © 2020
            <span v-if="currentYear!==2020">-{{currentYear}}</span>
          </span>
          <a href="https://gitee.com/Jay_Ohhh" target="_blank">Jay_Ohhh</a>
          All rights reserved.
          <span>Designed by <a href="https://www.lxhcool.cn/"
              target="_blank">lxhcool</a> & Improved by <a
              href="https://gitee.com/Jay_Ohhh" target="_blank">Jay_Ohhh.</a>
          </span><br />
        </p>
        <a class="project-address"
          href="https://gitee.com/Jay_Ohhh/prettrymusic" target="_blank">
          prettymusic项目地址
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 当前年份
      currentYear: new Date().getFullYear(),
      // 网络语句
      oneSentence: ''
    }
  },
  created() {
    this.getOneSentence()
    setInterval(() => {
      this.getOneSentence()
    }, 5000)
  },
  methods: {
    // 获取网络语句
    async getOneSentence() {
      const params = {
        c: 'f', // 网络语句
        min_length: 30 // 语句最少字数
      }
      const res = await axios.get('https://v1.hitokoto.cn/', { params })
      if (res.status === 200) {
        let hitokoto = res.data.hitokoto
        // 如果最后一个字符不是句号则加上句号
        if (hitokoto.charAt(hitokoto.length - 1) !== '。') {
          hitokoto = hitokoto + '。'
        }
        this.oneSentence = hitokoto + '  -- ' + res.data.creator
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: #161e27;
  .container {
    padding: 30px 0;
    .title {
      display: flex;
      align-items: center;
      height: 18px;
      padding: 10px;
      margin-bottom: 15px;
      border-left: 3px solid #fa2800;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 1px;
      color: #fff;
    }
    .desc {
      padding: 0 10px;
      font-size: 14px;
      color: #6d7685;
    }
    .social {
      margin-top: 20px;
      padding: 0 10px;
      a {
        position: relative;
        display: inline-block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        margin-right: 10px;
        border-radius: 50%;
        color: #6d7685;
        font-size: 14px;
        text-align: center;
        background-color: #232a31;
        transition: color 0.3s, background-color 0.3s;
        &:hover {
          color: #ccc;
          background-color: #11181f;
        }
      }
    }
  }
  .copyright {
    border-top: 1px solid #232a31;
    color: #6d7685;
    .container {
      padding: 20px 10px 30px;
      a {
        color: #5829a3;
      }
      .project-address {
        display: inline-block;
        margin-top: 5px;
      }
    }
  }
}
</style>