<template>
  <div id="login">
    <div class="form">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="手机号">
          <el-input v-model="phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="sub">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "login",
    data() {
      return {
        phoneNumber: '',
        password: ''
      }
    },
    methods: {
      login() {
        var params = {
          phoneNumber: this.phoneNumber,
          password: this.password
        }
        this.axios.post('/api/users/login', params).then(res => {
          var status = res.data.status
          if (status == 0) {
            this.$router.push({path: '/auth'})
          } else {
            this.$notify({
              title: '提示',
              message: '请检查用户名和密码',
              offset: 200
            })
          }
        })
      },
    }
  }
</script>

<style lang="stylus">

  #login
    .sub
      text-align: right

</style>
