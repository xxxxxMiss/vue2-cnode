<template lang="pug">
  v-touch(v-on:swipeleft="swipe" v-on:swiperight="swipe")
    .page.message-page
      v-header(v-bind:showBack="false" v-bind:content="headerTitle")
      .page-content
        transition(name="msg" @enter="enter" @after-leave="afterLeave")
          .container(v-show="toggleMessage")
            .wapper(v-for="item in hasReadMessages" @click="showDetail(item.topic.id)")
              .info
                .user-info
                  img(v-bind:src="item.author.avatar_url")
                  .desc {{item.author.loginname}}{{item.type === 'at' ? '在回复中@了您' : '回复了您的话题'}}
                .date {{item.reply.create_at | formatDate}}
              .content 话题：{{item.topic.title}}
            .no-data(v-if="hasReadMessages.length < 1")
              img(v-bind:src="'img/nodata@2x.png' | assets")
              .no-data-text 暂无相关数据
        transition(name="msg" @enter="enter" @after-leave="afterLeave")
          .container(v-show="!toggleMessage")
            .wapper(v-for="item in notReadMessages" @click="showDetail(item.topic.id)")
              .info
                .user-info
                  img(v-bind:src="item.author.avatar_url")
                  .desc {{item.author.loginname}}{{item.type === 'at' ? '在回复中@了您' : '回复了您的话题'}}
                .date {{item.reply.create_at | formatDate}}
              .content 话题：{{item.topic.title}}
            .no-data(v-if="notReadMessages.length < 1")
              img(v-bind:src="'img/nodata@2x.png' | assets")
              .no-data-text 暂无相关数据
      transition(name="tips" @after-enter="tipsAfterEnter")
        .rotate-tips(v-show="showTips")
          div(v-for="item in texts") {{item}}
          .unread-msg(v-if="unreadMsgCount") {{unreadMsgCount}}
</template>


<script>
  import { mapActions } from 'vuex'

  export default {
    data(){
      return {
        hasReadMessages: [],
        notReadMessages: [],
        toggleMessage: true,
        showTips: true,
        texts: ['左', '右', '滑', '动', '试', '试']
      }
    },
    computed: {
      headerTitle(){
        return this.toggleMessage === true ? '已读消息' : '未读消息'
      },
      unreadMsgCount(){
        return this.notReadMessages.length > 99 ? '99+' : this.notReadMessages.length
      }
    },
    methods: {
      ...mapActions(['fetchAllMessages', 'fetchTopicDetail']),
      showDetail(id){
        this.fetchTopicDetail({ id, accesstoken: this.user.accesstoken }).then(res => {
          if(res instanceof Error) return this.showToast({
            msg: '该话题不存在或者已被删除',
            position: 'center'
          })

          this.showDetailModal({ theme: res })
        })
      },
      swipe(){
        this.toggleMessage = !this.toggleMessage
      },
      enter(){
        this.showTips = false
      },
      afterLeave(){
        this.showTips = true
      },
      tipsAfterEnter(){
        setTimeout(() => {
          this.enter()
        }, 3000)
      }
    },
    created(){
      this.fetchAllMessages({ accesstoken: this.user.accesstoken })
        .then(res => {
          this.hasReadMessages = res.has_read_messages
          this.notReadMessages = res.hasnot_read_messages
        })
    }
  }
</script>


<style lang="stylus">
  @import './Message.stylus'
</style>