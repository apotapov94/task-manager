<template>
    <Title title="Задачи" />
    <div class="page-wrapper">
      <div class="top-panel">
        <ViewSwitcher />
        <StatusFilter />
        <Filter executorFilterExclude />
      </div>
      <TasksList :tasks="this.$store.getters.getMyTasks" />
    </div>
</template>
  
<script>
import Title from '@/components/UI/Title.vue'
import TasksList from '@/components/Tasks/List.vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import ViewSwitcher from '@/components/UI/ViewSwitcher.vue'
import StatusFilter from '@/components/UI/StatusFilter.vue'
import Filter from '@/components/UI/Filter.vue'
export default {
components: {
    Title,
    TasksList,
    AddTaskForm,
    ViewSwitcher,
    StatusFilter,
    Filter
},
computed: {
    newTask() {
    return this.$store.getters.getNewTask
    }
},
mounted (){
    this.$store.dispatch('hidePanel')
  }
}
</script>
  