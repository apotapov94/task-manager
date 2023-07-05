export default {
    state: {
        status: 'all'
    },
    mutations: {
      setStatusFilter (state, status){
        state.status = status
      }
    },
    actions: {
      setStatusFilter ({ commit }, payload){
        commit('setStatusFilter', payload)
      }
    },
    getters: {
        getFilter (state){
            return state
        }
    }
}