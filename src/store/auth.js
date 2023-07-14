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
        },
        clearUser (state){
            state.user = null
        },
        setLoading (state, param){
            state.loading = param
        }
    },
    actions: {
        async login ({commit, dispatch}, payload){
            const { email, password } = payload
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error){
                switch (error.code){
                    case 'auth/user-not-found':
                        dispatch('setMessage', { text: 'Пользователь с таким email не зарегистрирован', type: 'error' })
                        break
                    case 'auth/wrong-password':
                        dispatch('setMessage', { text: 'Неправильный пароль', type: 'error' })      
                        break
                    default:
                        dispatch('setMessage', { text: 'Неизвестная ошибка', type: 'error' })            
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
                        dispatch('setMessage', { text: 'Пользователь с таким email уже существует!', type: 'error' })
                        break
                    case 'auth/invalid-email':
                        dispatch('setMessage', { text: 'Некорректный email!', type: 'error' })  
                        break
                    case 'auth/operation-not-allowed':
                        console.log('operation not allowed')      
                        break
                    case 'auth/weak-password':   
                        dispatch('setMessage', { text: 'Слишком короткий пароль', type: 'error' })    
                        break    
                    default:
                        dispatch('setMessage', { text: 'Неизвестная ошибка', type: 'error' })           
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
                console.log('авторизованный пользователь загружается')
                if(user === null){
                    if(router.isReady() && 
                        (router.currentRoute.value.path === '/canban' 
                        || router.currentRoute.value.path === '/projects' 
                        || router.currentRoute.value.path === '/my-tasks')){
                        router.push('/login')
                    }
                    commit('clearUser')
                } else {
                    commit('setUser', user)
                    if(router.isReady() && router.currentRoute.value.path === '/login' ){
                        router.push('canban')
                    }
                    
                    console.log('авторизованный пользователь загружен')
                    if(this.getters.getAuthUser){
                        dispatch('initialProfile', this.getters.getAuthUser)
                        console.log('поменялся профиль')
                    }
                    dispatch('setLoading', false)
                }
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
  