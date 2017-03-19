<template lang="pug">
  .page.publish-page
    v-header(v-bind:showBack="false" content="发布主题")
    .item
      .title 标题
      input(placeholder="字数不得少于10个字" v-model="title")
    .item
      .title 所属类别
      select(v-model="tab")
        option(v-for="(item, index) in categorys" v-bind:value="item.key") {{item.tab}}
    .item
      .title 发布内容
      textarea(placeholder="请输入发布内容" v-model="content")
    .item: button(@click="publishTopic") 发布
</template>

<script>
  import mixin from '../mixins'
  import { mapActions } from 'vuex'

  export default {
    name: 'publish',
    data(){
      return {
        categorys: [{
          tab: '分享',
          key: 'share'
        }, {
          tab: '问答',
          key: 'ask'
        }, {
          tab: '招聘',
          key: 'job'
        }],
        tab: 'share',
        title: '',
        content: '',
      }
    },
    methods: {
      ...mapActions(['createTopic']),
      publishTopic(){
        if(!this.title.trim() || this.title && this.title.trim().length < 10) return this.showToast({ msg: '标题字数不能少于10个字' })
          
        if(!this.content) return this.showToast({ msg: '主题内容不能为空' })
   
        this.createTopic({
          accesstoken: this.user.accesstoken,
          title: this.title,
          tab: this.tab,
          content: this.content
        }).then(res => {
          this.$router.push('/index')
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import './Publish.stylus'
</style>