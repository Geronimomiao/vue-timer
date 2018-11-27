<template>
  <div id="user">
    <nav-header>
      <span slot="bread">用户中心</span>
    </nav-header>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card  shadow="always">
          <img src="../../static/img/test.jpg" class="image">
          <div style="padding: 14px;">
            <div class="nickname">
              <span>好吃的汉堡</span>
            </div>
            <div class="text item"> <span>姓名:</span> <span>Time Lord</span></div>
            <div class="text item"> <span>身份:</span> <span>{{ user.nickname }}</span></div>
            <div class="text item"> <span>联系方式:</span> <span>{{ user.phoneNumber }}</span></div>
          </div>
          <el-row>
            <el-col :span="3" :offset="14">
              <el-button type="danger" size="mini" class="button" @click="logout">注销<i class="el-icon-caret-right"></i></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "user",
    date() {
      return {

      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      logout() {
        this.axios.post('/api/users/logout').then(res => {
          var status = res.data.status
          if (status == 0) {
            this.$notify({
              title: '提示',
              message: '注销成功',
              offset: 200
            });
            this.$router.push({path: '/auth'})
          }
        })
      }
    },

  }

</script>

<style lang="stylus">
  #user
    .el-row
      margin-top: 3rem
    .nickname
      text-align: center
      margin-bottom: 0.4rem
    .image
      width: 100%;
      display: block;
    .text
      font-size: 14px;
      line-height: 14px
      display: flex
      text-align: center
      span
        flex 1
    .item
      padding-top: 10px
    .button
      display: inline-block
      width: 64px
      margin-left: 25px
</style>
