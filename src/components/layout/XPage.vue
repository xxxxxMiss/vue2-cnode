<template lang="pug">
  .layout-page
    slot
</template>

<script>
  export default {
    mounted(){
      const header = document.querySelector('.layout-header')
      const content = document.querySelector('.layout-content')
      const footer = document.querySelector('.layout-footer')
      let headerOffsetHeight = 0, footerOffsetHeight = 0

      header && (headerOffsetHeight = header.offsetHeight)
      footer && (footerOffsetHeight = footer.offsetHeight)

      content.style['top'] = `${headerOffsetHeight}px`
      // content.style['bottom'] = `${footerOffsetHeight}px`
      // 目前所有页面底部并未有任何东西，所有固定60
      content.style['bottom'] = `60px`
    }
  }
</script>

<style lang="stylus">
  @import './XPage.stylus'
</style>