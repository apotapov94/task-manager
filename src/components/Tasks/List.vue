<template>
  <section>
    <div :class="`tasks-list ${viewMode}`">
      <TaskCard v-for="task in tasks" :task="task" />
    </div>
    <button v-if="abilityToAdd" @click="showAddTaskForm" class="btn btn-primary">Добавить задачу</button>
  </section>
</template>

<script>
import TaskCard from '@/components/Tasks/Card.vue';
export default {
  components: {
    TaskCard
  },
  computed: {
    viewMode (){
      if(this.view){
        return this.view
      } else {
        return this.$store.getters.getViewMode
      }
    },
    filter (){
      return this.$store.getters.getFilter
    }
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    abilityToAdd: {
      type: Boolean,
      default: true
    },
    view: {
      type: String,
      default: ''
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
