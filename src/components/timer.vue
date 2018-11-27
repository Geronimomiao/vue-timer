<template>
  <div id="timer">
    <nav-header>
      <span slot="bread">我的清单</span>
    </nav-header>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card  shadow="always" class="card" >
          <el-collapse v-for="(item, index) in this.user.timerlist" accordion v-model="activeName">
            <div @click="change(index)">
              <el-collapse-item :title="item.title" :name="index">
                <div>{{ item.msg }}</div>
                <div class="img" v-for="i in item.imgs">
                  <img :src="i">
                </div>
                <div class="select">
                  <el-row>
                    <el-button type="primary" :loading="true" size="mini">剩{{time}}天</el-button>
                    <el-button icon="el-icon-search" circle size="mini" @click="menu"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="drop"></el-button>
                  </el-row>
                </div>
              </el-collapse-item>
            </div>
          </el-collapse>
          <div class="List" @click="createList">
            <div class="createList">
              <i class="el-icon-plus"></i>
            </div>
            <div class="msg">
              <h3>点击即可创建清单</h3>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "timer",
    data() {
      return {
        i: 0,
        activeName: '1'
      }
    },
    computed: {
      ...mapState(['user']),
      time: function () {
        var now = Date.now()
        var final = Date.parse(this.user.timerlist[this.i].finaltime)
        var left = (final - now)/(1000*60*60*24)
        left = left.toFixed(1)
        return left
      }
    },
    methods: {
      createList() {
        this.$router.push({path: '/index/createList'})
      },
      change(index) {
        this.i = index
      },
      drop() {
        var param = {
          id: this.user.timerlist[this.i]._id
        }
        this.axios.post('/api/messages/delete', param).then(res => {
          var status = res.data.status
          if (status == 0) {
            this.$router.push({path: '/auth'})
            this.$notify({
              title: '提示',
              message: '删除成功',
              offset: 200
            })
          }
        })
      },
      menu() {
        this.$router.push({path: '/index/menu', query: {title: this.user.timerlist[this.i].title}})
      }
    }
  }
</script>

<style lang="stylus">

  #timer
    ::-webkit-scrollbar
      display:none
    .card
      height: 26rem
      margin-top: 3.7rem
      text-align: center
      overflow: auto
      .el-collapse
        text-align: left
        .img
          margin-top: 0.5rem
          width: 3rem
          height: 3rem
          display: inline-block
          margin-right: 0.7rem
          img
            width: 100%
            height: 100%
        .select
          margin-top: 0.5rem
          text-align: right
      .el-collapse-item__content
        padding-bottom: 0.5rem
      .List
        .createList
          margin-top: 0.5rem
          background-color: #fbfdff;
          border: 1px dashed #c0ccda;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 148px;
          height: 148px;
          line-height: 146px;
          vertical-align: top;
          display: inline-block;
          cursor: pointer;
          outline: 0;
        .msg
          h3
            margin-top: 0.5rem
            font-size: 0.8rem
            color: #999999

</style>
