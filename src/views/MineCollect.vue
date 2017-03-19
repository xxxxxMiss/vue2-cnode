<template lang="pug">
  .page.collect-page
    v-header(content="我的收藏")
    list-item(v-for="(item, index) in collecteds" 
      v-bind:item="item" v-bind:key="index" @item-click="showDetail")
</template>

<script>
  import ListItem from './ListItem.vue'
  import { mapActions } from 'vuex'

  export default {
    data(){ // note: syntax error
      return {
        collecteds: []
      }
    },
    methods: {
      ...mapActions(['fetchCollectedTopics', 'fetchTopicDetail']),
      showDetail(id){
        this.fetchTopicDetail({ id, accesstoken: this.user.accesstoken }).then(res => {
          this.showDetailModal({theme: res}, () => {
            this.$root.mineCollectVm = this
          })
        })
      }
    },
    created(){
      this.fetchCollectedTopics(this.user.loginname).then(res => {
        // if(res.success != true) return this.showToast({
        //   msg: res.error_msg,
        //   position: 'center'
        // })

        this.collecteds = res
      })
    },
    components: {
      ListItem
    }
  }
</script>

<style lang="stylus">
  @import './MineCollect.stylus'
</style>