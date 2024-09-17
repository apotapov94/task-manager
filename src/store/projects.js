import { auth, db, collection, addDoc, query, where, getDocs, orderBy, limit, deleteDoc, doc, setDoc, translit } from '../firebase'

export default {
    state: {
        projects: []
    },
    mutations: {
        addProject (state, project){
            state.projects.push(project)
        },
        refreshProjects(state, projects) {
            state.projects = projects
        }
    },
    actions: {
        async addProject ({commit, dispatch},){
            dispatch('setLoading', true)
            let findKeyword = this.getters.getProjectByKeyword(translit(this.state.addProjectForm.formData.title))
            if(findKeyword){
                dispatch('setLoading', false)
                dispatch('setMessage', { text: 'Ошибка! Проект с таким ключевым словом уже существует', type: 'error' })
                setTimeout(function(){
                    dispatch('hideMessage')}, 2000
                  )
            } else {
                const authorId = this.getters.getUser.uid
                const newProjectInfo = {
                  created: new Date(Date.now()).toLocaleString(),
                  author: authorId,
                  status: 'active',
                  keyword: translit(this.state.addProjectForm.formData.title)
                }
                const newProject = Object.assign(newProjectInfo, this.state.addProjectForm.formData)
                try {
                    const docRef = await addDoc(collection(db, "projects"), newProject);
                    commit('addProject', Object.assign(newProject,{id: docRef.id}))
                    dispatch('setLoading', false)
                    dispatch('setMessage', { text: 'Проект успешно добавлен!' })
                    setTimeout(function(){
                      dispatch('hideMessage')}, 2000
                    )
                } catch (e) {
                    dispatch('setLoading', false)
                    console.error("Error adding document: ", e);
                }
            }
        },
        async refreshProjects({ commit, dispatch }) {
            dispatch('setLoading', true)
            try {
                const q = query(collection(db, "projects"), orderBy('created', 'asc'));
                const projects = await getDocs(q);
                let formatData = []
                projects.forEach((project) => {
                //console.log(doc)
                // doc.data() is never undefined for query doc snapshots
                const projectData = Object.assign(project.data(), {id: project.id})
                formatData.push(projectData);
                });
                console.log('проекты загружены')
                commit('refreshProjects', formatData)
                dispatch('setLoading', false)
            } catch (e) {
                dispatch('setLoading', false)
                console.error("Error adding document: ", e);
            } 
        },
    },
    getters: {
        getProjects (state){
            return state.projects
        },
        getProjectByKeyword: state => keyword => {
            return state.projects.find(project => project.keyword === keyword)
        },
        getProjectById: state => id => {
            return state.projects.find(project => project.id === id)
        }
    }
}