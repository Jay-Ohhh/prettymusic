<template>
  <!-- 加载图标 -->
  <div class="loading-icon">
    <div class="loader"></div>
    <span>{{loadingText}}</span>
  </div>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.loading-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.loading-icon span {
  margin-top: -30px;
  font-size: 12px;
}
.loading-icon .loader {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 42px;
  background-color: #fa2800;
}
.loader,
.loader:before,
.loader:after {
  animation: loader 1s ease-in-out infinite;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
@keyframes loader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>