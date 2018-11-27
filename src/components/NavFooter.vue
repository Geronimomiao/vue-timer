<template>
  <div id="nav_footer">
    <el-row>
      <el-col :span="12">
        <div class="item" :class="[flag?'selected':'unselected']">
          <span class="el-icon-date" @click="list">清单列表</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item" :class="[!flag?'selected':'unselected']">
          <span class="el-icon-service" @click="info">个人中心</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "NavFooter",
    data() {
      return {
        flag: true
      }
    },
    methods: {
      info() {
        this.$router.push({path: '/index/user'})
        this.flag = false
      },
      list() {
        this.$router.push({path: '/index'})
        this.flag = true
      }
    }
  }
</script>

<style lang="stylus">
  #nav_footer
    position: absolute
    bottom: 0
    width: 100%

    .item
      height: 4rem
      text-align: center

      span
        line-height: 4rem
        font-size: 1.7rem
        color: #999
    .selected
      background: #d3dce6;

    .unselected
      background: #e5e9f2;

</style>
