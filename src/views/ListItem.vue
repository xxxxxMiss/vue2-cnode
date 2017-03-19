<template lang="pug">
  .wapper(@click="clickItem")
    .top
      .user-info
        img(v-bind:src="item.author.avatar_url")
        .desc
          span.name {{item.author.loginname}}
          .text
            span.publish-date {{item.create_at | formatDate}}
            | 来自
            span.type {{item.tab | filterCategory}}
      .category
        i.iconfont.icon-better(v-if="item.good")
        i.iconfont.icon-top(v-if="item.top")         
    .content {{item.title}}
    .count-info
      .item
        i.iconfont.icon-liulan
        span {{item.visit_count}}
      .item
        i.iconfont.icon-message
        span {{item.reply_count}}
      .item 
        span {{item.last_reply_at | formatDate}}
</template>

<script>
  export default {
    name: 'list-item',
    props: {
      item: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      clickItem(){
        this.$emit('item-click', this.item.id)
      }
    }
  }
</script>

<style lang="stylus">
  @import './ListItem.stylus'
</style>