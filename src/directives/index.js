import Vue from 'vue'
import Top from '../components/Top.vue'

const NavTop = Vue.extend(Top)

export default {
  top: {
    bind(el){
      let navTop = new NavTop()
      let $el = navTop.$mount().$el
      el.appendChild($el)

      el.addEventListener('scroll', function(){
        if(this.scrollTop > 200){
          $el.classList.add('fade-in')
        }else{
          $el.classList.remove('fade-in')
        }
      })

      navTop.$on('go-top', function(){
        el.scrollTop = 0
      })
    }
  }
  //, other directives
}