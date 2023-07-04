import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import router from '../router'

export default {
    state: {
        user: null,
        loading: false
    },
    mutations: {
        setUser (state, user){
            state.user = user
            console.log(state.user)
        },
        clearUser (state){
            state.user = null
        },
        setLoading (state, param){
            state.loading = param
        }
    },
    actions: {
        async login ({commit}, payload){
            const { email, password } = payload
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error){
                switch (error.code){
                    case 'auth/user-not-found':
                        alert('user not found')
                        break
                    case 'auth/wrong-password':
                        alert('wrong password')      
                        break
                    default:
                        alert('something went wrong')          
                }

                return
            }

            commit('setUser', auth.currentUser)
            router.push('/')
        },
        async register ({commit, dispatch}, payload){
            const { email, password, name } = payload

            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (error){
                switch (error.code){
                    case 'auth/email-already-in-use':
                        alert('email already in use')
                        break
                    case 'auth/invalid-email':
                        alert('invalid email')      
                        break
                    case 'auth/operation-not-allowed':
                        alert('operation not allowed')      
                        break
                    case 'auth/weak-password':
                        alert('weak password')      
                        break    
                    default:
                        alert('something went wrong')          
                }

                return
            }

            let newUser = {
                name,
                email,
                id: auth.currentUser.uid
            }
            dispatch('addUser', newUser)
            commit('setUser', auth.currentUser)

            router.push('/')
        },
        async logout ({commit}){
            await signOut(auth)

            commit('clearUser')

            router.push('/')
        },
        fetchUser ({commit, dispatch}){
            dispatch('setLoading', true)
            auth.onAuthStateChanged(async user => {
                if(user === null){
                    commit('clearUser')
                } else {
                    commit('setUser', user)
                    
                    if(router.isReady() && router.currentRoute.value.path === '/login'){
                        router.push('/')
                    }

                }
                dispatch('setLoading', false)
            })
        },
        setLoading ({commit}, payload){
            commit('setLoading', payload)
        }
    },
    getters: {
        getUser (state){
            return state.user
        },
        getLoading (state){
            return state.loading
        }
    }
  }
  