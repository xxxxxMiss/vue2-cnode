<template lang="pug">
  .wapper.markdown-body
    .top
      .user-info
        img(v-bind:src="item.author.avatar_url")
        .desc
          span.name {{item.author.loginname}}
          .text
            span.publish-date {{item.create_at | formatDate}}
      .action
        i.iconfont.icon-zan(@click="ups")
        span.text(v-bind:class="{'show': upsLength}") {{upsLength}}
        i.iconfont.icon-message(@click="comment")
    .content(v-html="item.content")
    .comment-box(v-if="commentActive")
      textarea(v-model="commentContent" ref="textarea")
      button(@click="submitComment") 回复
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      item: {
        type: Object,
        default(){
          return {}
        }
      },
      topic_id: { // 该帖子的id
        type: String,
        required: true
      },
      author_id: { // 发该帖子的作者id
        type: String,
        required: true
      }
    },
    data(){
      return {
        commentActive: false,
        commentContent: `@${this.item.author.loginname} `,
        upsLength: this.item.ups.length
      }
    },
    methods: {
      ...mapActions(['upComment', 'createComment']),
      comment(){
        this.requestAuth(() => {
          this.commentActive = true
          // 更新的下一轮获取该元素
          this.$nextTick(() => {
            this.$refs.textarea.focus()
          })
        })
      },
      submitComment(){
        if(!this.commentContent.trim()) return this.showToast({
          msg: '评论内容不能为空',
          position: 'center'
        })
        this.createComment({
          accesstoken: this.user.accesstoken,
          content: this.commentContent,
          topic_id: this.topic_id, // 帖子id
          reply_id: this.item.id // 该条评论的id
        }).then(res => {
          if(res.success != true) return this.showToast(res.error_msg)

          // 评论成功之后立马显示评论
          let {avatar_url, loginname} = this.user
          let comment = {
            id: this.topic_id,
            author: { avatar_url, loginname },
            create_at: new Date(),
            content: this.commentContent,
            ups: [],
            reply_id: res.reply_id
          }
          
          // this.$emit('reply-comment', comment)

          this.$root.detailVm && this.$root.detailVm.theme.replies.push(comment)
  
          this.commentContent = '' // 评论成功，清除之前填写的评论内容
          this.commentActive = false
        })
      },
      ups(){
        this.requestAuth(() => {
          if(this.author_id === this.user.id) 
            return this.showToast({ msg: '呵呵，不能为自己点赞', position: 'center' })
          // 为评论点赞
          this.upComment({
            reply_id: this.item.id,
            accesstoken: this.user.accesstoken
          }).then(res => {
            if(res.success != true) return this.showToast(res.error_msg)
            
            if(res.action === 'up') this.upsLength += 1
            else this.upsLength -= 1
          })
        })
      }
    }
  }
</script>


<style lang="stylus">
  @import './CommentItem.stylus'
</style>