# vue2-cnode

> A Vue.js project

## 预览
[线上地址](https://xxxxxmiss.github.io/vue2-cnode/#/index)
## 源码地址
[github源码]()

## 环境配置

``` bash
# 安装依赖
npm install

# 开发环境
npm run dev

# 生产环境
npm run build

# 生产环境，并输出打包信息
npm run build --report

# 发布
# 这个命令中的路径需要修改为自己的发布路径
npm run deploy

# 提交远程服务器
git push origin ...
```

## 项目结构
.
├── README.md
├── build // webpack配置文件
├── config // webpack配置文件
├── index.html 
├── package.json
├── src
│   ├── App.vue // 根组件
│   ├── api
│   │   └── index.js  // 接口api
│   ├── common // 公共文件
│   │   ├── css
│   │   ├── js
│   │   └── stylus
│   ├── components // 组件
│   │   ├── Loading.stylus
│   │   ├── Loading.vue // loading等待层
│   │   ├── Popover.stylus
│   │   ├── Popover.vue // 详情页右边头部的菜单
│   │   ├── Toast.stylus
│   │   ├── Toast.vue // toast组件
│   │   ├── Top.stylus
│   │   ├── Top.vue // 回到顶部组件
│   │   ├── VFooter.stylus
│   │   ├── VFooter.vue // 底部菜单栏
│   │   ├── VHeader.stylus
│   │   └── VHeader.vue // 头部
│   ├── config
│   │   └── index.js // 页面中的一些配置
│   ├── directives
│   │   └── index.js // 全局指令
│   ├── filters
│   │   └── index.js // 全局过滤器
│   ├── main.js // 入口文件
│   ├── mixins // 全局混入
│   │   └── index.js
│   ├── router // 路由
│   │   └── index.js
│   ├── temp // 结构返回的数据结构
│   │   └── data.js
│   ├── views // 各个页面
│   │   ├── About.stylus
│   │   ├── About.vue // 关于
│   │   ├── CommentItem.stylus
│   │   ├── CommentItem.vue // 评论item
│   │   ├── Index.stylus
│   │   ├── Index.vue // 首页
│   │   ├── ListItem.stylus
│   │   ├── ListItem.vue // 首页列表item
│   │   ├── Login.stylus
│   │   ├── Login.vue // 登陆
│   │   ├── Message.stylus
│   │   ├── Message.vue // 消息
│   │   ├── Mine.stylus
│   │   ├── Mine.vue // 我的
│   │   ├── MineCollect.stylus
│   │   ├── MineCollect.vue // 我的收藏
│   │   ├── MineTopics.stylus
│   │   ├── MineTopics.vue // 我发布的主题
│   │   ├── Publish.stylus
│   │   ├── Publish.vue // 发布
│   │   ├── TopicDetail.stylus
│   │   └── TopicDetail.vue // 主题详情
│   └── vuex // vuex相关配置
│       ├── actions.js
│       ├── getters.js
│       ├── mutation-types.js
│       ├── mutations.js
│       └── store.js
└── static // 静态资源
    ├── iconfont // 字体
    └── img // 图片
        └── moren.png

## 结构介绍
- 本项目采用vue2.1.10 + vuex + vue-router + superagent + pug + stylus + elementui 实现的CNode社区，每个组件对应一个同名的stylus
- 社区API全部封装在api目录下的index.js中，方便采用统一形式调用
- 所有api的调用全部采用vuex提供的辅助函数mapActions将API封装到各个组件的methods选项中
- store中只存取了用户相关的信息,全局的loading状态和详情数据(避免多次点击同一个主题发多次请求)
- 登陆页，详情页，loading,toast四个component全部封装成全局组件，通过全局mixin混入到个各个组件，方便统一使用`this.`形式调用
- 对详情页注册成全局组件的说明：由于从列表页跳到详情页，如果采用路由的形式，为了更好的用户体验，势必每次到详情页都要记录滚动条的位置，当从详情页返回让滚动条滚动到上一次记录的位置；以及首页的tab切换，也要记录当前tab下已经加载的数据，从详情页返回继续使用上一次已经加载的数据等一系列的处理，需要处理的小点很多。故而采用弹窗的形式，在当前路由下显示详情，避免的过多的无关业务逻辑处理。
- 详情页添加分享到微博功能

## 感言
- 做这个项目的初衷：经常浏览cnode社区，发现很多人都用各种技术栈实现cnode社区，刚刚最近也在学习vue2.x，为了练练手，所以有了这个项目
- 做这个项目之前，也参考了很多人写的cnode社区页面，像首页的页面布局就套用了[lzxb](https://github.com/lzxb/vue-cnode), 但实现完全自己手工制作
- 最后要感谢的就是[cnode](https://cnodejs.org/)社区提供的api，让我们可以尽情的玩转社区

## 最后
- 目前已经完成了主要的功能，还有一两个小的功能点尚未开发
- 有待进一步优化其中的实现细节
- 去除elementUI库。因为刚刚开始准备使用elementUI库来实现，后来发现这些页面完全可以自己手动完成，目前唯一用到了elementUI的就是首页的tab
