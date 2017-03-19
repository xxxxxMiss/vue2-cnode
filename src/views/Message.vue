<template lang="pug">
  .page.message-page
    v-header(v-bind:showBack="false" content="消息")
    .wapper(v-for="item in hasReadMessages" @click="showDetail(item.topic.id)")
      .info
        .user-info
          img(v-bind:src="item.author.avatar_url")
          .desc {{item.author.loginname}}{{item.type === 'at' ? '在回复中@了您' : '回复了您的话题'}}
        .date {{item.reply.create_at | formatDate}}
      .content 话题：{{item.topic.title}}
</template>


<script>
  import { mapActions } from 'vuex'

  export default {
    data(){
      return {
        hasReadMessages: [],
        notReadMessages: []
      }
    },
    methods: {
      ...mapActions(['fetchAllMessages', 'fetchTopicDetail']),
      showDetail(id){
        this.fetchTopicDetail({ id, accesstoken: this.user.accesstoken }).then(res => {
          this.showDetailModal({ theme: res })
        })
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