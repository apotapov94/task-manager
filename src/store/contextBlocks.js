export default {
    state: {
        blocks: {
            filters: false,
            projects: false,
            users: false,
            priority: false
        }
    },
    mutations: {
      closeContextBlock (state, block){
        if(block === 'all'){
            for (let contextBlock in state.blocks) {
                state.blocks[contextBlock] = false
            }
        } else {
            state.blocks[block] == false
        }
      },
      openContextBlock (state, block){
        if(block === 'all'){
            for (let contextBlock in state.blocks) {
                state.blocks[contextBlock] = true
            }
        } else {
            state.blocks[block] = true
        }
      }
    },
    actions: {
        closeContextBlock ({ commit }, payload){
            commit('closeContextBlock', payload)
        },
        openContextBlock ({ commit }, payload){
            
            commit('openContextBlock', payload)
        },
    },
    getters: {
      getContextBlocks (state){
        return state.blocks
      }
    }
}