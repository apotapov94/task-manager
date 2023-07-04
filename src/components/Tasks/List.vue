<template>
  <section>
    <div class="tasks-list">
      <TaskCard v-for="task in tasks" :task="task" />
      <button v-if="abilityToAdd" @click="showAddTaskForm" class="btn btn-primary">Добавить задачу</button>
    </div>
  </section>
</template>

<script>
import TaskCard from '@/components/Tasks/Card.vue';
export default {
  components: {
    TaskCard
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    abilityToAdd: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showAddTaskForm() {
      this.$store.dispatch('showPanel');
      this.$store.dispatch('showView', 'addTask');
      this.$store.dispatch('setHeading', 'Новая задача');
    }
  },
}
</script>
