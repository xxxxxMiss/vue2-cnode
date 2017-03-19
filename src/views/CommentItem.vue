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
        this.$emit('item-comment')
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