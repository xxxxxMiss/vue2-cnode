<template lang="pug">
  .page.mine-page
    .user-info
      router-link.logout(to="/user" @click.native="logout" v-if="user.accesstoken")
        i.iconfont.icon-logout
      .avatar-container
        img(v-bind:src="user.avatar_url" v-if="user.avatar_url").avatar
        img(v-bind:src="'img/moren.png' | assets" v-else).avatar
      .action
        button.btn-login(@click="login" v-if="!user.id") 立即登录
        .name(v-else) {{user.loginname}}
    .mine-enter
      router-link.item(v-bind:to="{name: 'my-collected', params: {loginname: user.loginname}}")
        i.iconfont.icon-collect
        span 我的收藏
      .item
        i.iconfont.icon-message
        span 我的消息


    nav.quickly-enter
      router-link.item(v-for="item in mines" v-bind:to="item.path")
        .left
          i.iconfont(v-bind:class="'icon-' + item.icon")
          span {{item.text}}
        .right
          i.iconfont.icon-arrow-right
</template>

<script>
  import config from '../config'

  export default {
    data(){
      return {
        mines: config.mines
      }
    },
    // computed: {
    //   avatar(){
    //     return this.user.avatar_url ? this.user.avatar_url : assets('img/moren.png')
    //   }
    // },
    methods: {
      login(){
        this.showLoginModal(() => {
          this.$root.mineVm = this
        })
      },
      logout(){
        this.g_logout()
      }
    }
  }
</script>


<style lang="stylus">
  @import './Mine.stylus'
</style>