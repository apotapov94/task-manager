<template>
    <Title title="Задачи" />
    <div class="page-wrapper">
      <TasksList :tasks="this.$store.getters.getMyTasks" />
    </div>
</template>
  
<script>
import Title from '@/components/UI/Title.vue'
import TasksList from '@/components/Tasks/List.vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
export default {
components: {
    Title,
    TasksList,
    AddTaskForm
},
computed: {
    newTask() {
    return this.$store.getters.getNewTask
    }
},
}
</script>
  