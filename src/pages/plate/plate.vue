<template>
  <el-container style="height: 100%">
    <el-header>
      <Header :message="message"></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <Main>
        </Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { testUser } from '@/network/plate.js'
import Header from './header.vue'
import Aside from './aside.vue'
import Main from './main.vue'

export default {
  data() {
    return {
      message: '',
    };
  },
  components: {
    Header,
    Aside,
    Main
  },
  created() {
    testUser().then(res => {
      this.message = res;
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.el-header {
  background-color: #f56c6c;
  color: #fff;
  text-align: center;
  height: 80px!important;
  line-height: 80px;
  padding: 0
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}
.el-main {
  background-color: #fff;
  color: #333;
}
</style>
