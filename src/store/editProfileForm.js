import { db, doc, setDoc } from '../firebase'

export default {
    state: {
        formData: {
            name: '',
            surname: '',
            bio: '',
            phone: '',
            position: ''
        }
    },
    mutations: {
        updateField(state, {field, value}) {
            state.formData[field] = value
        },
        initialProfile (state, profile){
            state.formData.name = profile.name ? profile.name : ''
            state.formData.surname = profile.surname ? profile.surname : ''
            state.formData.bio = profile.bio ? profile.bio : ''
            state.formData.phone = profile.phone ? profile.phone : ''
            state.formData.position = profile.position ? profile.position : ''
        }
    },
    actions: {
        initialProfile ({ commit }, payload){
            commit('initialProfile', payload)
        },
        updateField({ commit }, {field, value}){
            commit('updateField', {field, value})
        },
        async saveProfile ({ commit, dispatch }, {id, formData}){
            dispatch('setLoading', true)
            try {
                const userRef = doc(db, 'users', id)
                await setDoc(userRef, formData, { merge: true })
                dispatch('refreshUsers')
                dispatch('setLoading', false)
                dispatch('setMessage', { text: 'Профиль обновлен!' })
                console.log('профиль обновлен')
                setTimeout(function(){
                    dispatch('hideMessage')
                }, 1000)
            } catch (e) {
                dispatch('setLoading', false)
                console.log(e)
            }
        }
    },
    getters: {
        getEditProfileFormData (state){
            return state.formData
        }
    }
}