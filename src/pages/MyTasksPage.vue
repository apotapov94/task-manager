<template>
    <Title title="Мои Задачи" />
    <div class="page-wrapper">
      <div class="top-panel">
        <ViewSwitcher />
        <StatusFilter />
        <Search />
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
import Search from '@/components/UI/Search.vue'
export default {
components: {
    Title,
    TasksList,
    AddTaskForm,
    ViewSwitcher,
    StatusFilter,
    Filter,
    Search
},
computed: {
    newTask() {
    return this.$store.getters.getNewTask
    }
},
mounted (){
    this.$store.dispatch('hidePanel')
    this.$store.dispatch('closeMenu')
    this.$store.dispatch('resetAllFilters')
    this.$store.dispatch('resetSearch')
  }
}
</script>
  