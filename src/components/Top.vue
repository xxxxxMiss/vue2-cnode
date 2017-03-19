<template lang="pug">
  .gotop(@click="goTop")
    i.iconfont.icon-gotop
</template>

<script>
  export default {
    methods: {
      goTop(){
        this.$emit('go-top')
      }
    }
  }
</script>

<style lang="stylus">
  @import './Top.stylus'
</style>