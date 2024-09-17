export default {
    state: {
        showMenu: false
    },
    mutations: {
      showMenuToggle(state) {
        state.showMenu = !state.showMenu
        this.state.rightPanel.mask = true
      },
      closeMenu (state){
        state.showMenu = false
        this.state.rightPanel.mask = false
      }
    },
    actions: {
      showMenuToggle({ commit }){
        commit('showMenuToggle')
      },
      closeMenu({ commit }){
        commit('closeMenu')
      }
    },
    getters: {
        getShowMenu (state){
            return state.showMenu
        }
    }
}