// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'normalize.css'

import './common/css/common.css'
import 'github-markdown-css'
import '../static/iconfont/iconfont.css'
import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueTouch from 'vue-touch'
import router from './router'
import store from './vuex/store'
import mixin from './mixins'
import directives from './directives'
import * as filters from './filters'


Vue.mixin(mixin)
Vue.use(ElementUI)
Vue.use(VueTouch)

// 全局自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 处理已经登录的用户刷新导致vuex中用户信息被清空
const user = sessionStorage.getItem('user')
if(user){
  store.dispatch('validateAccesstoken', JSON.parse(user))
}


/* eslint-disable no-new */
const vm = new Vue({
  el: '#app', //index.html #app
  store,
  router,
  render: h => h(App)
})

// 全局路由配置
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.state.user.accesstoken)
      next()
    else{
      vm.showLoginModal()
      vm.$root.$on('before-login-action', next)
    }
  }else{
    next()
  }
})
