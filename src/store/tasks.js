import { auth, db, collection, addDoc, query, where, getDocs, orderBy, limit } from '../firebase'

export default {
  state: {
    tasks: [],
    taskToShowId: null
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push(newTask)
      //localStorage.tasks = JSON.stringify(state.tasks)
    },
    refreshTasks(state, tasks) {
      state.tasks = tasks
    },
    deleteTask(state, id) {
      state.tasks.forEach(function (elem, index) {
        if (elem.id == id) state.tasks.splice(index, 1)
      })
      localStorage.tasks = JSON.stringify(state.tasks)
    },
    setTaskToShow (state, id){
      state.taskToShowId = id
    }
  },
  actions: {
    // addTask({ commit }) {
    //   commit('addTask')
    // },
    async addTask ({commit, dispatch},){
      dispatch('setLoading', true)
      const authorId = this.getters.getUser.uid
      const newTaskInfo = {
        created: new Date(Date.now()).toLocaleString(),
        author: authorId
      }
      const newTask = Object.assign(newTaskInfo, this.state.newTask.formData)
      try {
          const docRef = await addDoc(collection(db, "tasks"), newTask);
          commit('addTask', Object.assign(newTask,{id: docRef.id}))
          dispatch('setLoading', false)
          dispatch('setMessage', { text: 'Задача успешно добавлена!' })
          setTimeout(function(){
            dispatch('hideMessage')}, 2000
          )
      } catch (e) {
          dispatch('setLoading', false)
          console.error("Error adding document: ", e);
      }
    },
    async refreshTasks({ commit }) {
      //commit('refreshTasks')
      const q = query(collection(db, "tasks"), orderBy('date', 'asc'));
      const tasks = await getDocs(q);
      let formatData = []
      tasks.forEach((doc) => {
        //console.log(doc)
        // doc.data() is never undefined for query doc snapshots
        const taskData = Object.assign(doc.data(), {id: doc.id})
        formatData.push(taskData);
      });
      commit('refreshTasks', formatData)
    },
    deleteTask({ commit }, payload) {
      commit('deleteTask', payload)
    },
    setTaskToShow ({ commit }, taskId){
      commit('setTaskToShow', taskId)
    }
  },
  getters: {
    getAllTasks (state){
      return state.tasks
    },
    getMyTasks (state, getters){
      if(getters.getUser){
        return state.tasks.filter(task => task.executor === getters.getUser.uid)
      }
    },
    getTaskById (state){
      console.log(state.taskToShowId)
      if(state.taskToShowId){
        console.log(state.taskToShowId)
        return state.tasks.find(task => task.id === state.taskToShowId)
      }
    }
  }
}
