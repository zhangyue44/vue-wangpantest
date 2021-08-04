<template>
  <div class="container">
    <el-breadcrumb v-for="(item, index) in breadcrumbList" :key="index" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

export default {
  data() {
    return {
      breadcrumbList: ["首页", "活动管理", "活动列表", "活动详情"],
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  ::v-deep .el-breadcrumb__separator {
    display: inline-block!important;
  }
}
</style>
