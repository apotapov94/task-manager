import { createStore } from 'vuex'
import tasks from './tasks'
import newTask from './newTask'
import auth from './auth'
import users from './users'
import rightPanel from './rightPanel'
import menu from './menu'
import comments from './comments'
import filter from './filter'

export default createStore({
  modules: {
    tasks,
    newTask,
    rightPanel,
    auth,
    users,
    menu,
    comments,
    filter
  }
})
