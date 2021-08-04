<template>
   <div class="largebox">
     <div class="imagebox"><img src="@/assets/image/wangpan.png" class="box-image"></div>
     <div class="text">天目网盘</div>
     <div class="denglu">您好! {{message}} 欢迎登陆</div>
   </div>
</template>

<script>

export default {
  props: {
    message: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.largebox {
  display: flex;
  height: 100%;
  .imagebox {
    width: 200px;
    line-height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .box-image {
      width: 50px;
      height: 50px;
    }
  }
  .text {
    flex: 1;
    font-size: 24px;
  }
  .denglu {
    width: 200px;
    font-size: 16px;
  }
}
</style>
