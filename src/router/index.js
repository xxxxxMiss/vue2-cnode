import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index.vue'
import Publish from '../views/Publish.vue'
import Message from '../views/Message.vue'
import Mine from '../views/Mine.vue'
import MineCollect from '../views/MineCollect.vue'
import MineTopics from '../views/MineTopics.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'

Vue.use(Router)

export default new Router({
  mode: process.env.NODE_ENV !== 'production' ? 'hash' : 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'index'}
    },
    {
      path: '/index', // 主题列表
      name: 'index',
      component: Index,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/topic/create', // 新建主题
      component: Publish,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/topic/update', // 编辑主题
      component: Publish,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'my-collected',
      path: '/user/:loginname', // 我的收藏
      component: MineCollect,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mine/publish',
      component: MineTopics,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user', // 个人中心
      component: Mine,
      name: 'mine',
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/messages', // 所有消息
      component: Message,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login', // 登陆
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/mine/about',
      component: About
    },
  ]
})
