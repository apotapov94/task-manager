import { auth, db, collection, addDoc, query, where, getDocs, orderBy, limit, deleteDoc, doc, setDoc } from '../firebase'

export default {
  state: {
    mode: null,
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
    },
    setTaskToShow (state, id){
      state.taskToShowId = id
    },
    setMode (state, mode){
      state.mode = mode
    },
    saveDescr (state, {descr, id}){

    },
    saveTitle (state, {descr, id}){

    }
  },
  actions: {
    async addTask ({commit, dispatch},){
      dispatch('setLoading', true)
      const authorId = this.getters.getUser.uid
      const newTaskInfo = {
        created: new Date(Date.now()).toLocaleString(),
        author: authorId,
        status: 'active'
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
    async deleteTask ({commit, dispatch}, payload){
      dispatch('setLoading', true)
      try {
        console.log(payload)
        await deleteDoc(doc(db, "tasks", payload));
        dispatch('setLoading', false)
        dispatch('setMessage', { text: 'Задача успешно удалена!' })
        setTimeout(function(){
          dispatch('hideMessage')
          dispatch('hidePanel')
        }, 2000
        )
        commit('deleteTask', payload)
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
    setTaskToShow ({ commit }, taskId){
      commit('setTaskToShow', taskId)
    },
    setMode({ commit }, payload){
      commit('setMode', payload)
    },
    async saveDescr ({ commit, dispatch }, { id, value }){
      
      dispatch('setLoading', true)
      try {
        console.log(id, value)
        const taskRef = doc(db, 'tasks', id);
        await setDoc(taskRef, { descr: value }, { merge: true });
        console.log('success')
        dispatch('setLoading', false)
        dispatch('setMode', null)
        dispatch('refreshTasks')
      } catch (e) {
          dispatch('setLoading', false)
          console.error("Error adding document: ", e);
      }
    },
    async saveTitle ({ commit, dispatch }, { id, value }){
      dispatch('setLoading', true)
      try {
        console.log(id, value)
        const taskRef = doc(db, 'tasks', id);
        await setDoc(taskRef, { title: value }, { merge: true });
        console.log('success')
        dispatch('setLoading', false)
        dispatch('setMode', null)
        dispatch('refreshTasks')
        dispatch('setHeading', value);
      } catch (e) {
          dispatch('setLoading', false)
          console.error("Error adding document: ", e);
      }
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
      if(state.taskToShowId){
        return state.tasks.find(task => task.id === state.taskToShowId)
      }
    },
    getActiveTaskId (state){
      return state.taskToShowId
    },
    getMode (state){
      return state.mode
    }
  }
}
