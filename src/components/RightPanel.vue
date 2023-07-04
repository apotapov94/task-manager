<template>
  <aside class="modals-container" :class="{ show: view.panelShow }">
    <div v-if="view.view !== 'task-detail'" class="title">
      <h2>{{ view.heading }}</h2>
    </div>
    <div v-if="view.view == 'task-detail'" class="title">
      <h2 v-show="mode !== 'edit-title'" @click="setMode('edit-title')">{{ view.heading }}</h2>
      <input @keyup.enter="saveTitle(curTaskId)" v-show="mode === 'edit-title'" :value="view.heading" type="text">
    </div>
    <Message v-if="message.show" :type="message.type" :text="message.text" />
    <AddTaskForm v-if="view.view == 'addTask'" />
    <TaskDetail v-if="view.view == 'task-detail'" />
    <div v-if="loading" class="modals-container__mask">
      <Loader />
    </div>
    <div class="close-btn" @click="hideRightPanel"><img src="@/assets/img/arrow-right.png" alt=""></div>
  </aside>
  <div class="mask" :class="{ active: view.mask }" @click="hideRightPanel"></div>

</template>

<script>
import AddTaskForm from '@/components/AddTaskForm.vue'
import TaskDetail from '@/components/Tasks/Detail.vue'
export default {
  components: {
    AddTaskForm, TaskDetail
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
    }
  },
  methods: {
    hideRightPanel() {
      this.$store.dispatch('hidePanel')
      this.$store.dispatch('closeMenu')
      //this.$store.dispatch('setHeading', '')
      //this.$store.dispatch('hideView')
    },
    setMode (mode){
      this.$store.dispatch('setMode', mode)
      let input = event.target.nextSibling;
      console.log(input)
      setTimeout(function(){
        input.focus();
      }, 10)
    },
    saveTitle (id){
      let value = event.target.value
      this.$store.dispatch('saveTitle', { id, value })
    }
  }
}
</script>
