export default {
  state: {
    view: null,
    mask: false,
    heading: '',
    panelShow: false,
    message: {
      show: false,
      type: null,
      text: ''
    }
  },
  mutations: {
    showView (state, view) {
      state.view = view
    },
    hideView (state) {
      state.heading = ''
      state.view = null
    },
    showPanel (state){
      state.panelShow = true
      state.mask = true
    },
    hidePanel (state){
      state.panelShow = false
      state.mask = false
    },
    setHeading (state, text) {
      state.heading = text
    },
    setMessage (state, { type, text }){
      state.message.type = type
      state.message.text = text
      state.message.show = true
    },
    hideMessage (state){
      state.message.type = null
      state.message.text = ''
      state.message.show = false
    }
  },
  actions: {
    showView ({ commit }, payload) {
      commit('showView', payload)
    },
    hideView ({ commit }) {
      commit('hideView')
    },
    showPanel ({ commit }, payload) {
      commit('showPanel', payload)
    },
    hidePanel ({ commit }) {
      commit('hidePanel')
    },
    setHeading ({ commit }, payload) {
      commit('setHeading', payload)
    },
    setMessage ({ commit }, payload){
      commit('setMessage', payload)
    },
    hideMessage ({ commit }){
      commit('hideMessage')
    }
  },
  getters: {
    getView (state){
      return state
    },
    getMessage (state){
      return state.message
    },
  }
}
