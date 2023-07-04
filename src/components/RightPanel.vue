<template>
  <aside class="modals-container" :class="{ show: view.view }">
    <div class="title">
      <h2>{{ view.heading }}</h2>
    </div>
    <AddTaskForm v-if="view.view == 'addTask'" />
    <TaskDetail v-if="view.view == 'task-detail'" />
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
    }
  },
  methods: {
    hideRightPanel() {
      this.$store.dispatch('hideView')
      this.$store.dispatch('setHeading', '')
    }
  }
}
</script>
