import { auth, db, collection, addDoc, query, getDocs, doc, setDoc } from '../firebase'
import router from '../router'

export default {
    state: {
        users: [],
        userToShowId: null
    },
    mutations: {
        addUser (state, user){
            state.users.push(user)
        },
        refreshUsers(state, users) {
            state.users = users
        },
        setUserToShow (state, id){
            state.userToShowId = id
        }
    },
    actions: {
        async addUser ({dispatch, commit}, {name, email, id}){
            let newUser = {
                name,
                email,
                avatar: '',
                id,
                role: 'user'
            }
            try {
                const userRef = doc(db, 'users', id);
                await setDoc(userRef, newUser , { merge: true });
                //const docRef = await addDoc(collection(db, "users"), newUser);
                commit('addUser', newUser)
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async refreshUsers({ commit,dispatch }) {
            dispatch('setLoading', true)
            try {
                const q = query(collection(db, "users"));
                const users = await getDocs(q);
                let formatData = []
                users.forEach((doc) => {
                formatData.push(doc.data());
                });
                commit('refreshUsers', formatData)
                console.log('пользователи загружены')
                dispatch('fetchUser');
            } catch (e) {
                dispatch('setLoading', false)
                console.error("Error refresh user: ", e);
            }    
            
        },
        setUserToShow ({ commit }, payload){
            commit('setUserToShow', payload)
        }
    },
    getters: {
        getUsers (state){
            return state.users
        },
        getAuthUser (state, getters){
            if(getters.getUser){
                //console.log(state.users.find(user => user.id === getters.getUser.uid))
                const authUser = state.users.find(user => user.id === getters.getUser.uid)
                if(authUser){
                    return authUser
                }
            }
        },
        getUserById: state => id => {
            return state.users.find(user => user.id === id)
        },
        getUserToShow (state){
            return state.users.find(user => user.id === state.userToShowId)
        }
    }
  }
  