import * as api from '../api'
import * as types from './mutation-types'

// 获取所有消息（已读和未读）
export const fetchAllMessages = (context, query) => {
  return apiEntry(context, () => api.fetchAllMessages(query))
}

// 用户所收藏额主题
export const fetchCollectedTopics = (context, query) => {
  return apiEntry(context, () => api.getUserCollectedTopics(query), types.SAVE_COLLECT)
}

// 收藏主题
// 不打开等待层
export const collectTopic = ({dispatch, commit}, {accesstoken, topic_id}) => {
  return api.collectTopic({accesstoken, topic_id}).then(({body: data}) => data)
}
// 取消收藏主题
export const delCollect = ({dispatch, commit}, {accesstoken, topic_id}) => {
  return api.delCollect({accesstoken, topic_id}).then(({body: data}) => {
    commit(types.DEL_COLLECT, topic_id)
    return data
  })
}

// 获取用户详情
export const fetchUserInfo = (context, query) => {
  // types.VALIDATE_ACCESSTOKEN)合并用户信息
  return apiEntry(context, () => api.fetchUserInfo(query), types.SAVE_USER_INFO)
}

// 发布主题
export const createTopic = (context, query) => {
  return apiEntry(context, () => api.createTopic(query))
}

// 添加评论
export const createComment = ({dispatch, commit}, query) => {
  commit(types.REQUEST_START)
  return api.createComment(query).then(({body}) => {
    commit(types.REQUEST_SUCCESS)
    return body
  }, error => {
    commit(types.REQUEST_END)
    return error
  })
}


// 为评论点赞/消赞
export const upComment = (context, query) => {
  // 后台操作，无需打开等待层
  return api.upComment(query).then(({body: data}) => {
    return data
  }, error => {
    return error
  })
}

// 获取主题列表
export const fetchTopics = ({dispatch, commit}, query) => {
  commit(types.REQUEST_START)
  const { tab } = query
  return api.fetchTopics(query).then(({body: {data}}) => {
    commit(types.REQUEST_SUCCESS)
    return data
  }, (err) => {
    commit(types.REQUEST_END)
    return err
  })
}

// 获取主题详情
export const fetchTopicDetail = (context, query) => {
  let keys = Object.keys(context.state.themeDetail)
  if(keys.length > 0){
    let oldId = context.state.themeDetail.id
    let newId = query.id
    if(oldId === newId){ // 点击的是同一个列表，不在查询详情
     return Promise.resolve(context.state.themeDetail)
    }
  }

  return apiEntry(context, () => api.fetchTopicDetail(query), types.FETCH_TOPIC_DETAIL)
}

// 获取未读消息数量
export const fetchUnreadMessage = ({dispatch, commit}, query) => {
  return api.fetchUnreadMessage({accesstoken}).then(({body}) => body)
}

// 标记所有信息已读
export const markAllMessagesRead = ({dispatch, commit}, query) => {
  return api.markAllMessagesRead({accesstoken}).then(({body}) => body)
}

// 登陆
export const validateAccesstoken = ({dispatch, commit}, user) => {
  let {accesstoken, id} = user
  if(id){
    commit(types.SAVE_USER_INFO, user)
    Promise.resolve(user)
  }else{
    commit(types.REQUEST_START)
    return api.validateAccesstoken(accesstoken).then(({body}) => {
      const userinfo = Object.assign(body, {accesstoken})
      commit(types.SAVE_USER_INFO, userinfo)
      commit(types.REQUEST_SUCCESS)
      return userinfo
    })
  }
}

// 登出
export const logout = ({commit}) => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  if(user.accesstoken){
    sessionStorage.removeItem('user')
  }
  commit(types.CLEAR_USER_INFO)
} 

// 数据格式，请求方式一样的，都可以用该通用API处理
function apiEntry({dispatch, commit}, fn, type) {
  commit(types.REQUEST_START)
  return fn().then(res => {
    commit(types.REQUEST_SUCCESS)
    const {body: {data}} = res
    type && commit(type, data)
    return data
  }, (error) => {
    commit(types.REQUEST_END, error)
    return error
  })
}