export default {
  tabs: [
    {
      0: '全部',
      tab: 'all',
      isCurrent: true
    }, {
      1: '精华',
      tab: 'good',
      isCurrent: false
    }, {
      2: '分享',
      tab: 'share',
      isCurrent: false
    }, {
      3: '问答',
      tab: 'ask',
      isCurrent: false
    }, {
      4: '招聘',
      tab: 'job',
      isCurrent: false
    }
  ], // 头部tab栏
  menus: [  // 底部的菜单栏
    {
      icon: 'home',
      text: '首页',
      path: '/index'
    },
    {
      icon: 'publish',
      text: '发布',
      path: '/topic/create'
    },
    {
      icon: 'message',
      text: '消息',
      path: '/messages'
    },
    {
      icon: 'mine',
      text: '我的',
      path: '/user'
    }
  ],
  mines: [ // 个人中心列表配置
    {
      icon: 'theme-1',
      text: '我的发布',
      path: '/mine/publish'
    },
    {
      icon: 'about',
      text: '关于',
      path: '/mine/about'
    }
  ]
}