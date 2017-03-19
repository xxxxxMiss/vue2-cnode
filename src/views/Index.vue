<template lang="pug">
  .page.index-page(ref="content" v-top="")
    el-tabs(v-model="value")
      el-tab-pane(label="全部" name="all") 全部
      el-tab-pane(label="精华" name="good") 精华
      el-tab-pane(label="分享" name="share") 分享
      el-tab-pane(label="问答" name="ask") 问答
      el-tab-pane(label="招聘" name="job") 招聘
    list-item(v-for="(item, index) in topics" 
      v-bind:item="item" v-bind:key="index" @item-click="showDetail")
    //- top
</template>

<script>
  import Vue from 'vue'
  import ListItem from './ListItem.vue'
  import Publish from './Publish.vue'
  import Mine from './Mine.vue'
  import { throttle } from '../common/js/util'

  import { mapActions, mapGetters } from 'vuex'

  let LIMIT = 10, scrollTheshold = 0.06

  export default {
    name: 'index',
    data(){
      return {
        value: 'all',
        topics: [],
        scrollH: 0,
        page: 1, // 默认从第一页开始加载
      }
    },
    computed: mapGetters(['user']),
    watch: {
      value(newVal, oldVal){
        this.topics = []
        this.value = newVal
        this.page = 1
       
       this.fetchData(newVal)
      }
    },
    methods: {
      ...mapActions(['fetchTopics', 'fetchTopicDetail']),
      fetchData(tab){
        this.fetchTopics({page: this.page, tab, limit: LIMIT}).then(data => {
          this.topics = this.topics.concat(data)
          this.page += 1
        })
      },
      handleScroll(){
        const scroll = () => {
          let content = this.$refs.content
          let offsetH = content.offsetHeight
          if(content.scrollTop > (this.scrollH - offsetH - scrollTheshold * offsetH)){
            this.fetchData(this.value)
          }
        }
        return throttle(scroll, 300, 1000)
      },
      showDetail(id){
        this.fetchTopicDetail({ id, accesstoken: this.user.accesstoken }).then(res => {
          this.showDetailModal({theme: res})
        })
      }
    },
    created(){
      this.fetchData(this.value)
    },
    updated(){
      this.scrollH = this.$refs.content.scrollHeight
    },
    mounted(){
      this.$refs.content.addEventListener('scroll', this.handleScroll())
    },
    components: {
      ListItem
    }
  }
</script>

<style lang="stylus">
  @import './Index.stylus'
</style>
