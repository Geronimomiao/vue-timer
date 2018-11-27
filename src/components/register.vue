<template>
  <div id="register">
    <div class="form">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="手机号">
          <el-input v-model="phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="verifyCode"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="sub">
        <el-button type="primary"  v-if="!flag" @click="getCode">获取验证码</el-button>
        <el-button type="primary" :loading="flag" v-if="flag">短信已发送</el-button>
        <el-button type="primary" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "register",
    data() {
      return {
        flag: false,
        phoneNumber: '',
        verifyCode: '',
        password: ''
      }
    },
    methods: {
      register() {
        var params = {
          phoneNumber: this.phoneNumber,
          password: this.password,
          verifyCode: this.verifyCode
        }
        this.axios.post('/api/users/register', params).then(res => {
          var status = res.data.status
          if (status == 0) {
            this.$router.push({path: '/auth'})
            this.$notify({
              title: '提示',
              message: '注册成功',
              offset: 200
            })
          } else {
            this.$notify({
              title: '提示',
              message: '请检查输入信息',
              offset: 200
            })
          }
        })
      },
      getCode() {
        var params = {
          phoneNumber: this.phoneNumber,
        }
        this.axios.post('/api/users/getCode', params).then(res => {
          var status = res.data.status
          if (status == 1) {
            this.$notify({
              title: '提示',
              message: '请检查输入信息',
              offset: 200
            })
          } else {
            this.flag = true
          }
        })
      }
    }
  }
</script>

<style lang="stylus">

  #register
    .sub
      text-align: right

</style>
