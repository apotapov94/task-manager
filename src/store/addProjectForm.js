export default {
    state: {
      id: null,
      formData: {
        title: '',
        descr: ''
      }
    },
    mutations: {
      updateTitle(state, title) {
        state.formData.title = title
      },
      updateDescr(state, descr) {
        state.formData.descr = descr
      },
      addProjectFormReset(state) {
        state.formData = {
          title: '',
          descr: ''
        }
      }
    },
    actions: {
      updateTitle({ commit }, payload){
        commit('updateTitle', payload)
      },
      updateDescr({ commit }, payload){
        commit('updateDescr', payload)
      },
      addProjectFormReset({ commit }){
        commit('addTaskFormReset')
      }
    },
    getters: {
      getProjectTitle(state) {
        return state.formData.title
      },
      getProjectDescr(state) {
        return state.formData.descr
      }
    }
  }
  