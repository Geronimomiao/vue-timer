<template>
  <div id="createList">
    <nav-header>
      <span slot="bread">创建清单</span>
    </nav-header>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card shadow="always" class="card">
          <div class="createList">
            <el-row type="flex"  justify="center">
              <el-col :span="20">
                <div class="title">
                  <el-input v-model="timerlist.title" placeholder="请输入储存食物名称"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-date-picker
                  class="time"
                  v-model="timerlist.finaltime"
                  type="datetime"
                  placeholder="选择截止时间">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                  <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="请添加一些提示信息（可选添）" v-model="timerlist.msg"></el-input>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="20">
                <div @click="">
                  <el-upload
                    :action="actionPath"
                    :on-success="handleSuccess"
                    list-type="picture-card"
                    :data="postData"
                    :limit="2"
                    :on-exceed="handleExceed"
                    class="msg-img"
                  >
                    <i class="el-icon-plus padding-plus" @click="getToken"></i>
                  </el-upload>
                </div>
              </el-col>
            </el-row>
            <div class="sub">
              <el-button type="primary" @click="sub">Create it!</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import uuid from 'uuid'
  import {mapState} from 'vuex'

  export default {
    name: "createList",
    data() {
      return {
        postData: {
          token: '',
          key: ''
        },
        actionPath: 'https://up-z1.qiniup.com',
        timerlist: {
          msg: '',
          title: '',
          imgs: [],
          finaltime: ''
        },
        activeName: '1'
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      getToken() {
        var key = 'timer/' + uuid.v4()
        this.postData.key = key
        var param = {
          key: key
        }
        this.axios.post('/api/getToken', param).then(res => {
          // console.log(res.data.result)
          this.postData.token = res.data.result;
          // return next
        })
      },
      handleSuccess(res) {
        var url = 'http://pimxar668.bkt.clouddn.com/'
        var imgurl = url + res.key
        this.timerlist.imgs.push(imgurl)
      },
      handleExceed(files, fileList) {
        this.$notify({
          title: '警告',
          message: '一次最多只能提交2张图片',
          offset: 46
        });
      },
      sub() {
        var param = {
          timerlist: this.timerlist
        }
        this.axios.post('/api/messages/add', param).then(res => {
          var status = res.data.status
          if (status == 0) {
            this.$router.push({path: '/index'})
            this.$notify({
              title: '提示',
              message: '清单创建成功',
              offset: 46
            });
          }
          this.$store.commit('updateUserInfo', res.data.result)
          this.$router.push({path: '/index'})
        })
      }
    }
  }
</script>

<style lang="stylus">
  #createList
    .card
      height: 26rem
      margin-top: 3.7rem
      .createList
        text-align: center
        .title
          margin-bottom: 0.5rem
        .time
          width: 100%
          margin-bottom: 0.5rem
        .msg-img
          text-align: left
          margin-top: 0.8rem
          margin-bottom: 0.8rem
          i
            display: none
          .padding-plus
            display: inline-block
            font-size: 20px
          .el-upload--picture-card, .el-upload-list--picture-card, .el-upload-list__item
            width: 3rem !important
            height: 3rem !important
            line-height: 3rem !important


        .sub
          width: 173px
          margin: auto
          text-align: right

</style>
