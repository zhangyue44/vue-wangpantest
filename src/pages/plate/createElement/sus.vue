<template>
  <div>
    这是一段插值内容
    <p>烦死了</p>
    <p>{{ msg }}</p>
    <div>hahah</div>
    <div>test</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
    },
  },
};
</script>
