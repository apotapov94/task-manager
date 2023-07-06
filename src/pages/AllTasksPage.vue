<template>
  <Title title="Задачи" />
  <div class="page-wrapper">
    <div class="top-panel">
      <ViewSwitcher />
      <StatusFilter />
      <Search />
    </div>
    <TasksList :abilityToAdd="false" :tasks="this.$store.getters.getAllTasks" />
  </div>
</template>

<script>
import Title from '@/components/UI/Title.vue'
import TasksList from '@/components/Tasks/List.vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import ViewSwitcher from '@/components/UI/ViewSwitcher.vue'
import StatusFilter from '@/components/UI/StatusFilter.vue'
import Search from '@/components/UI/Search.vue'

export default {
  components: {
    Title,
    TasksList,
    AddTaskForm,
    ViewSwitcher,
    StatusFilter,
    Search
  },
  computed: {
    newTask() {
      return this.$store.getters.getNewTask
    }
  },
}
</script>
