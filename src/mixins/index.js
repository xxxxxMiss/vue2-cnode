import { mapGetters } from 'vuex'
import store from '../vuex/store'
import router from '../router/index'

// 可以使用webpack.base.conf.js中配置的别名来简化路径的书写
import VHeader from 'components/VHeader.vue'
import toast from 'components/Toast.vue'
import loading from 'components/Loading.vue'

import login from '../views/Login.vue'
import topic from '../views/TopicDetail.vue'

export default {
  data(){
    return {
      loginView: null,
      topicView: null,
      toastView: null,
      loadingView: null
    }
  },
  methods: {
    // 不涉及路由的时候，调用该方法权限检查
    // 路由的时候，会有全局的路由钩子做权限检查
    requestAuth(next){
      if(!store.state.user.accesstoken){
        this.showLoginModal()
        // 记录登陆之前的操作
        this.$root.$on('before-login-action', next)
      }else{
        next()
      }
    },
    // 登陆
    g_login({accesstoken}, callback){
      store.dispatch('validateAccesstoken', {accesstoken}).then(res => {
        if(res.success){
          sessionStorage.setItem('user', JSON.stringify(store.state.user))

          if(callback){
            callback()
          }else{
            router.push({ name: 'mine', params: { loginname: res.loginname }})
          }
        }
      })
    },
    // 登出
    g_logout(){
      store.dispatch('logout')
    },
    showLoginModal(cb){
      this.$root.$children[0].loginView = login
      typeof cb === 'function' && cb()
    },
    dismissLoginModal(cb){
      this.$root.$children[0].loginView = null
      typeof cb === 'function' && cb()
      // 继续执行登陆前的操作
      this.$root.$emit('before-login-action')
      // 登陆前的操作执行完毕，删除该操作，不然每次loginModal消失都会触发该操作
      this.$root.$off('before-login-action')
    },
    showDetailModal(data, cb){
      this._handleData(topic, data)
      typeof cb === 'function' && cb()
    },
    dismissDetailModal(cb){
      this.$root.$children[0].topicView = null
      typeof cb === 'function' && cb()
    },
    showToast(data){
      if(typeof data === 'string') data = { msg: data }
      this._handleData(toast, data)
      setTimeout(() => {
        this.$root.$children[0].toastView = null
      }, 2500)
    },
    _handleData(component, data){
      data = Object.assign(component.data(), data)
      component.data = () => data
      this.$root.$children[0][component.name + 'View'] = component
    }
  },
  computed: mapGetters(['user']),
  components: {
    VHeader,
    login,
    topic,
    toast,
    loading
  }
}
