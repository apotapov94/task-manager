export default {
    state: {
        status: 'all',
        search: '',
        showAddFilterPanel: false,
        filtersCount: 0,
        project: {
          active: false,
          value: '',
          name: ''
        },
        executor: {
          active: false,
          value: '',
          name: ''
        },
        priority: {
          active: false,
          value: '',
          name: ''
        },
    },
    mutations: {
      setStatusFilter (state, status){
        state.status = status
      },
      updateSearch(state, value) {
        state.search = value
      },
      showAddFilterPanel (state){
        if(!state.showAddFilterPanel){
          state.showAddFilterPanel = true
        }  
      },
      hideAddFilterPanel (state){
        if(state.showAddFilterPanel){
          state.showAddFilterPanel = false
        }
      },
      addFilter (state, filter){
        state[filter].active = true
        state.filtersCount += 1
      },
      setFilter (state, {filter, value, name}){
        state[filter] = {
          active: true,
          value,
          name
        }
      },
      resetFilter (state, filter){
        state[filter] = {
          active: false,
          value: '',
          name: ''
        }
        if(state.filtersCount > 0){
          state.filtersCount -= 1
        }
      },
      resetSearсh (state){
        state.search = ''
      }
    },
    actions: {
      setStatusFilter ({ commit }, payload){
        commit('setStatusFilter', payload)
      },
      updateSearch({ commit }, payload){
        commit('updateSearch', payload)
      },
      showAddFilterPanel ({ commit }){
        commit('showAddFilterPanel')
      },
      hideAddFilterPanel ({ commit }){
        commit('hideAddFilterPanel')
      },
      addFilter ({ commit, dispatch }, payload){
        commit('addFilter', payload)
        dispatch('hideAddFilterPanel')
      },
      setFilter ({commit}, payload){
        commit('setFilter', payload)
      },
      resetFilter ({commit}, payload){
        commit('resetFilter', payload)
      },
      resetAllFilters ({commit}){
        commit('resetFilter', 'project')
        commit('resetFilter', 'executor')
        commit('resetFilter', 'priority')
      },
      resetSearch({commit}){
        commit('resetSearсh')
      }
    },
    getters: {
      getFilter (state){
        return state
      },
      getSearch (state){
        return state.search
      },
      getFiltersCount (state){
        return state.filtersCount
      }
    }
}