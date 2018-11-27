<template>
  <div id="nav_menu">
    <nav-header>
      <span slot="bread">推荐菜单</span>
    </nav-header>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card  shadow="always" class="card" >
          <el-collapse accordion>
            <el-collapse-item v-for="item in this.menu">
              <template slot="title">
               {{ item.title }}
              </template>
              <div>简介： {{ item.tags }}</div>
              <div>配料： {{ item.burden }}</div>
              <el-carousel :autoplay="false" indicator-position="none" :loop="false">
                <el-carousel-item v-for="(info, index) in item.steps">
                  <div class="step">
                    <h3>步骤{{index+1}}</h3>
                    <img :src="info.img" width="206px" height="150px">
                    <h5>{{ info.step }}</h5>
                  </div>

                </el-carousel-item>
              </el-carousel>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "NavMenu",
    data(){
      return {
        menu: ''
      }
    },
    mounted() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        var title = this.$route.query.title
        var url = '/menu/cook/query?key=b684ebfc809ef973cd916e3805af79fe&rn=10&pn=3&menu=' + title
        this.axios.get(url).then(res => {
          console.log(res)
          if (res.data.resultcode == 200) {
            this.menu = res.data.result.data
          } else {
            this.$notify({
              title: '提示',
              message: '请将标题换成准确食材名再来试试',
              offset: 200
            });
            this.$router.push({path: '/index'})
          }
        })
      }
    }
  }
</script>

<style lang="stylus">

  #nav_menu
    ::-webkit-scrollbar
      display:none
    .card
      height: 26rem
      margin-top: 3.7rem
      text-align: left
      overflow: auto
      .el-carousel__container
        height: 15rem
      .el-carousel__item
        border-radius 10%
        .step
          text-align: center
          h3
            background-color: rgba(126, 214, 215, 0.2)
      .el-carousel__item:nth-child(n)
       background-color: rgba(101, 156, 230, 0.2);



</style>
