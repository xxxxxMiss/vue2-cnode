<template lang="pug">
  .page.login-page
    .header 登陆
      .btn-back(@click="dismissModal")
    input(placeholder="请输入accesstoken" v-model="accesstoken" ref="input")
    button(@click="login") 登陆
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {
        accesstoken: '',
        loading: true
      }
    },
    methods: {
      login(){
        if(!this.accesstoken) return this.showToast('请输入accesstoken')

        this.g_login({ accesstoken: this.accesstoken }, () => {
          this.dismissLoginModal(() => {
            this.$root.mineVm && this.$root.mineVm.$forceUpdate()
            // 避免$root上挂载太多其他vm实例
            delete this.$root.mineVm
          })
        })
      },
      dismissModal(){
        this.dismissLoginModal()
      }
    }
  }
</script>

<style lang="stylus">
  @import './Login.stylus'
</style>