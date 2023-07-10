import { auth, db, collection, addDoc, query, where, getDocs, orderBy, limit, deleteDoc, doc, setDoc } from '../firebase'

export default {
  state: {
    mode: null,
    tasks: [],
    taskToShowId: null,
    viewMode: 'grid',
    editedFields: {
      title: '',
      descr: '',
      executor: '',
      project: '',
      priority: '',
      date: ''
    },
    calendarEditValue: ''
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push(newTask)
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
    writeEditedField (state, {field, value}){
      state.editedFields[field] = value
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
    },
    initialEdit (state, task){
      state.editedFields = {
        title: task.title,
        descr: task.descr,
        executor: task.executor,
        project: task.project,
        priority: task.priority,
        date: task.date
      }
    },
    updateDate (state, date){
      state.calendarEditValue = date
    }
  },
  actions: {
    updateDate ({commit}, payload){
      commit('updateDate', payload)
    },
    initialEdit ({commit}, payload){
      commit('initialEdit', payload)
    },
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
            dispatch('hideMessage')
            dispatch('hidePanel')
          }, 1000)
          
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
        }, 1000
        )
        commit('deleteTask', payload)
      } catch (e) {
          dispatch('setLoading', false)
          console.error("Error adding document: ", e);
      }
    },
    async refreshTasks({ commit, dispatch }) {
      dispatch('setLoading', true)
      try {
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
        console.log('задачи загружены')
      } catch (e) {
          dispatch('setLoading', false)
          console.error("Error adding document: ", e);
      }
      
    },
    setTaskToShow ({ commit }, taskId){
      commit('setTaskToShow', taskId)
    },
    setMode({ commit }, payload){
      commit('setMode', payload)
    },
    async saveTask ({ commit, dispatch }, {fields, id}){
      dispatch('setLoading', true)
      try {
        console.log(id)
        const taskRef = doc(db, 'tasks', id);
        await setDoc(taskRef, fields, { merge: true });
        console.log('success')
        dispatch('setLoading', false)
        dispatch('setMode', null)
        dispatch('refreshTasks')
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
    },
    writeField ({commit}, payload){
      commit('writeEditedField', payload)
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
      let tasksResult
      if(getters.getUser){
        if(getters.getFilter.status === 'all'){
          tasksResult = state.tasks.filter(task => task.executor === getters.getUser.uid)
        } else {
          tasksResult = state.tasks.filter(task => task.executor === getters.getUser.uid)
          tasksResult = tasksResult.filter(task => task.status === getters.getFilter.status)
        } 
        if(getters.getFilter.project.value){
          tasksResult = tasksResult.filter(task => task.project === getters.getFilter.project.value)
        }
        if(getters.getFilter.priority.value){
          tasksResult = tasksResult.filter(task => task.priority === getters.getFilter.priority.value)
        }
        if(getters.getFilter.search){
          tasksResult = tasksResult.filter(task => task.title.toLowerCase().indexOf(getters.getFilter.search) !== -1)
        }
        return tasksResult
      } else {
        return []
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
    },
    getEditedFields (state){
      return state.editedFields
    },
    getCalendarValue (state){
      return state.calendarEditValue
    }
  }
}
