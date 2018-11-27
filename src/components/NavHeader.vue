<template>
  <div id="nav_header">
    <slot name="bread"></slot>
  </div>
</template>

<script>
  export default {
    name: "NavHeader"
  }
</script>

<style lang="stylus">

  #nav_header
    text-align: center
    height: 3rem
    line-height: 3rem
    background-color:  #d3dce6

</style>
