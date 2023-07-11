import { createStore } from 'vuex'
import auth from './auth'
import tasks from './tasks'
import newTask from './newTask'
import users from './users'
import rightPanel from './rightPanel'
import menu from './menu'
import comments from './comments'
import filter from './filter'
import addProjectForm from './addProjectForm'
import projects from './projects'
import contextBlocks from './contextBlocks'
import files from './files'
import editProfileForm from './editProfileForm'

export default createStore({
  modules: {
    auth,
    tasks,
    newTask,
    rightPanel,
    users,
    menu,
    comments,
    filter,
    projects,
    addProjectForm,
    contextBlocks,
    files,
    editProfileForm
  }
})
