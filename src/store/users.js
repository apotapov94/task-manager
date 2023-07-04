import { auth, db, collection, addDoc, query, getDocs } from '../firebase'
import router from '../router'

export default {
    state: {
        users: [],
    },
    mutations: {
        addUser (state, user){
            state.users.push(user)
        },
        refreshUsers(state, users) {
            state.users = users
            console.log(users)
        },
    },
    actions: {
        async addUser ({dispatch, commit}, {name, email, id}){
            let newUser = {
                name,
                email,
                id,
                role: 'user'
            }
            try {
                const docRef = await addDoc(collection(db, "users"), newUser);
                commit('addUser', newUser)
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async refreshUsers({ commit }) {
            //commit('refreshTasks')
            const q = query(collection(db, "users"));
            const users = await getDocs(q);
            let formatData = []
            users.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              formatData.push(doc.data());
            });
            commit('refreshUsers', formatData)
        },
    },
    getters: {
        getUsers (state){
            return state.users
        },
        getAuthUser (state, getters){
            console.log(getters.getUser)
            if(getters.getUser){
                return state.users.find(user => user.id === getters.getUser.uid)
            }
            //return state.users.filter(task => task.author === getters.getUser.uid)
        },
        getUserById: state => id => {
            console.log(state.users);
            return state.users.find(user => user.id === id)
            
        }
    }
  }
  