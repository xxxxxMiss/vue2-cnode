<template lang="pug">
  .loading-backdrop(v-show="showLoading")
    .load-container.loading
      .loader
      .text {{text}}
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'loading',
    props: {
      backgroundColor: {
        type: String,
        default: 'rgba(0, 0, 0, .4)'
      },
      opacity: {
        type: [Number, String],
        default: 1
      }
    },
    computed: {
      ...mapGetters(['showLoading']),
      options(){
        return {
          'background-color': this.backgroundColor, 
          'opacity': this.opacity
        }
      }
    },
    data(){
      return {
        text: ''
      }
    }
  }
</script>

<style lang="stylus">
  @import './Loading.stylus'
</style>