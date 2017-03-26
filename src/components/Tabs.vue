<template lang="pug">
  .tab
    .tab-underline(ref="underline")
    .tab-item(v-for="(item,index) in tabs" ref="item"
      @click="clickItem(index)") {{item.value}}
</template>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        required: true
      }
    },
    data(){
      return {
        activeIndex: 0,
        tabItemWidth: 0
      }
    },
    watch: {
      activeIndex(newIndex){
        this.$emit('tab-change', this.tabs[newIndex]['key'], newIndex)
      }
    },
    methods: {
      clickItem(index){
        this.activeIndex = index
        this.$refs.underline.style['transform'] = 
          `translateX(${this.tabItemWidth * index}px)`
      },
    },
    mounted(){
      const tabItem = this.$refs.item[0]
      const underline = this.$refs.underline
      let tabItemHeight = tabItem.offsetHeight
      let tabItemWidth = this.tabItemWidth = tabItem.offsetWidth

      underline.style['top'] = `${tabItemHeight}px`
      underline.style['width'] = `${tabItemWidth}px`
    }
  }
</script>

<style lang="stylus">
  @import './Tabs.stylus'
</style>