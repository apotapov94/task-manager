import { auth, db, collection, addDoc, query, where, getDocs, orderBy, limit, deleteDoc, doc, setDoc } from '../firebase'

export default {
    state: {
      newComment: null,
      comments: []
    },
    mutations: {
      updateComment(state, comment) {
        state.newComment = comment
      },
      commentFormReset(state) {
        state.newComment = null
      },
      addComment(state, newComment) {
        state.comments.push(newComment)
      },
      refreshComments(state, comments) {
        state.comments = comments
      },
    },
    actions: {
      updateComment({ commit }, payload){
        commit('updateComment', payload)
      },
      commentFormReset({ commit }){
        commit('commentFormReset')
      },
      async addComment ({commit, dispatch}, payload){
        dispatch('setLoading', true)
        const authorId = this.getters.getUser.uid
        const newComment = {
          created: new Date(Date.now()).toLocaleString(),
          author: authorId,
          taskId: payload,
          text: this.getters.getComment
        }
        try {
            const docRef = await addDoc(collection(db, "comments"), newComment);
            commit('addComment', Object.assign(newComment,{id: docRef.id}))
            dispatch('setLoading', false)
            dispatch('setMessage', { text: 'Комментарий успешно добавлен!' })
            setTimeout(function(){
              dispatch('hideMessage')}, 2000
            )
        } catch (e) {
            dispatch('setLoading', false)
            console.error("Error adding document: ", e);
        }
      },
      async deleteTaskComments({ commit }, payload) {
        const q = query(collection(db, "comments"), where("taskId", "==", payload));
        const comments = await getDocs(q);
        comments.forEach((comment) => {
          deleteDoc(doc(db, "comments", comment.id));
        });
      },
      async refreshComments({ commit }) {
        const q = query(collection(db, "comments"), orderBy('created', 'asc'));
        const comments = await getDocs(q);
        let formatData = []
        console.log(comments)
        comments.forEach((doc) => {
          
          // doc.data() is never undefined for query doc snapshots
          const commentData = Object.assign(doc.data(), {id: doc.id})
          formatData.push(commentData);
        });
        commit('refreshComments', formatData)
      },
    },
    getters: {
      getComment(state) {
        return state.newComment
      },
      getTaskComments (state, getters){
        return state.comments.filter(comment => comment.taskId === getters.getActiveTaskId)
      }
    }
  }
  