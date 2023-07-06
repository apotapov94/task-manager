export default {
    state: {
        status: 'all',
        search: ''
    },
    mutations: {
      setStatusFilter (state, status){
        state.status = status
      },
      updateSearch(state, value) {
        state.search = value
      },
    },
    actions: {
      setStatusFilter ({ commit }, payload){
        commit('setStatusFilter', payload)
      },
      updateSearch({ commit }, payload){
        commit('updateSearch', payload)
      },
    },
    getters: {
      getFilter (state){
        return state
      },
      getSearch (state){
        return state.search
      }
    }
}