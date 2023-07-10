import { uploadBytes, storage, ref, getDownloadURL, doc, db, setDoc } from '../firebase'

export default {
    state: {
        file: null,
        avatar: null
    },
    mutations: {
        setAvatar (state, avatar){
            state.avatar = avatar
        }
    },
    actions: {
        async uploadFile ({commit, dispatch}, {id, file}){
            dispatch('setLoading', true)
            try {
                const storageRef = ref(storage, 'users/' + id);
                uploadBytes(storageRef, file).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    dispatch('setLoading', false)
                });
            } catch (e) {
                dispatch('setLoading', false)
                console.error("Error adding document: ", e);
            }
        },
        async setAvatar ({commit, dispatch}, id){
            dispatch('setLoading', true)
            try {
                const url = await getDownloadURL(ref(storage, 'users/' + id))
                commit('setAvatar', url)
                console.log('аватар загружен')

                try {
                    const userRef = doc(db, 'users', id);
                    console.log(id)
                    await setDoc(userRef, {avatar: url}, { merge: true });
                    dispatch('setMode', null)
                    dispatch('refreshUsers')
                    console.log('аватар загружен в базу')
                    dispatch('setLoading', false)
                } catch (e) {
                      dispatch('setLoading', false)
                      console.error("Error adding document: ", e);
                }
                
            } catch (e){
                console.error("Error adding document: ", e);
            }    
        }
    },
    getters: {
        getAuthUserAvatar (state){
            return state.avatar
        }
    }
  }
  