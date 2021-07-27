<template>
  <div class="container">
    <div class="header">
      <span class="title">天目网盘</span>
      <img src="@/assets/image/wangpan.png" class="wpico" />
    </div>
    <div class="errmessage">{{msg}}</div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" :label-position="labelPosition" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="submitLoginForm('loginForm')">用户登录</el-button>
        <el-button type="danger" @click="submitRegisterForm('loginForm')">用户注册</el-button>
        <el-button type="danger" @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registerUser, loginUser } from '@/network/login.js';

export default {
  data() {
    return {
      msg: '',
      labelPosition: 'top',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名密码', trigger: 'blur' }
        ]
      }
      };
  },
  methods: {
    submitLoginForm(formName) {
      this.msg = '';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            name: this.loginForm.username,
            password: this.loginForm.password
          }
          loginUser(params).then(res => {
            this.msg = res.msg;
            console.log(res);
          })
        } else {
          return false;
        }
      });
    },
    submitRegisterForm(formName) {
      this.msg = '';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            name: this.loginForm.username,
            password: this.loginForm.password
          }
          registerUser(params).then(res => {
            this.msg = res.msg;
            console.log(res.msg);
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    width: 400px;
    padding: 20px;
    .header {
      height: 50px;
      margin-bottom: 50px;
      .title {
        line-height: 50px;
        padding: 0 50px 0 80px;
        font-size: 30px;
        color: #d81e06;
      }
      .wpico {
        width: 50px;
        height: 50px;
        vertical-align: bottom;
      }
    }
    .errmessage {
      position: absolute;
      left: 20px;
      top: 102px;
      color: #f56c6c;
      font-size: 14px;
    }
  }
</style>
