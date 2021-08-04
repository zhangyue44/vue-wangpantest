<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" active-text-color="#f56c6c" @select="menuSelect">
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title" class="title">全部文件</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-picture"></i>
      <span slot="title" class="title">图片</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title" class="title">文档</span>
    </el-menu-item>
  </el-menu>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
    menuSelect(index, indexPath) {
      console.log(index, indexPath);
    },
  }
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo {
  height: 100%;
  .el-menu-item {
    position: relative;
    margin-top: 30px;
    font-size: 16px;
    .el-icon-menu,
    .el-icon-picture,
    .el-icon-document {
      position: absolute;
      left: 35px;
      top: 20px;
    }
    .title {
      position: absolute;
      top: 0px;
      left: 80px;
    }
  }
}
</style>
