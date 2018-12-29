import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const user = {
  state: state.user_module,
  mutations: mutations.user_module,
  actions: actions.user_module,
  getters: getters.user_module
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
