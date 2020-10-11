<template>
  <div class="pretty-empty">
    <img src="../../assets/images/empty.png" alt="">
    <p>{{emptyText}}</p>
  </div>
</template>

<script>
export default {
  props: {
    emptyText: {
      type: String,
      default: '哎呀，这里什么都没有~'
    }
  }
}
</script>

<style>
.pretty-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.pretty-empty img {
  width: 300px;
}
</style>