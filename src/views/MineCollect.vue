<template lang="pug">
  .page.collect-page
    v-header(content="我的收藏")
    div(v-if="collecteds.length")
      list-item(v-for="(item, index) in collecteds" 
        v-bind:item="item" v-bind:key="index" @item-click="showDetail")
    .no-data(v-else)
      img(v-bind:src="'img/nodata@2x.png' | assets")
      .no-data-text 暂无相关数据
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