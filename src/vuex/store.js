import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  showLoading: false,
  themeDetail: {},
  user: {}, // 用户信息
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
