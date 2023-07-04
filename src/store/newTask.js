export default {
  state: {
    id: null,
    formData: {

    }
  },
  mutations: {
    updateNewTask(state, newTask) {
      state.formData = newTask
    }
  },
  actions: {
    updateNewTask({ commit }, payload){
      commit('updateNewTask', payload)
    }
  },
  getters: {
    getNewTask(state) {
      return state.formData
    }
  }
}
