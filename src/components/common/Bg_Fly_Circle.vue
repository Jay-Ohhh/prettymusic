<template>
  <!-- 漂浮圆圈背景 -->
  <div>
    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.fly {
  pointer-events: none;
  position: fixed;
  z-index: 100;
  border-radius: 50%;
}
.bg-fly-circle1 {
  top: 100px;
  left: 40px;
  width: 100px;
  height: 100px;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.07) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  animation: move 2.5s linear inifnite;
}
.bg-fly-circle2 {
  top: 60%;
  left: 3%;
  width: 150px;
  height: 150px;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.08) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  animation: move 3s linear inifnite;
}
.bg-fly-circle3 {
  top: 140px;
  right: 2%;
  width: 145px;
  height: 145px;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.1) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  animation: move 2.5s linear inifnite;
}
.bg-fly-circle4 {
  top: 60%;
  right: 5%;
  width: 160px;
  height: 160px;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.02) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  animation: move 3.5s linear inifnite;
}
@keyframes move {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(25px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>