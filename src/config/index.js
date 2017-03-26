export default {
  // 头部tab栏
  // '全部', '精华', '分享', '问答', '招聘'
  tabs: [
    {key: 'all', value: '全部'},
    {key: 'good', value: '精华'},
    {key: 'share', value: '分享'},
    {key: 'ask', value: '问答'},
    {key: 'job', value: '招聘'}
  ], 
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