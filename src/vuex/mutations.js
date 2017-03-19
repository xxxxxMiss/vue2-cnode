import * as types from './mutation-types'

// 载荷|对象 形式
export default {
  [types.DEL_COLLECT](state, id){
    if(!state.user.collect || state.user.collect && !state.user.collect.length) return
    state.user.collect = state.user.collect.filter(item => {
      if(item.id !== id) return item
    })
  },
  [types.SAVE_COLLECT](state, collect){
    state.user.collect = collect
  },
  [types.CLEAR_USER_INFO](state){
    state.user = {}
  },
  [types.SAVE_USER_INFO](state, user){
    // 登陆时获取的简单信息和后面获取的用户详情合并
    state.user = Object.assign(state.user, user)
  },
  [types.FETCH_TOPIC_DETAIL](state, detail){
    state.themeDetail = detail
  },
  [types.REQUEST_START](state){
    state.showLoading = true
  },
  [types.REQUEST_SUCCESS](state){
    state.showLoading = false
  },
  [types.REQUEST_END](state){
    state.showLoading = false
  }
}