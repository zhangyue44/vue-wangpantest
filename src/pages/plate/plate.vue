<template>
  <div class="container">
    {{message}}
  </div>
</template>

<script>
import { testUser } from '@/network/plate.js'

export default {
  data() {
    return {
      message: '',
    };
  },
  created() {
    this.message = this.$route.params.user;
    testUser('/' + this.$route.params.user).then(res => {
      console.log('3333', res);
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="less">

</style>
