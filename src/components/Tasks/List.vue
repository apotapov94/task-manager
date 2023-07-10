<template>
  <section>
    <AppButton class="add-task-btn" v-if="abilityToAdd" @click="showAddTaskForm">Добавить задачу</AppButton>
    <div v-if="!loading" :class="`tasks-list ${viewMode}`">
      <TaskCard v-for="task in tasks" :task="task" />
    </div>
    <Throbber :view="view" v-if="loading" />
  </section>
</template>

<script>
import TaskCard from '@/components/Tasks/Card.vue';
import Throbber from '@/components/Tasks/Throbber.vue'
export default {
  components: {
    TaskCard, Throbber
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
    },
    loading (){
      return this.$store.getters.getLoading
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
