<template lang="pug">
  .page.detail-page
    .header(ref="header") 主题
      .btn-back(@click="dismissModal")
      .more(@click="showMenu")
        i.iconfont.icon-menu
    transition(name="popover")
      .popover-backdrop(v-show="isMenuShow" @click="hideMenu")
          .popover-wrapper
            li(@click="share")
              i.iconfont.icon-share
              span 分享
            li(@click="toggleCollect")
              i.iconfont.icon-collect
              span {{collectText}}
    .detail-content(v-top="")
      .theme-header
        .info
          img(v-bind:src="theme.author.avatar_url")
          .text
            .name {{theme.author.loginname}}
            .publish-time
              | 发布于：{{theme.create_at | formatDate}}&nbsp;&nbsp;{{theme.visit_count}}次浏览
        .type
          i.iconfont.icon-top(v-if="theme.top")
          i.iconfont.icon-better(v-if="theme.good")
      .theme-title {{theme.title}}
      .theme-content.markdown-body(v-html="theme.content")
      .theme-comment(v-if="theme.replies.length") 评论数: {{theme.replies.length}}
      comment-item(v-for="(item, index) in theme.replies" 
        v-bind:item="item" v-bind:topic_id="theme.id" 
        v-bind:author_id="theme.author_id"
        ref="comment" v-bind:key="index")
      section.comment-box
        textarea(v-model="commentContent")
        button(@click="submitComment") 评论
</template>

<script>
  import CommentItem from './CommentItem.vue'
  import { mapActions } from 'vuex'
  import { share2Weibo } from '../common/js/util'

  export default {
    name: 'topic',
    components: { CommentItem },
    data(){
      return {
        theme: {},
        commentContent: '',
        isMenuShow: false,
      }
    },
    computed: {
      isCollect(){
        return this.theme.is_collect
      },
      collectText(){
        return this.isCollect ? '取消收藏' : '收藏'
      }
    },
    methods: {
      ...mapActions(['createComment', 'collectTopic', 'delCollect']),
      share(){
        share2Weibo(location.href, 
          document.querySelector('meta[name=description]').getAttribute('content'),
          this.theme.author.avatar_url, '')
      },
      toggleCollect(){
        // 自己可以收藏自己的帖子
        this.requestAuth(() => {

          if(this.isCollect){
            // 取消收藏
            this.delCollect({accesstoken: this.user.accesstoken, topic_id: this.theme.id})
              .then(res => {
                if(res.success != true) return this.showToast(res.error_msg)

                this.showToast({ msg: '已取消收藏', position: 'center' })
                this.theme.is_collect = false
              })
          }else{
            // 收藏
            this.collectTopic({accesstoken: this.user.accesstoken, topic_id: this.theme.id})
              .then(res => {
                if(res.success != true) return this.showToast(res.error_msg)
                  
                this.showToast({ msg: '收藏成功', position: 'center' })
                this.theme.is_collect = true
              })
          }
        })
      },
      showMenu(){
        this.isMenuShow = true
      },
      hideMenu(){
        this.isMenuShow = false
      },
      dismissModal(){
        this.dismissDetailModal(() => {
          this.$root.mineCollectVm 
            && (this.$root.mineCollectVm.collecteds = this.user.collect)
          // 避免$root上挂载太多其他vm实例
          delete this.$root.mineCollectVm
        })
      },
      submitComment(){
        this.requestAuth(() => {
          if(!this.commentContent.trim()) return this.showToast({
            msg: '评论内容不能为空',
            position: 'center'
          })
          this.createComment({
            accesstoken: this.user.accesstoken,
            content: this.commentContent,
            topic_id: this.theme.id,
            reply_id: ''
          }).then(res => {
            // 评论成功之后立马显示评论
            let {avatar_url, loginname} = this.user
            let comment = {
              id: this.theme.id,
              author: { avatar_url, loginname },
              create_at: new Date(),
              content: this.commentContent,
              ups: []
            }
            this.theme.replies.push(comment)

            this.commentContent = '' // 评论成功，清除之前填写的评论内容
          })
        })
      }
    },
    created(){
      this.$root.detailVm = this
      // this.$on('reply-comment', replyObj => {
      //   this.theme.replies.push(replyObj)
      // })
    }
  }
</script>

<style lang="stylus">
  @import './TopicDetail.stylus'
</style>