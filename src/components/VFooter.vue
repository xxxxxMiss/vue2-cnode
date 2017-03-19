<template lang="pug">
  nav.footer
    router-link.item(v-for="item in items" v-bind:to="item.path")
      i.iconfont(v-bind:class="'icon-' + item.icon")
      .text {{item.text}}
</template>

<script>
  import config from '../config'

  export default {
    name: 'footer',
    data(){
      return {
        items: config.menus
      }
    }
  }
</script>

<style lang="stylus">
  @import './VFooter.stylus'
</style>