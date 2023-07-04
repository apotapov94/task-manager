<template>
  <aside class="modals-container" :class="{ show: view.panelShow }">
    <div class="title">
      <h2>{{ view.heading }}</h2>
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
    }
  },
  methods: {
    hideRightPanel() {
      this.$store.dispatch('hidePanel')
      this.$store.dispatch('closeMenu')
      //this.$store.dispatch('setHeading', '')
      //this.$store.dispatch('hideView')
    }
  }
}
</script>
