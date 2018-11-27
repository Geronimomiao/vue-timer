<template>
  <div id="auth">
    <nav-header>
      <span slot="bread">Refrigerator Helper</span>
    </nav-header>
    <div class="avatar">
      <div class="img"></div>
      <router-view></router-view>
      <div class="submit" v-if="flag">
        <el-button-group>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary">or</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </el-button-group>
      </div>
      <div class="msg">
        <h2>冰箱提醒</h2>
        <h4>您的食品保鲜助手</h4>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "Auth",
    data() {
      return {
        flag: true
      }
    },
    updated() {
      this.checklogin()
    },
    mounted() {
      this.checklogin()
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      checklogin() {
        this.axios.post('/api/users/checkLogin').then(res => {
          var status = res.data.status
          if (status == 0) {
            this.$router.push({path: '/index'})
          }
          this.$store.commit('updateUserInfo', res.data.result.user)
          console.log(res.data.result.user)
        })
      },
      login() {
        this.flag = false
        this.$router.push({path: '/auth/login'})
      },
      register() {
        this.flag = false
        this.$router.push({path: '/auth/register'})
      }
    },

  }
</script>

<style lang="stylus">

  #auth
    .avatar
      text-align: center

      .img
        border-radius 50%
        margin auto
        margin-top: 4rem
        height: 8rem
        width: 8rem
        background-size: cover
        background-repeat: no-repeat left top
        background-size: 100% 100%;
        background-image: url('../../static/img/avatar.jpg')

    .form
      margin auto
      margin-top: 3rem
      width: 18rem

    .submit
      margin-top: 2rem

    .msg
      margin-top: 2rem
      text-align: center
      color: #999999
      h2
        font-size: 2.5rem
      h4
        margin-top: 0.8rem
        font-size: 1.5rem


</style>
