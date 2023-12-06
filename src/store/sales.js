export default {
  state: {
    sales: [],
    config: null,
    opened: false
  },
  mutations: {
    fetchSales(state, sales) {
      state.sales = [...state.sales, ...sales]
    },
    fetchConfig(state, config) {
      state.config = config
    },
    listToggle(state) {
      state.opened = !state.opened
    }
  },
  actions: {
    listToggle({ commit }) {
      commit('listToggle')
    },
    async fetchSales({ commit, dispatch }) {
      try {
        const target = `https://narko-practice.ru/widget/sales.tsv` //file

        const res = await fetch(target, {
          method: 'get',
          headers: {
            'content-type': 'text/csv;charset=UTF-8'
          }
        })

        if (res.status === 200) {
          const data = await res.text()

          const sales = []

          const lines = data.split('\n')

          for (let i = 0; i < lines.length; i++) {
            const tableData = lines[i].split('\t')
            sales[i] = {
              name: tableData[0],
              desc: tableData[1],
              date: tableData[2],
              domain: tableData[3].replace('\r', '')
            }
          }

          commit('fetchSales', sales)
        } else {
          console.log(`Error code ${res.status}`)
        }
      } catch (err) {
        console.log(err)
      }
    },
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
    },
    getSales(state) {
      return state.sales.filter((sale) => sale.domain === state.config.curDomain)
    },
    isOpen(state) {
      return state.opened
    }
  }
}
