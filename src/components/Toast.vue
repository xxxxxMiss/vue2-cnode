<template lang="pug">
  transition(name="toast")
    .toast(v-bind:class="position ? position : '' ") {{msg}}
</template>

<script>
  export default {
    name: 'toast',
    data(){
      return {
        position: '',
        msg: ''
      }
    }
  }
</script>

<style lang="stylus">
  @import './Toast.stylus'
</style>