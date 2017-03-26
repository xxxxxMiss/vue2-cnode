<template lang="pug">
  #app
    router-view
    v-footer
    loading
    transition(name="modal")
      component(v-bind:is="topicView" ref="topic")
    transition(name="login" @after-enter="afterLoginEnter")
      component(v-bind:is="loginView" ref="login")
    transition(name="toast")
      component(v-bind:is="toastView")
</template>

<script>
import Vue from 'vue'
import VFooter from './components/VFooter.vue'
import config from './config'

export default {
  name: 'app',
  data(){
    return {
      menus: config.menus,
    }
  },
  methods: {
    // 由于对组件使用了过渡，所以此处通过过渡钩子函数实现自动获得焦点
    // 不然可以通过自定义指令获得焦点更加的方便
    afterLoginEnter(){
      this.$refs.login.$refs.input.focus()
    }
  },
  components: {
    VFooter,
  }
}
</script>

<style lang="stylus">
#app
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  overflow: hidden
.page
  position: absolute
  top: 0
  bottom: 56px
  width: 100%
  padding-top: 60px
  overflow: hidden
  overflow-y: auto
  font-size: 1.4rem
  color: #333
</style>
