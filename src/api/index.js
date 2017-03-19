import request from 'superagent'

const URL_PREFIX = 'https://cnodejs.org'

// === 载荷|对象 形式分发======
// 主题列表
export function fetchTopics({page, tab, limit, mdrender = true}){
  return request.get(`${URL_PREFIX}/api/v1/topics`).query({page, tab, limit, mdrender})
}

// 主题详情
export function fetchTopicDetail({id, mdrender = true, accesstoken = ''}) {
  return request.get(`${URL_PREFIX}/api/v1/topic/${id}`).query({mdrender, accesstoken})
}


// 新建主题
export function createTopic({accesstoken, title, tab, content}) {
  return request.post(`${URL_PREFIX}/api/v1/topics`).send({accesstoken, title, tab, content})
}

// 编辑主题
export function updateTopic({id, accesstoken, title, tab, content}) {
  return request.post(`${URL_PREFIX}/api/v1/topics/update`).send({id, accesstoken, title, tab, content})
}


// 收藏主题
export function collectTopic({accesstoken, topic_id}) {
  return request.post(`${URL_PREFIX}/api/v1/topic_collect/collect`).send({accesstoken, topic_id})
}


// 取消收藏主题
export function delCollect({accesstoken, topic_id}) {
  return request.post(`${URL_PREFIX}/api/v1/topic_collect/de_collect`).send({accesstoken, topic_id})
}


// 用户所收藏的主题
export function getUserCollectedTopics(loginname) {
  return request.get(`${URL_PREFIX}/api/v1/topic_collect/${loginname}`)
}

// 新建评论
export function createComment({topic_id, accesstoken, content, reply_id = ''}) {
  return request.post(`${URL_PREFIX}/api/v1/topic/${topic_id}/replies`).send({accesstoken, content, reply_id})
}


// 为评论点赞
export function upComment({reply_id, accesstoken}) {
  return request.post(`${URL_PREFIX}/api/v1/reply/${reply_id}/ups`).send({accesstoken})
}

// 用户详情（获取详细的用户信息）
export function fetchUserInfo(loginname) {
  return request.get(`${URL_PREFIX}/api/v1/user/${loginname}`)
}

// 验证accesstoken(获取一些简单的用户信息)
export function validateAccesstoken(accesstoken) {
  return request.post(`${URL_PREFIX}/api/v1/accesstoken`).send({accesstoken})
}

// 未读消息数量
export function fetchUnreadMessage(accesstoken) {
  return request.get(`${URL_PREFIX}/api/v1/message/count`).query({accesstoken})
}


// 所有消息
export function fetchAllMessages({accesstoken, mdrender = true}) {
  return request.get(`${URL_PREFIX}/api/v1/messages`).query({accesstoken, mdrender})
}

// 标记所有消息已读
export function markAllMessagesRead(accesstoken) {
  return request.post(`${URL_PREFIX}/api/v1/message/mark_all`).send({accesstoken})
}
