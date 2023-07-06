export default {
  state: {
    id: null,
    formData: {
      title: '',
      priority: 'standart',
      executor: '',
      date: '',
      descr: '',
      project: ''
    }
  },
  mutations: {
    updateTitle(state, title) {
      state.formData.title = title
    },
    updatePriority(state, priority) {
      state.formData.priority = priority
    },
    updateExecutor(state, executor) {
      state.formData.executor = executor
    },
    updateDate(state, date) {
      state.formData.date = date
    },
    updateDescr(state, descr) {
      state.formData.descr = descr
    },
    updateProject(state, project) {
      state.formData.project = project
    },
    addTaskFormReset(state) {
      state.formData = {
        title: '',
        priority: 'standart',
        executor: '',
        date: '',
        descr: '',
        project: ''
      }
    }
  },
  actions: {
    updateTitle({ commit }, payload){
      commit('updateTitle', payload)
    },
    updatePriority({ commit }, payload){
      commit('updatePriority', payload)
    },
    updateExecutor({ commit }, payload){
      commit('updateExecutor', payload)
    },
    updateDate({ commit }, payload){
      commit('updateDate', payload)
    },
    updateDescr({ commit }, payload){
      commit('updateDescr', payload)
    },
    updateProject({ commit }, payload){
      commit('updateProject', payload)
    },
    addTaskFormReset({ commit }){
      commit('addTaskFormReset')
    }
  },
  getters: {
    getTitle(state) {
      return state.formData.title
    },
    getPriority(state) {
      return state.formData.priority
    },
    getExecutor(state) {
      return state.formData.executor
    },
    getDate(state) {
      return state.formData.date
    },
    getDescr(state) {
      return state.formData.descr
    },
    getProject(state) {
      return state.formData.project
    }
  }
}
