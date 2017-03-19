<template lang="pug">
  header(v-bind:style="headerBGColor")
    .back(@click="goback" v-bind:style="back")
      i.iconfont.icon-arrow-round-left
    .content {{content}}
    .menu(@click="action" v-bind:style="menu")
      i.iconfont.icon-share
</template>

<script>
  export default {
    name: 'header',
    props: {
      showMenu: {
        type: Boolean,
        default: false
      },
      bgColor: String,
      showBack: {
        type: Boolean,
        default: true
      },
      content: String
    },
    computed: {
      menu(){
        return {
          'visibility': this.showMenu ? 'visible' : 'hidden'
        }
      },
      back(){
        return {
          'visibility': this.showBack ? 'visible' : 'hidden'
        }
      },
      headerBGColor(){
        return {
          'background-color': this.bgColor ? this.bgColor : '#2594e9'
        }
      }
    },
    data(){
      return {

      }
    },
    methods: {
      goback(){
        if(this.$router){
          this.$router.back()
        }
        this.$emit('back')
      },
      action(){
        console.log('------')
      }
    }
  }
</script>

<style lang="stylus">
  @import './VHeader.stylus'
</style>