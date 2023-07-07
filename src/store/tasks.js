import { auth, db, collection, addDoc, query, where, getDocs, orderBy, limit, deleteDoc, doc, setDoc } from '../firebase'

export default {
  state: {
    mode: null,
    tasks: [],
    taskToShowId: null,
    viewMode: 'grid'
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

    },
    switchMode (state, mode){
      state.viewMode = mode
    },
    setStatus (state, {id, status}){
      console.log(id)
      let newState = state.tasks.map(function(task){
        if(task.id == id){
          task.status = status
          return task
        }
      })
      state.tasks = state.tasks
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
        dispatch('deleteTaskComments', payload);
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
      tasks.forEach((task) => {
        //console.log(doc)
        // doc.data() is never undefined for query doc snapshots
        const taskData = Object.assign(task.data(), {id: task.id})
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
    },
    switchMode({ commit }, payload){
      commit('switchMode', payload)
    },
    async setStatus ({ commit,dispatch }, {id, status}){
      dispatch('setLoading', true)
      try {
        console.log(id, status)
        const taskRef = doc(db, 'tasks', id);
        await setDoc(taskRef, { status: status }, { merge: true });
        console.log('success')
        dispatch('setLoading', false)
        //dispatch('refreshTasks')
        commit('setStatus', {id, status})
      } catch (e) {
          dispatch('setLoading', false)
          console.error("Error adding document: ", e);
      }
    }
  },
  getters: {
    getAllTasks (state, getters){
      let tasksResult
      if(getters.getFilter.status === 'all'){
        tasksResult = state.tasks
      } else {
        tasksResult = state.tasks.filter(task => task.status === getters.getFilter.status)
      }
      if(getters.getFilter.project.value){
        tasksResult = tasksResult.filter(task => task.project === getters.getFilter.project.value)
      }
      if(getters.getFilter.executor.value){
        tasksResult = tasksResult.filter(task => task.executor === getters.getFilter.executor.value)
      }
      if(getters.getFilter.priority.value){
        tasksResult = tasksResult.filter(task => task.priority === getters.getFilter.priority.value)
      }
      if(getters.getFilter.search){
        tasksResult = tasksResult.filter(task => task.title.toLowerCase().indexOf(getters.getFilter.search) !== -1)
      }
      
      return tasksResult
    },
    getMyTasks (state, getters){
      if(getters.getUser){
        if(getters.getFilter.status == 'all'){
          return state.tasks.filter(task => task.executor === getters.getUser.uid)
        } else {
          return state.tasks.filter(function(task){
            if(task.status === getters.getFilter.status && task.executor === getters.getUser.uid){
              return true
            }
          })
        }
        
      }
    },
    getAllTasksCount (state){
      return state.tasks.length
    },
    getMyTasksCount (state, getters){
      if(getters.getUser){
        const myTasks = state.tasks.filter(task => task.executor === getters.getUser.uid)
        return myTasks.length
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
    },
    getViewMode (state){
      return state.viewMode
    },
    getTasksByProjectId: state => id => {
      return state.tasks.filter(task => task.project === id)
    }
  }
}
