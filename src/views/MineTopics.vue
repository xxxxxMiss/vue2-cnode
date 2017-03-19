<template lang="pug">
  .page.my-topic-page
    v-header(content="我的发布")
    div(v-if="mineTopics.length")
      .wapper(v-for="item in mineTopics" @click="clickItem(item.id)")
        .top
          .user-info
            img(v-bind:src="item.author.avatar_url")
            .desc
              span.name {{item.author.loginname}}
              .text
                span.publish-date 发布时间：{{item.last_reply_at | formatDate}}
          .category
            i.iconfont.icon-better(v-if="item.good")
            i.iconfont.icon-top(v-if="item.top")         
        .content {{item.title}}
    .no-data(v-else)
      img(v-bind:src="'img/nodata@2x.png' | assets")
      .no-data-text 暂无相关数据
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data(){
      return {
        mineTopics: []
      }
    },
    methods: {
      ...mapActions(['fetchUserInfo', 'fetchTopicDetail']),
      clickItem(id){
        this.fetchTopicDetail({ id, accesstoken: this.user.accesstoken }).then(res => {
          this.showDetailModal({theme: res})
        })
      }
    },
    created(){
      this.fetchUserInfo(this.user.loginname).then(res => {
        this.mineTopics = res.recent_topics
      })
    }
  }
</script>

<style lang="stylus">
  @import './MineTopics.stylus'
</style>