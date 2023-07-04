export default {
  state: {
    view: null,
    mask: false,
    heading: ''
  },
  mutations: {
    showView(state, view) {
      state.view = view
      state.mask = true
    },
    hideView(state) {
      state.view = null
      state.mask = false
      state.heading = ''
      this.state.menu.showMenu = false
    },
    setHeading(state, text) {
      state.heading = text
    }
  },
  actions: {
    showView({ commit }, payload) {
      commit('showView', payload)
    },
    hideView({ commit }) {
      commit('hideView')
    },
    setHeading({ commit }, payload) {
      commit('setHeading', payload)
    }
  },
  getters: {
    getView(state) {
      return state
    }
  }
}
