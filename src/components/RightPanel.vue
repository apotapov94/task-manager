<template>
  <aside class="modals-container" :class="{ show: view.panelShow }">
    <div v-if="view.view !== 'task-detail'" class="title">
      <h2>{{ view.heading }}</h2>
    </div>
    <div v-if="view.view == 'task-detail'" class="title">
      <h2 v-show="mode !== 'edit'" v-if="task">{{ task.title }}</h2>
      <input @input="writeField({field: 'title', value: 'input'})" v-show="mode === 'edit'" :value="editedFields.title" type="text">
      <span class="edit-icon" v-if="mode === 'edit'"><EditIcon /></span>
    </div>
    <Message v-if="message.show" :type="message.type" :text="message.text" />
    <AddTaskForm v-if="view.view == 'addTask'" />
    <AddProjectForm v-if="view.view == 'addProject'" />
    <TaskDetail :task="task" v-if="view.view == 'task-detail'" />
    <div v-if="loading" class="modals-container__mask">
      <Loader />
    </div>
    <div class="close-btn" @click="hideRightPanel"><img src="@/assets/img/arrow-right.png" alt=""></div>
  </aside>
  <div class="mask" :class="{ active: view.mask }" @click="hideRightPanel"></div>
</template>

<script>
import AddTaskForm from '@/components/AddTaskForm.vue'
import AddProjectForm from '@/components/AddProjectForm.vue'
import TaskDetail from '@/components/Tasks/Detail.vue'
import EditIcon from '@/components/icons/iconEdit.vue'
export default {
  components: {
    AddTaskForm, AddProjectForm, TaskDetail, EditIcon
  },
  computed: {
    view() {
      return this.$store.getters.getView
    },
    message (){
      return this.$store.getters.getMessage
    },
    loading (){
      return this.$store.getters.getLoading
    },
    curTaskId (){
      return this.$store.getters.getActiveTaskId
    },
    mode (){
      return this.$store.getters.getMode
    },
    task (){
      return this.$store.getters.getTaskById
    },
    authUser (){
      return this.$store.getters.getAuthUser
    },
    editedFields (){
      return this.$store.getters.getEditedFields
    },
    task (){
      return this.$store.getters.getTaskById
    },
  },
  methods: {
    hideRightPanel() {
      this.$store.dispatch('hidePanel')
      this.$store.dispatch('closeMenu')
      this.$store.dispatch('setMode', null)
      //this.$store.dispatch('setHeading', '')
      //this.$store.dispatch('hideView')
    },
    writeField ({field, value}){
      if(value === 'input'){
          value = event.target.value
      }
      this.$store.dispatch('writeField', {field, value})
    },
  }
}
</script>
