export default {
  state: {
    config: null
  },
  mutations: {
    fetchConfig(state, config) {
      state.config = config
    }
  },
  actions: {
    async fetchConfig({ commit }) {
      try {
        const target = `config.json` //file

        const res = await fetch(target, {
          method: 'get'
        })

        if (res.status === 200) {
          const data = await res.json()
          commit('fetchConfig', data)
        } else {
          console.log(`Error code ${res.status}`)
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  getters: {
    getConfig(state) {
      return state.config
    }
  }
}
