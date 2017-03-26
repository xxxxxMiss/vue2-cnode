<template lang="pug">
  x-page.index-page
    x-header
      tabs(v-bind:tabs="tabs" @tab-change="tabChange")
    x-content(ref="content" v-top="")
      list-item(v-for="(item, index) in topics" 
        v-bind:item="item" v-bind:key="index" @item-click="showDetail")
</template>

<script>
  import Vue from 'vue'
  import Tabs from '../components/Tabs.vue'
  import ListItem from './ListItem.vue'
  import Publish from './Publish.vue'
  import Mine from './Mine.vue'
  import { throttle } from '../common/js/util'
  import config from '../config'

  import { mapActions, mapGetters } from 'vuex'

  let LIMIT = 10, scrollTheshold = 0.06

  export default {
    name: 'index',
    data(){
      return {
        tabs: config.tabs,
        value: 'all',
        topics: [],
        scrollH: 0,
        page: 1, // 默认从第一页开始加载
      }
    },
    methods: {
      ...mapActions(['fetchTopics', 'fetchTopicDetail']),
      tabChange(newVal, newIndex){
         this.topics = []
         this.value = newVal
         this.page = 1
        
        this.fetchData(newVal)
      },
      fetchData(tab){
        this.fetchTopics({page: this.page, tab, limit: LIMIT}).then(data => {
          this.topics = this.topics.concat(data)
          this.page += 1
        })
      },
      handleScroll(){
        const scroll = () => {
          let content = this.$refs.content.$el
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
      this.scrollH = this.$refs.content.$el.scrollHeight
    },
    mounted(){
      this.$refs.content.$el.addEventListener('scroll', this.handleScroll())
    },
    components: {
      ListItem,
      Tabs
    }
  }
</script>

<style lang="stylus">
  @import './Index.stylus'
</style>
