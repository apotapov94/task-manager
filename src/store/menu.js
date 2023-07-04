export default {
    state: {
        showMenu: false
    },
    mutations: {
      showMenuToggle(state) {
        state.showMenu = !state.showMenu
        this.state.rightPanel.mask = true
      }
    },
    actions: {
      showMenuToggle({ commit }){
        commit('showMenuToggle')
      }
    },
    getters: {
        getShowMenu (state){
            return state.showMenu
        }
    }
}